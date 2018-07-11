<template>
  <div>
    <div>Sequence</div>
    <div class="head">{{data.name}}</div>

    <value-group label="Base">
      <help text="Initial delay">
        <number-value :lower-limit="0" :step="0.1" label="Delay" v-model="data.delay"/>
      </help>
      <help text="Scale modifier applied to all effects">
        <min-max-number-value label="Scale" :lower-limit="0" :step="0.01" :min.sync="data.scaleMin" :max.sync="data.scaleMax"/>
      </help>

      <help text="Delay time-sorted effect list">
        <value-element label="Effects">
          <list
            ref="effectList"
            :cloneButton="false"
            :renameButton="false"
            :elements="data.effects"
            :useDefaultNamePrompt="false"
            :nameCallback="getName"
            :iconCallback="getIcon"
            :prefixCallback="getDelay"
            :alwaysSelect="false"
            @select="onSelect"
            @add="onAdd"
            @remove="onRemove"
          />
        </value-element>
      </help>
    </value-group>

    <value-group v-if="effect" label="Effect">
      <p>{{getName(effect)}}</p>

      <number-value :lower-limit="0" :step="0.1" label="Delay" v-model="effect.delay"/>

      <div v-if="effect.componentType==0">
        <number-value :lower-limit="0" :step="0.1" label="Duration" v-model="effect.duration"/>
        <value-element label="Component">
          <better-image-select v-model="effect.componentId" :textures="$editor.spritesheetImagesMap"/>
        </value-element>
        <min-max-number-value label="Anchor" :lower-limit="0" :upper-limit="1" :step="0.1" min-label="X" max-label="Y" :min.sync="effect.componentParams.anchorX"
                              :max.sync="effect.componentParams.anchorY"/>
        <min-max-number-value label="Alpha" :lower-limit="0" :upper-limit="1" :step="0.01" :min.sync="effect.alphaMin" :max.sync="effect.alphaMax"/>
        <min-max-number-angle-degrees-value  label="Rotation" :step="1" :min.sync="effect.rotationMin" :max.sync="effect.rotationMax"/>
        <select-value label="Blend Mode" v-model="effect.blendMode" :options="$editor.blendModes"/>
        <color-value label="Tint" v-model="effect.tint"/>
      </div>

      <div v-if="effect.componentType==1">
        <number-value :lower-limit="0" :step="0.1" label="Duration" v-model="effect.duration"/>
        <value-element label="Component">
          <better-image-select v-model="effect.componentId" :textures="$editor.moveClipImagesMap"/>
        </value-element>
        <value-element>
          <el-checkbox v-model="effect.componentParams.loop">Loop</el-checkbox>
        </value-element>
        <min-max-number-value label="Anchor" :lower-limit="0" :upper-limit="1" :step="0.1" min-label="X" max-label="Y" :min.sync="effect.componentParams.anchorX"
                              :max.sync="effect.componentParams.anchorY"/>
        <min-max-number-value label="Animation Speed" :lower-limit="0" :step="0.01" :min.sync="effect.componentParams.animationSpeedMin" :max.sync="effect.componentParams.animationSpeedMax"/>
        <min-max-number-value label="Alpha" :lower-limit="0" :upper-limit="1" :step="0.01" :min.sync="effect.alphaMin" :max.sync="effect.alphaMax"/>
        <min-max-number-angle-degrees-value label="Rotation" :step="1" :min.sync="effect.rotationMin" :max.sync="effect.rotationMax"/>
        <select-value label="Blend Mode" v-model="effect.blendMode" :options="$editor.blendModes"/>
        <color-value label="Tint" v-model="effect.tint"/>
      </div>

      <div v-if="effect.componentType==2">
        <value-element label="Emitter">
          <el-select v-model="effect.componentId" size="small" placeholder="Select Emitter">
            <el-option
              v-for="option in emitters" :key="option.id"
              :value="option.id"
              :label="option.name"
            />
          </el-select>
        </value-element>
      </div>

      <div v-if="effect.componentType==3">
        <value-element label="Trigger Value">
          <el-input v-model="effect.triggerValue" placeholder="Value"></el-input>
        </value-element>
      </div>

      <div v-if="effect.componentType != 3">
        <min-max-number-value label="Scale" :lower-limit="0" :step="0.01" :min.sync="effect.scaleMin" :max.sync="effect.scaleMax"/>
        <value-element label="Container ID">
          <el-input v-model="containerId" placeholder="Id"></el-input>
        </value-element>
      </div>

    </value-group>

    <el-dialog title="Add Component" :visible.sync="modalVisible" width="400px">
      <value-group>
        <p v-if="emitters.length > 0">
          <el-button type="primary" class="button" plain @click="onAddEffect($event, 2)">Particle Emitter</el-button>
        </p>
        <p v-if="$editor.spritesheetImagesList.length > 0">
          <el-button type="primary" class="button" plain @click="onAddEffect($event, 0)">Sprite</el-button>
        </p>
        <p v-if="$editor.moveClipImagesList.length > 0">
          <el-button type="primary" class="button" plain @click="onAddEffect($event, 1)">Movieclip</el-button>
        </p>
        <p>
          <el-button type="primary" class="button" plain @click="onAddEffect($event, 3)">Trigger</el-button>
        </p>
      </value-group>
      <span slot="footer" class="dialog-footer">
    <el-button type="primary" @click="modalVisible=false">Cancel</el-button>
    </span>
    </el-dialog>

  </div>
</template>

<script>
  import ValueGroup from "./values/ValueGroup";
  import NumberValue from "./values/NumberValue";
  import ChildList from "./ChildList";
  import ValueElement from "./values/ValueElement";
  import List from "./list/List";
  import ImageSelect from "./imageselect/ImageSelect";
  import BetterImageSelect from "./imageselect/BetterImageSelect";
  import MinMaxNumberValue from "./values/MinMaxNumberValue";
  import SelectValue from "./values/SelectValue";
  import ColorValue from "./values/ColorValue";
  import Help from "./Help";
  import * as _ from 'lodash';
  import MinMaxNumberAngleDegreesValue from "./values/MinMaxNumberAngleDegreesValue";

  export default {
    name: "SequenceValues",
    components: {MinMaxNumberAngleDegreesValue, Help, ColorValue, SelectValue, MinMaxNumberValue, BetterImageSelect, ImageSelect, List, ValueElement, ChildList, NumberValue, ValueGroup},
    props: ['data'],
    data() {
      return {
        effect: null,
        delay: 0,
        modalVisible: false,
        scale: 1,
        containerId: '',
        type: 0
      }
    },
    computed: {
      emitters() {
        return _.sortBy(this.$store.state.bundle.emitters.slice(), 'name');
      },
      isDisabled() {
        return this.emitterId == null;
      }
    },
    watch: {
      'data': {
        immediate: true,
        handler(newVal, oldVal) {
          // if (newVal !== this.effect) this.effect = null;
        }
      },
      'effect.delay': {
        handler(newVal, oldVal) {
          this.sortEffects();
        }
      }
    },

    methods: {
      getName(effect) {
        switch (effect.componentType) {
          case 2:
            return `Emitter '${this.$fx.getParticleEmitterById(effect.componentId).name}'`;
          case 0:
            return `Sprite`;
          case 1:
            return `Movieclip`;
          case 3:
            return `Trigger '${effect.triggerValue}'`;
        }
      },
      getIcon(effect) {

        console.log('geticon', effect);
        switch (effect.componentType) {

          case 0:
            return this.$editor.spritesheetImagesMap[effect.componentId].image.src;
          case 1:
            return this.$editor.moveClipImagesMap[effect.componentId].image.src;

          default:
            return null;
        }
      },

      getDelay(effect) {
        return `${effect.delay.toFixed(2)}s`;
      },
      onSelect(entry) {
        this.effect = entry.data;
      },

      onAddEffect(e, value) {
        this.modalVisible = false;
        const data = {
          id: this.data.__cid++,
          componentId: null,
          componentType: value,
          delay: 0,
          componentParams: {
            animationSpeedMin: 1,
            animationSpeedMax: 1,
            anchorX: 0.5,
            anchorY: 0.5,
            loop: false
          },
          scaleMin: 1,
          scaleMax: 1,
          alphaMin: 1,
          alphaMax: 1,
          rotationMin:0,
          rotationMax:0,
          blendMode: 1,
          duration: 0.1,
          tint: 0xffffff,
          containerId: '',
          triggerValue: ''
        };

        switch (value) {
          case 0:
            data.componentId = this.$editor.spritesheetImagesList[0].name;
            break;
          case 1:
            data.componentId = this.$editor.moveClipImagesList[0].name;
            break;
          case 2:
            data.componentId = this.emitters[0].id;
            break;
        }

        this.data.effects.push(data);
        this.sortEffects();
      },

      onAdd() {
        this.modalVisible = true;
        this.scale = 1;
        this.containerId = '';
        this.addSelection = null;

      },
      onRemove(entry) {
        const index = this.data.effects.indexOf(entry.data);
        if (index > -1) this.data.effects.splice(index, 1);
      },
      createEffect() {

      },
      onEditComponentTypeChanged(value) {
        this.edit.selection = null;
      },
      sortEffects() {
        this.data.effects.sort((a, b) => a.delay > b.delay);
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "~element-ui/packages/theme-chalk/src/common/var";

  .head {
    color: $--color-primary;
    font-size: 1.3rem;
    font-weight: 400;
  }

  .button {
    width: 100%;
  }

  p {
    margin-top: 5px;
    margin-bottom: 5px;
  }
</style>
