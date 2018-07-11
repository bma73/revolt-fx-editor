<template>
  <div style="height:100%">
    <div class="container">
      <list-entry v-for="e in elements" :key="e.id"
                  :selectedElement="selectedElement"
                  :data="e"
                  :prefix-callback="prefixCallback"
                  :name-callback="nameCallback"
                  :icon-callback="iconCallback"
                  :sub-entry-filter="subEntryFilter"
                  @select="onSelected"
                  @remove="onRemove"
      />

    </div>
    <div layout="row top-left">
      <el-button-group>
        <el-button type="primary" size="mini" @click="onAdd">Add</el-button>
        <el-button :disabled="selectedElement == null" v-if="cloneButton" type="primary" size="mini" @click="onClone">Clone</el-button>
        <el-button :disabled="selectedElement == null" v-if="renameButton" type="primary" size="mini" @click="onRename">Rename</el-button>
      </el-button-group>
    </div>
  </div>
</template>

<script>
  import ListEntry from "./ListEntry";
  import {EVENT_RESET} from "../../events";

  export default {
    name: "List",
    components: {ListEntry},
    props: {
      elements: Array,
      cloneButton: {
        type: Boolean,
        default: true
      },
      renameButton: {
        type: Boolean,
        default: true
      },
      useDefaultNamePrompt: {
        type: Boolean,
        default: true
      },
      nameCallback: {
        type: Function
      },
      prefixCallback: {
        type: Function
      },
      iconCallback: {
        type: Function
      },
      checkNameCallback: {
        type: Function
      },
      alwaysSelect: {
        type: Boolean,
        default: false
      },
      subEntryFilter: {
        type: String,
        default: null
      }
    },
    mounted() {
      this.$eventBus.$on(EVENT_RESET, () => {
        this.selectedElement = null;
      });
    },
    methods: {

      namePrompt(inputValue) {
        return this.$prompt('Please enter a name.', 'Enter Name', {
          confirmButtonText: 'OK',
          cancelButtonText: 'Cancel',
          inputValue: inputValue

        });
      },
      onSelected(element) {
        if (this.selectedElement === element && !this.alwaysSelect) return;
        this.selectedElement = element;
        this.$emit('select', element);
      },
      async onRemove(element) {
        try {
          await this.$confirm('This will delete the selection.', 'Warning', {
            confirmButtonText: 'OK',
            cancelButtonText: 'Cancel',
            type: 'warning'
          });
          this.$emit('remove', element);
          this.selectedElement = null;
        } catch (e) {
        }
      },
      async onRename(e) {
        try {
          const name = await this.enterName(this.selectedElement.data.name);
          this.$emit('rename', this.selectedElement, name);
        } catch (e) {
        }
      },
      async onClone(e) {
        try {
          const name = await this.enterName(this.selectedElement.data.name);
          this.$emit('clone', this.selectedElement, name);
        } catch (e) {
        }
      },
      async onAdd(e) {
        if (this.useDefaultNamePrompt) {
          try {
            const name = await this.enterName();
            this.$emit('add', name);
          } catch (e) {
          }
        } else {
          this.$emit('add');
        }

      },
      enterName(inputValue) {
        return new Promise(async (resolve, reject) => {
          try {
            const result = await this.namePrompt(inputValue);
            if (this.checkNameCallback) {
              if (!this.checkNameCallback(result.value)) {

                this.$alert(`Name '${ result.value }' already exists!`, 'Oh no!', {type: 'error'});
                reject();
                return;
              }
            }
            resolve(result.value);
          } catch (e) {
            reject();
          }
        });
      }
    },
    watch: {},
    data() {
      return {
        selectedElement: null,
        newName: ''
      }
    }
  }
</script>

<style lang="scss" scoped>

  @import "~element-ui/packages/theme-chalk/src/common/var";

  .container {
    height: calc(100% - 215px);
    min-height: 33px;
    overflow-y: scroll;
    overflow-x: hidden;
    margin-bottom: 5px;
    border: $--border-base;
    border-radius: $--border-radius-base;
  }


</style>
