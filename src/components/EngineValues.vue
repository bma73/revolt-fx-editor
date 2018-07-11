<template>
  <div>
    <value-group label="Global">
      <div style="padding-top: 5px; padding-bottom: 5px;">
        <help text="Maximum number of particles to render">
          <number-value :lower-limit="1" label="Max Particles" v-model="data.maxParticles"/>
        </help>
        <help text="Enable blendmodes for all effects">
          <el-checkbox v-model="data.useBlendModes">Use Blend Modes</el-checkbox>
        </help>
      </div>
    </value-group>
  </div>
</template>

<script>
  import ValueGroup from "./values/ValueGroup";
  import NumberValue from "./values/NumberValue";
  import {RevoltFX} from 'revolt-fx';
  import Help from "./Help";

  export default {
    name: "EngineValues",
    components: {Help, NumberValue, ValueGroup},
    props: ['data'],

    computed: {},
    watch: {
      'data.maxParticles': {
        handler(newVal, oldVal) {
          this.$fx.maxParticles = newVal;
        }
      },
      'data.useBlendModes': {
        handler(newVal, oldVal) {
          this.$fx.useBlendModes = newVal;
        }
      }
    }
  }
</script>

<style scoped>

</style>
