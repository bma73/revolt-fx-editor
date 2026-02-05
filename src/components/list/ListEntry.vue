<template>
  <div :class="{entry:true, selected:selected, master:!isSubEntry, 'sub-entry':isSubEntry}" layout="row center-left" @click="select">
    <span v-if="prefix != null" class="prefix">{{prefix}}</span>
    <div class="thumb" v-if="icon">
      <img :src="icon"/>
    </div>
    <span :class="{sub:isSubEntry}">{{this.name}}</span>
    <el-icon class="delete-icon" @click.stop="remove"><Delete /></el-icon>
  </div>
</template>

<script>
import { Delete } from '@element-plus/icons-vue'

export default {
  name: 'ListEntry',
  components: { Delete },
  props: ['data', 'selectedElement', 'nameCallback', 'prefixCallback', 'iconCallback', 'subEntryFilter'],
    data() {
      return {
        listEntry: true,
        name:''
      }
    },
    computed: {
      prefix() {
        if (this.prefixCallback) {
          return this.prefixCallback(this.data);
        }
        return null;
      },
      selected() {
        return this.selectedElement === this
      },
      icon() {
        if (this.iconCallback) {
          const i = this.iconCallback(this.data);
          return i;
        }
        return null;
      },
      isSubEntry() {
        this.getName();
        return this.name.indexOf(this.subEntryFilter) > -1;
      }

    },
    methods: {
      select(e) {
        this.$emit('select', this);
      },
      remove(e) {
        this.$emit('remove', this);
      },
      getName() {
        this.name = this.nameCallback ? this.nameCallback(this.data) : this.data.name
      }
    },
    watch: {
      'data': {
        handler(newVal, oldVal) {
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .thumb {
    position: relative;
    padding: 2px;
    margin: 0;
    cursor: pointer;
    background-color: #409eff;
    margin: 1px;
    border-radius: 4px;
    overflow: hidden;
    width: 25px;
    height: 25px;
    margin-right: 7px;
  }

  .thumb img {
    max-width: 100%;
    height: auto;
  }

  .prefix {
    width: 40px;
    margin-right: 5px;
    background-color: #909399;
    color: white;
    font-size: 0.75rem;
    border-radius: 4px;
    text-align: center;
  }

  .delete-icon {
    cursor: pointer;
    margin-left: auto;
  }

  .entry {
    height: 28px;
    /*margin-bottom: 0.05rem;*/
    padding-left: 10px;
    padding-right: 15px;
    width: 100%;
    font-size: 1rem;
    cursor: pointer;
  }

  .sub-entry {
    height:22px;
  }

  .selected {
    color: #409eff;
    background-color: #ecf5ff;
    font-weight: 400;
  }

  .master {
    font-weight: 400;
  }

  .sub {
    margin-left:12px;
    font-size: 0.9rem;
    margin-top: -0rem;
  }

  span {
    white-space: nowrap;
    max-width: calc(100% - 25px);
    overflow: hidden;
  }

</style>
