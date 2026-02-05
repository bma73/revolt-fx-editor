<template>
  <div id="container">
    <list class="list"
          :checkNameCallback="checkName"
          :elements="elements"
          @select="onSelected"
          @remove="onRemove"
          @add="onAdd"
          @clone="onClone"
          @rename="onRename"
    />
  </div>

</template>

<script>
  import List from "./list/List.vue";
  import {EVENT_SEQUENCE_PRESET_REMOVED, EVENT_SEQUENCE_PRESET_SELECTED} from "../events";
  import {ADD_SEQUENCE_PRESET, CLONE_SEQUENCE_PRESET, DELETE_SEQUENCE_PRESET, RENAME_SEQUENCE_PRESET} from "../store";
  import * as _ from 'lodash';

  export default {
    name: "SequenceList",
    components: {List},
    computed: {
      elements() {
        return _.sortBy(this.$store.state.bundle.sequences.slice(), 'name');
      }
    },
    methods: {
      checkName(name) {
        const list = this.$store.state.bundle.sequences;
        for (let i in list) {
          if (list[i].name === name) return false;
        }
        return true;
      },
      onSelected(element) {
        this.$eventBus.$emit(EVENT_SEQUENCE_PRESET_SELECTED, element.data);
      },
      onClone(element, name) {
        this.$store.commit(CLONE_SEQUENCE_PRESET, {preset: element.data, name: name});
      },
      onAdd(name) {
        this.$store.commit(ADD_SEQUENCE_PRESET, name);
      },
      onRemove(element) {
        const list = this.$editor.getEmittersUsingComponent(element.data);
        let ok = true;

        const remove = () => {
          this.$eventBus.$emit(EVENT_SEQUENCE_PRESET_REMOVED, element.data);
          this.$store.commit(DELETE_SEQUENCE_PRESET, element.data);
        };

        if (list.length > 0) {

          let names = '';
          for (let n in list) {
            names += `<br><strong>${list[n].name}</strong>`;
          }

          this.$confirm(`The selected sequence is used by the following emitters: ${names}<br>Deleting it will also remove it from the listed emitters.`, 'Warning', {
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
        this.$store.commit(RENAME_SEQUENCE_PRESET, {preset: element.data, name: name});
      }
    }
  }
</script>

<style lang="scss" scoped>


  #container {
    height: calc(100vh - 155px);

  }

</style>
