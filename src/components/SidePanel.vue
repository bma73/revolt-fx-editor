<template>

  <div class="container" layout="row left-top">


    <el-card class="box-card values" shadow="always">
      <emitter-values v-if="emitterPreset != null" :data="emitterPreset"/>
      <sequence-values v-if="sequencePreset != null" :data="sequencePreset"/>
    </el-card>

    <div>
      <el-card class="engine">
        <engine-values v-if="bundleSettings != null" :data="bundleSettings"/>
      </el-card>
      <el-card class="tabs">

        <el-tabs type="" @tab-click="handleTabClick">
          <el-tab-pane label="Emitters">
            <emitter-list/>
          </el-tab-pane>
          <el-tab-pane label="Sequences">
            <sequence-list/>
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
  </div>
</template>

<script>
  import EmitterList from "./EmitterList.vue";
  import EmitterValues from "./EmitterValues.vue";
  import {EVENT_EMITTER_PRESET_REMOVED, EVENT_EMITTER_PRESET_SELECTED, EVENT_RESET, EVENT_SEQUENCE_PRESET_SELECTED} from "../events";
  import EngineValues from "./EngineValues.vue";
  import SequenceList from "./SequenceList.vue";
  import SequenceValues from "./SequenceValues.vue";

  export default {
    name: "SidePanel",
    components: {SequenceValues, SequenceList, EngineValues, EmitterValues, EmitterList},
    created() {
      this.$eventBus.$on(EVENT_EMITTER_PRESET_SELECTED, this.onEmitterSelected);
      this.$eventBus.$on(EVENT_EMITTER_PRESET_REMOVED, this.onEmitterRemoved);
      this.$eventBus.$on(EVENT_SEQUENCE_PRESET_SELECTED, this.onSequenceSelected);
      this.$eventBus.$on(EVENT_EMITTER_PRESET_REMOVED, this.onSequenceRemoved);
    },
    data() {
      return {
        emitterPreset: null,
        sequencePreset: null
      }
    },
    computed: {
      bundleSettings() {
        return this.$store.state.bundle;
      }
    },
    methods: {
      handleTabClick() {
        console.log('tab!');

        this.$eventBus.$emit(EVENT_EMITTER_PRESET_SELECTED, null);
        this.$eventBus.$emit(EVENT_SEQUENCE_PRESET_SELECTED, null);
        this.$eventBus.$emit(EVENT_RESET);
        this.$fx.stopAllEffects();
      },
      onEmitterSelected(preset) {
        this.emitterPreset = preset;
        this.sequencePreset = null;
        this.$editor.layers.floorGizmoLayer.visible = true;
      },
      onEmitterRemoved(preset) {
        if (this.emitterPreset === preset) {
          this.emitterPreset = null;
        }
      },
      onSequenceSelected(preset) {
        this.emitterPreset = null;
        this.sequencePreset = preset;
        this.$editor.layers.floorGizmoLayer.visible = false;
      },
      onSequenceRemoved(preset) {
        if (this.sequencePreset === preset) {
          this.sequencePreset = null;
        }
      }
    }
  }
</script>

<style scoped>
  .container {
    padding: 5px;
  }

  .engine {
    height: 180px;
  }

  .tabs {
    height: calc(100vh - 250px);
    min-height: 200px;
    width: 250px;
  }

  .values {
    /*margin-top: 5px;*/
    height: calc(100vh - 70px);
    overflow-y: auto;
    width: 300px;
    margin-right: 5px;
  }


</style>
