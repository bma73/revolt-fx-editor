<template>
  <div>
    <div>Emitter</div>
    <div class="head">{{data.name}}</div>
    <!--********* Emitter Base Settings-->
    <value-group label="Base">

      <value-group>
        <help text="Duration in seconds. 0 for one shot." v-show="!data.infinite">
          <number-value :lower-limit="0" label="Duration" :step="0.1" v-model="data.duration"/>
        </help>

        <help text="Frequency in seconds" v-show="data.duration != 0 || data.infinite">
          <min-max-number-value :lower-limit="0.001" label="Spawn Frequency" :step="0.01" :min.sync="data.spawnFrequencyMin"
                                :max.sync="data.spawnFrequencyMax"/>
        </help>


        <help text="Number of particles to be created at spawn time">
          <min-max-number-value :lower-limit="0" label="Spawn Count" :step="1" :min.sync="data.spawnCountMin" :max.sync="data.spawnCountMax"/>
        </help>

        <help text="Maximum number of particles of this emitter">
          <number-value :lower-limit="1" label="Max Particles" v-model="data.maxParticles" :foo="data.name"/>
        </help>
        <help text="Loop forever">
          <value-element>
            <el-checkbox v-model="data.infinite">Infinite</el-checkbox>
          </value-element>
        </help>
      </value-group>

      <value-group>
        <help text="Use gravity">
          <value-element>
            <el-checkbox border size="mini" v-model="data.useGravity">Use Gravity</el-checkbox>
          </value-element>
        </help>
        <div v-show="data.useGravity">

          <help text="Gravity strength">
            <number-value label="Gravity" :step="0.01" v-model="data.gravity"/>
          </help>
          <help text="Particles will bounce when hitting floor">
            <value-element>
              <el-checkbox v-model="data.useFloor">Use Floor</el-checkbox>
            </value-element>
          </help>
          <div layout="row center-left" v-show="data.useFloor">
            <help text="Y position of the floor line">
              <number-value label="Floor Y" v-model="data.floorY"/>
            </help>
            <el-button size="mini" @click="applyFloorY" style="margin-top: 10px; margin-left: 10px;" type="primary">Apply</el-button>
          </div>
        </div>
      </value-group>
    </value-group>

    <!--********* Emitter Core Settings-->
    <value-group label="Emitter">
      <value-group>

        <help text="Select the emitter shape">
          <select-value label="Type" v-model="data.core.type" :options="emitterTypes"/>
        </help>

        <help v-show="isCircleEmitter || isRingEmitter" text="Emitter shape radius">
          <number-value :lower-limit="0" label="Radius" v-model="data.core.params.radius"/>
        </help>

        <help v-show="isBoxEmitter" text="Emitter shape width">
          <number-value label="Width" :lower-limit="0" v-model="data.core.params.width"/>
        </help>
        <help v-show="isBoxEmitter" text="Emitter shape height">
          <number-value label="Height" :lower-limit="0" v-model="data.core.params.height"/>
        </help>

        <help v-show="isCircleEmitter || isRingEmitter" text="Emitter shape arc in degrees">
          <angle-degree-value label="Angle" v-model="data.core.params.angle"/>
        </help>

        <help text="Emitter rotation in degrees">
          <angle-degree-value label="Rotation" :step="0.1" v-model="data.rotation"/>
        </help>

        <help text="Emitter rotation change per frame in degrees">
          <angle-degree-value label="Auto Rotation" :step="0.1" v-model="data.autoRotation"/>
        </help>

        <help text="Particle move radial from the emitter center">
          <value-element>
            <el-checkbox v-model="data.core.params.radial">Radial</el-checkbox>
          </value-element>
        </help>

        <help v-show="isRingEmitter" text="Particles are distributed uniformly on the emitter shape">
          <value-element>
            <el-checkbox v-model="data.core.params.uniform">Uniform</el-checkbox>
          </value-element>
        </help>

      </value-group>

      <value-group>
        <help text="Child emitters parented to this emitter">
          <value-element label="Childs">
            <child-list
              :elements="data.childs"
              :exclude="data"
              @add="data.childs.push($event)"
              @remove="removeObjectFromList($event, data.childs)"
            />
          </value-element>
        </help>
      </value-group>
    </value-group>


    <!--********* Particle Settings-->
    <value-group label="Particle">

      <value-group>
        <help text="Particle component type">
          <select-value label="Type" v-model="data.particleSettings.componentType" :options="componentTypes"/>
        </help>

        <particle-component-value v-model="data.particleSettings.componentId" :type="data.particleSettings.componentType"/>
        {{data.particleSettings.componentId}}
        <div v-show="data.particleSettings.componentType==1">
          <value-element>
            <el-checkbox v-model="data.particleSettings.componentParams.loop">Loop</el-checkbox>
          </value-element>

          <min-max-number-value label="Animation Speed" :lower-limit="0" :step="0.1" :min.sync="data.particleSettings.componentParams.animationSpeedMin"
                                :max.sync="data.particleSettings.componentParams.animationSpeedMax"/>

        </div>
        <help text="BlendModes won't work with PIXI ParticleContainer">
          <select-value label="Blend Mode" v-model="data.particleSettings.blendMode" :options="$editor.blendModes"/>
        </help>

        <help text="Anchor settings">
          <min-max-number-value label="Anchor" :lower-limit="0" :upper-limit="1" :step="0.1" min-label="X" max-label="Y" :min.sync="data.particleSettings.componentParams.anchorX" :max.sync="data.particleSettings.componentParams.anchorY"/>
        </help>

        <help text="Add particle on top of the display list">
          <value-element>
            <el-checkbox v-model="data.particleSettings.addOnTop">Add On Top</el-checkbox>
          </value-element>
        </help>
      </value-group>

      <value-group>
        <help text="Particle life in seconds">
          <min-max-number-value label="Duration" :lower-limit="0" :step="0.1" :min.sync="data.particleSettings.durationMin" :max.sync="data.particleSettings.durationMax"/>
        </help>
      </value-group>

      <value-group>

        <help text="Enable motion settings">
          <value-element>
            <el-checkbox border size="mini" v-model="data.particleSettings.useMotion">Use Motion</el-checkbox>
          </value-element>
        </help>

        <div v-show="data.particleSettings.useMotion">
          <value-delimiter/>
          <div v-show="!data.useGravity">
            <help text="Distance to move in pixels">
              <min-max-number-value label="Distance" :step="1" :min.sync="data.particleSettings.distanceMin" :max.sync="data.particleSettings.distanceMax"/>
            </help>
            <select-value label="Distance Ease" v-model="data.particleSettings.distanceEase" :options="easingTypes"/>
          </div>

          <div v-show="data.useGravity">
            <help text="Move speed per frame in pixels">
              <min-max-number-value label="Move Speed" :step="0.1" :min.sync="data.particleSettings.moveSpeedMin" :max.sync="data.particleSettings.moveSpeedMax"/>
            </help>


            <help text="Particle rotation will be aligned to movement direction">
              <value-element>
                <el-checkbox v-model="data.particleSettings.align">Align To Movement Direction</el-checkbox>
              </value-element>
            </help>

            <div v-show="data.useFloor">
              <help v-show="!data.particleSettings.stopOnBounce" text="Factor applied to reversed y movement speed when particle hits floor">
                <min-max-number-value label="Bounce Fac" :lower-limit="0" :step="0.1" :min.sync="data.particleSettings.bounceFacMin"
                                      :max.sync="data.particleSettings.bounceFacMax"/>
              </help>


              <help text="Factor applied to movement speed if particle hits floor">
                <min-max-number-value label="Friction" :lower-limit="0" :upper-limit="1" :step="0.1" :min.sync="data.particleSettings.frictionMin" :max.sync="data.particleSettings.frictionMax"/>
              </help>

              <help text="Particle will be removed when hitting the floor">
                <value-element>
                  <el-checkbox v-model="data.particleSettings.stopOnBounce">Stop On Bounce</el-checkbox>
                </value-element>
              </help>


            </div>
          </div>
        </div>
      </value-group>

      <value-group v-show="!data.particleSettings.align">

        <help text="Enable rotation settings">
          <value-element>
            <el-checkbox border size="mini" v-model="data.particleSettings.useRotation">Use Rotation</el-checkbox>
          </value-element>
        </help>

        <div v-show="data.particleSettings.useRotation">
          <value-delimiter/>
          <help text="Particle rotation per frame in degrees">
            <min-max-number-angle-degrees-value label="Rotation Speed" :step="0.1" :min.sync="data.particleSettings.rotationSpeedMin" :max.sync="data.particleSettings.rotationSpeedMax"/>
          </help>

          <help v-show="data.particleSettings.rotationSpeedMin > 0 || data.particleSettings.rotationSpeedMax > 0" text="Randomize rotation direction">
            <value-element>
              <el-checkbox v-model="data.particleSettings.randomRotationDirection">Random Rotation Direction</el-checkbox>
            </value-element>
          </help>
          <help text="Randomize particle start rotation">
            <value-element>
              <el-checkbox v-model="data.particleSettings.randomStartRotation">Random Start Rotation</el-checkbox>
            </value-element>
          </help>
        </div>
      </value-group>

      <value-group>

        <help text="Enable alpha settings">
          <value-element>
            <el-checkbox border size="mini" v-model="data.particleSettings.useAlpha">Use Alpha</el-checkbox>
          </value-element>
        </help>

        <div v-show="data.particleSettings.useAlpha">
          <value-delimiter/>
          <help text="Fade-in particle on start">
            <value-element>
              <el-checkbox v-model="data.particleSettings.fadeIn">Fade-In</el-checkbox>
            </value-element>
          </help>

          <div v-show="data.particleSettings.fadeIn">
            <help text="Factor of particle life time used for fade-in">
              <number-value :lower-limit="0.01" :upper-limit="1" :step="0.1" label="Fade-In Duration Factor" v-model="data.particleSettings.fadeInDurationFac"/>
            </help>
            <help text="Easing equation used for fade-in">
              <select-value label="Fade-In Ease" v-model="data.particleSettings.fadeInEase" :options="easingTypes"/>
            </help>
            <value-delimiter/>
          </div>

          <help text="Particle alpha start value">
            <min-max-number-value label="Start Alpha" :lower-limit="0" :upper-limit="1" :step="0.1" :min.sync="data.particleSettings.alphaStartMin" :max.sync="data.particleSettings.alphaStartMax"/>
          </help>
          <help text="Particle alpha end value">
            <min-max-number-value label="End Alpha" :lower-limit="0" :upper-limit="1" :step="0.1" :min.sync="data.particleSettings.alphaEndMin" :max.sync="data.particleSettings.alphaEndMax"/>
          </help>
          <select-value label="Alpha Ease" v-model="data.particleSettings.alphaEase" :options="easingTypes"/>

        </div>
      </value-group>

      <value-group>

        <help text="Enable scale settings">
          <value-element>
            <el-checkbox border size="mini" v-model="data.particleSettings.useScale">Use Scale</el-checkbox>
          </value-element>
        </help>


        <div v-show="data.particleSettings.useScale">
          <value-delimiter/>
          <help text="Scale-In particle on start">
            <value-element>
              <el-checkbox v-model="data.particleSettings.scaleIn">Scale-In</el-checkbox>
            </value-element>
          </help>

          <div v-show="data.particleSettings.scaleIn">
            <help text="Factor of particle life time used for scale-in">
              <number-value :lower-limit="0.01" :upper-limit="1" :step="0.1" label="Scale-In Duration Factor" v-model="data.particleSettings.scaleInDurationFac"/>
            </help>
            <help text="Easing equation used for scale-in">
              <select-value label="Scale-In Ease" v-model="data.particleSettings.scaleInEase" :options="easingTypes"/>
            </help>
            <value-delimiter/>
          </div>


          <help text="Scale particle uniformly on x and y">
            <value-element>
              <el-checkbox v-model="data.particleSettings.uniformScale">Uniform scale</el-checkbox>
            </value-element>
          </help>

          <div v-if="!data.particleSettings.uniformScale">
            <help text="Particle start x scale value">
              <min-max-number-value label="Start X Scale" :lower-limit="0" :step="0.1" :min.sync="data.particleSettings.scaleXStartMin" :max.sync="data.particleSettings.scaleXStartMax"/>
            </help>
            <help text="Particle end x scale value">
              <min-max-number-value label="End X Scale" :lower-limit="0" :step="0.1" :min.sync="data.particleSettings.scaleXEndMin" :max.sync="data.particleSettings.scaleXEndMax"/>
            </help>
            <select-value label="Scale X Ease" v-model="data.particleSettings.scaleXEase" :options="easingTypes"/>

            <help text="Particle start y scale value">
              <min-max-number-value label="Start Y Scale" :lower-limit="0" :step="0.1" :min.sync="data.particleSettings.scaleYStartMin" :max.sync="data.particleSettings.scaleYStartMax"/>
            </help>
            <help text="Particle end y scale value">
              <min-max-number-value label="End Y Scale" :lower-limit="0" :step="0.1" :min.sync="data.particleSettings.scaleYEndMin" :max.sync="data.particleSettings.scaleYEndMax"/>
            </help>
            <select-value label="Scale Y Ease" v-model="data.particleSettings.scaleYEase" :options="easingTypes"/>
          </div>

          <div v-if="data.particleSettings.uniformScale">
            <help text="Particle start scale value">
              <min-max-number-value label="Start Scale" :lower-limit="0" :step="0.1" :min.sync="data.particleSettings.scaleStartMin" :max.sync="data.particleSettings.scaleStartMax"/>
            </help>
            <help text="Particle end scale value">
              <min-max-number-value label="End Scale" :lower-limit="0" :step="0.1" :min.sync="data.particleSettings.scaleEndMin" :max.sync="data.particleSettings.scaleEndMax"/>
            </help>
            <select-value label="Scale Ease" v-model="data.particleSettings.scaleEase" :options="easingTypes"/>
          </div>
        </div>

      </value-group>


      <value-group>
        <help text="Enable tint settings">
          <value-element>
            <el-checkbox border size="mini" v-model="data.particleSettings.useTint">Use Tint</el-checkbox>
          </value-element>
        </help>

        <div v-show="data.particleSettings.useTint">
          <value-delimiter/>
          <el-row type="flex">
            <el-col>
              <help text="Particle start tint color">
                <color-value label="Start Tint" v-model="data.particleSettings.tintStart"/>
              </help>
            </el-col>
            <el-col>
              <help text="Particle end tint color">
                <color-value label="End Tint" v-model="data.particleSettings.tintEnd"/>
              </help>
            </el-col>
          </el-row>
          <select-value label="Tint Ease" v-model="data.particleSettings.tintEase" :options="easingTypes"/>
        </div>
      </value-group>

      <value-group>
        <help text="Enable child settings">
          <value-element>
            <el-checkbox border size="mini" v-model="data.particleSettings.useChilds">Use Childs</el-checkbox>
          </value-element>
        </help>

        <div v-show="data.particleSettings.useChilds">
          <value-delimiter/>
            <value-element label="Childs">
              <child-list
                :elements="data.particleSettings.childs"
                :exclude="data"
                @add="data.particleSettings.childs.push($event)"
                @remove="removeObjectFromList($event, data.particleSettings.childs)"
              />
            </value-element>
        </div>
      </value-group>

      <value-group>
        <help text="Enable spawn events settings">
          <value-element>
            <el-checkbox border size="mini" v-model="data.particleSettings.useSpawns">Use Spawn Events</el-checkbox>
          </value-element>
        </help>

        <div v-show="data.particleSettings.useSpawns">
          <value-delimiter/>
          <help text="Emitters/sequences to be spawned on particle birth">
            <value-element label="Spawn On Start">
              <spawn-list
                :elements="data.particleSettings.spawn.onStart"
                :exclude="data"
                @add="data.particleSettings.spawn.onStart.push($event)"
                @remove="removeObjectFromList($event, data.particleSettings.spawn.onStart)"
              />
            </value-element>
          </help>

          <help text="Emitters/sequences to be spawned if particle hits floor">
            <value-element label="Spawn On Bounce" v-if="data.useGravity">
              <spawn-list
                :elements="data.particleSettings.spawn.onBounce"
                :exclude="data"
                @add="data.particleSettings.spawn.onBounce.push($event)"
                @remove="removeObjectFromList($event, data.particleSettings.spawn.onBounce)"
              />
            </value-element>
          </help>
          <help text="Emitters/sequences to be spawned if particle reaches half of its life time">
            <value-element label="Spawn On Mid">
              <spawn-list
                :elements="data.particleSettings.spawn.onHalfway"
                :exclude="data"
                @add="data.particleSettings.spawn.onHalfway.push($event)"
                @remove="removeObjectFromList($event, data.particleSettings.spawn.onHalfway)"
              />
            </value-element>
          </help>
          <help text="Emitters/sequences to be spawned on particle death">
            <value-element label="Spawn On Complete">
              <spawn-list
                :elements="data.particleSettings.spawn.onComplete"
                :exclude="data"
                @add="data.particleSettings.spawn.onComplete.push($event)"
                @remove="removeObjectFromList($event, data.particleSettings.spawn.onComplete)"
              />
            </value-element>
          </help>
        </div>
      </value-group>

    </value-group>

  </div>
</template>

<script>

  import ImageSelect from "./imageselect/ImageSelect";
  import ValueGroup from "./values/ValueGroup";
  import NumberValue from "./values/NumberValue";
  import SelectValue from "./values/SelectValue";
  import ValueElement from "./values/ValueElement";
  import AngleDegreeValue from "./values/AngleDegreeValue";
  import MinMaxNumberValue from "./values/MinMaxNumberValue";
  import ColorValue from "./values/ColorValue";
  import ValueDelimiter from "./values/ValueDelimiter";
  import {
    EVENT_EMITTER_AUTO_ROTATION_CHANGED,
    EVENT_EMITTER_CHILDS_CHANGED,
    EVENT_EMITTER_CORE_CHANGED,
    EVENT_EMITTER_CORE_PARAMS_CHANGED,
    EVENT_EMITTER_INFINITE_CHANGED,
    EVENT_EMITTER_ROTATION_CHANGED
  } from "../events";
  import AngleDegreeSlider from "./values/AngleDegreeSlider";
  import List from "./list/List";
  import SpawnList from "./SpawnList";
  import ChildList from "./ChildList";
  import Help from "./Help";

  import {RevoltFX} from 'revolt-fx';
  import MinMaxNumberAngleDegreesValue from "./values/MinMaxNumberAngleDegreesValue";
  import ParticleComponentValue from "./values/ParticleComponentValue";

  export default {
    name: "EmitterValues",
    components: {
      ParticleComponentValue,
      MinMaxNumberAngleDegreesValue,
      Help, ChildList, SpawnList, List, AngleDegreeSlider, ValueDelimiter, ColorValue, MinMaxNumberValue, AngleDegreeValue, ValueElement, SelectValue, NumberValue, ValueGroup, ImageSelect
    },
    props: ['data'],
    data() {
      return {
        spriteTexture: null,
        mcTexture: null,
        emitterName: null
      }
    },
    created() {
    },
    mounted() {
    },
    methods: {
      applyFloorY() {
        this.$confirm('Apply value to all emitters in bundle?', 'Warning', {
          confirmButtonText: 'OK',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          this.$fx.setFloorY(this.data.floorY);
        })
      },
      removeObjectFromList(obj, list) {
        const index = list.indexOf(obj);
        if (index != -1) list.splice(index, 1);
      }
    },

    computed: {
      isCircleEmitter() {
        return this.data.core.type == 'circle';
      },

      isBoxEmitter() {
        return this.data.core.type == 'box';
      },

      isRingEmitter() {
        return this.data.core.type == 'ring';
      },

      emitterTypes() {
        return [
          {value: 'circle', name: 'Circle'},
          {value: 'ring', name: 'Ring'},
          {value: 'box', name: 'Box'}
        ]
      },
      componentTypes() {
        const ret = [{value: 0, name: 'Sprite'}];
        if (this.$editor.movieClipsCount > 0) {
          ret.push({value: 1, name: 'MovieClip'});
        }
        return ret;
      },
      blendModes() {
        return [
          {value: 0, name: 'Normal'},
          {value: 1, name: 'Add'},
          {value: 2, name: 'Multiply'},
          {value: 3, name: 'Screen'}
        ]
      },
      easingTypes() {
        return [
          {value: 'linear', name: ''},
          {value: 'easeInQuad', name: ''},
          {value: 'easeOutQuad', name: ''},
          {value: 'easeInOutQuad', name: ''},
          {value: 'easeInCubic', name: ''},
          {value: 'easeOutCubic', name: ''},
          {value: 'easeInOutCubic', name: ''},
          {value: 'easeInQuart', name: ''},
          {value: 'easeOutQuart', name: ''},
          {value: 'easeInOutQuart', name: ''},
          {value: 'easeInQuint', name: ''},
          {value: 'easeOutQuint', name: ''},
          {value: 'easeInOutQuint', name: ''},
          {value: 'easeInSine', name: ''},
          {value: 'easeOutSine', name: ''},
          {value: 'easeInSine', name: ''},
          {value: 'easeInOutSine', name: ''},
          {value: 'easeInExpo', name: ''},
          {value: 'easeOutExpo', name: ''},
          {value: 'easeInOutExpo', name: ''},
          {value: 'easeInCirc', name: ''},
          {value: 'easeOutCirc', name: ''},
          {value: 'easeInOutCirc', name: ''},
          {value: 'easeInElastic', name: ''},
          {value: 'easeOutElastic', name: ''},
          {value: 'easeInOutElastic', name: ''},
          {value: 'easeInBack', name: ''},
          {value: 'easeOutBack', name: ''},
          {value: 'easeInBounce', name: ''},
          {value: 'easeOutBounce', name: ''},
          {value: 'easeInOutBounce', name: ''}
        ]
      },
      textures() {
        if (this.data.particleSettings.componentType == 0) {
          return this.$editor.spritesheetImagesList;
        }
        return this.$editor.moveClipImagesList;
      }
    },
    watch: {
      'data.useGravity': {
        handler(newVal, oldVal) {
          this.$editor.layers.floorGizmo.visible = newVal && this.data.useFloor && this.data.floorY > 0;
        }
      },
      'data.useFloor': {
        handler(newVal, oldVal) {
          this.$editor.layers.floorGizmo.visible = newVal && this.data.useGravity && this.data.floorY > 0;
        }
      },
      'data.floorY': {
        handler(newVal, oldVal) {
          this.$editor.layers.floorGizmo.y = newVal;
        }
      },
      'data.core.type': {
        handler(newVal, oldVal) {
          this.$eventBus.$emit(EVENT_EMITTER_CORE_CHANGED, newVal);
        }
      },
      'data.childs': {
        handler(newVal, oldVal) {
          this.$eventBus.$emit(EVENT_EMITTER_CHILDS_CHANGED, newVal);
        }
      },
      'data.core.params.radius': {
        handler(newVal, oldVal) {
          this.$eventBus.$emit(EVENT_EMITTER_CORE_PARAMS_CHANGED, newVal);
        }
      },
      'data.core.params.angle': {
        handler(newVal, oldVal) {
          this.$eventBus.$emit(EVENT_EMITTER_CORE_PARAMS_CHANGED, newVal);
        }
      },
      'data.core.params.width': {
        handler(newVal, oldVal) {
          this.$eventBus.$emit(EVENT_EMITTER_CORE_PARAMS_CHANGED, newVal);
        }
      },
      'data.core.params.height': {
        handler(newVal, oldVal) {
          this.$eventBus.$emit(EVENT_EMITTER_CORE_PARAMS_CHANGED, newVal);
        }
      },
      'data.infinite': {
        handler(newVal, oldVal) {
          this.$eventBus.$emit(EVENT_EMITTER_INFINITE_CHANGED, newVal);
        }
      },
      'data.rotation': {
        handler(newVal, oldVal) {
          this.$eventBus.$emit(EVENT_EMITTER_ROTATION_CHANGED, newVal);
        }
      },
      'data.autoRotation': {
        handler(newVal, oldVal) {
          this.$eventBus.$emit(EVENT_EMITTER_AUTO_ROTATION_CHANGED, newVal);
        }
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

  p {
    margin-top: 5px;
    margin-bottom: 5px;
  }
</style>
