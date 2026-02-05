<template>
  <div layout="row center-left" style="margin-bottom: 5px;">


    <el-popover
      placement="top"
      :width="320"
      v-model:visible="popupContainerVisible"
      @show="onShowPopupContainer"
    >
      <p>
        <el-radio-group size="small" class="spacing" v-model="tempContainer">
          <el-radio-button :value="0">Standard Container</el-radio-button>
          <el-radio-button :value="1">Particle Container</el-radio-button>
        </el-radio-group>
      </p>
      <select-value :disabled="tempContainer==0" label="Blend Mode" v-model="tempBlendMode" :options="blendModes" self="left"/>
      <div style="text-align: right;">
        <el-button size="small" type="primary" @click="onApplyContainer">Apply</el-button>
      </div>
      <template #reference>
        <el-button type="info" size="small" class="spacing">Container</el-button>
      </template>
    </el-popover>

    <el-color-picker size="small" v-model="color" @change="onColor" class="spacing"/>
    <el-checkbox class="spacing" v-model="gizmos" @change="onGizmo">Gizmos</el-checkbox>
    <el-button size="small" type="info" self="right" style="margin-right:10px" @click="onReset()">Clear</el-button>

  </div>
</template>

<script>
  import SelectValue from "./values/SelectValue.vue";

  import {EVENT_SEQUENCE_PRESET_SELECTED, EVENT_EMITTER_PRESET_SELECTED} from "../events";
  export default {
    name: "CanvasOptions",
    components: {SelectValue},
    data() {
      return {
        color: '#333333',
        gizmos: true,
        container: 0,
        popupContainerVisible: false,
        blendMode: 0,
        tempBlendMode: 0,
        tempContainer: 0,
        blendModes: [
          {value: 0, name: 'Normal'},
          {value: 1, name: 'Add'},
          {value: 2, name: 'Multiply'},
          {value: 3, name: 'Screen'}
        ]
      }
    },

    methods: {
      onShowPopupContainer() {
        this.tempContainer = this.container;
        this.tempBlendMode = this.blendMode;
      },
      onApplyContainer() {
        this.container = this.tempContainer;
        this.blendMode = this.tempBlendMode;
        this.$editor.setContainer(this.container, this.container == 0 ? 0 : this.blendMode);
        this.popupContainerVisible = false;
      },
      onGizmo(value) {
        this.$editor.layers.gizmoLayer.visible = value;
      },
      onColor(color) {
        this.$editor.layers.setBackgroundColor(parseInt(color.replace('#', ''), 16));
      },
      onChangeContainer(value) {

      },
      onReset() {
        this.$fx.stopAllEffects();

        this.$eventBus.$emit(EVENT_EMITTER_PRESET_SELECTED, null);
        this.$eventBus.$emit(EVENT_SEQUENCE_PRESET_SELECTED, null);

      }

    }
  }
</script>

<style scoped>
  .spacing {
    margin-right: 15px;
  }
</style>
