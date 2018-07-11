<template>
  <div id="container">
    <list class="list"
          :checkNameCallback="checkName"
          :elements="elements"
          sub-entry-filter="-sub"
          @select="onSelected"
          @remove="onRemove"
          @add="onAdd"
          @clone="onClone"
          @rename="onRename"
    />
  </div>

</template>

<script>
  import List from "./list/List";
  import {ADD_EMITTER_PRESET, CLONE_EMITTER_PRESET, DELETE_EMITTER_PRESET, RENAME_EMITTER_PRESET} from "../store";
  import {EVENT_EMITTER_PRESET_REMOVED, EVENT_EMITTER_PRESET_SELECTED} from "../events";
  import * as _ from 'lodash';

  export default {
    name: "EmitterList",
    components: {List},
    computed: {
      elements() {
        return _.sortBy(this.$store.state.bundle.emitters.slice(), 'name');
      }
    },
    methods: {
      checkName(name) {
        const list = this.$store.state.bundle.emitters;
        for (let i in list) {
          if (list[i].name === name) return false;
        }
        return true;
      },
      onSelected(element) {
        this.$eventBus.$emit(EVENT_EMITTER_PRESET_SELECTED, element.data);
      },
      onClone(element, name) {
        this.$store.commit(CLONE_EMITTER_PRESET, {preset: element.data, name: name});
      },
      onAdd(name) {
        this.$store.commit(ADD_EMITTER_PRESET, name);
      },
      onRemove(element) {
        const list = this.$editor.getEmittersUsingComponent(element.data);

        const remove = () => {
          this.$eventBus.$emit(EVENT_EMITTER_PRESET_REMOVED, element.data);
          this.$store.commit(DELETE_EMITTER_PRESET, element.data);
        };

        if (list.length > 0) {

          let names = '';
          for (let n in list) {
            names += `<br><strong>${list[n].name}</strong>`;
          }

          this.$confirm(`The selected emitter is used by the following emitters: ${names}<br>Deleting it will also remove it from the listed emitters.`, 'Warning', {
            confirmButtonText: 'OK',
            cancelButtonText: 'Cancel',
            type: 'warning',
            dangerouslyUseHTMLString: true
          }).then(() => {
            this.$editor.deleteComponentFromEmitters(element.data, list);
            remove();
          }).catch(() => {
          });
        } else {
          remove();
        }

      },
      onRename(element, name) {
        this.$store.commit(RENAME_EMITTER_PRESET, {preset: element.data, name: name});
      }
    }
  }
</script>

<style lang="scss" scoped>


  #container {
    height: calc(100vh - 155px);

  }

</style>
