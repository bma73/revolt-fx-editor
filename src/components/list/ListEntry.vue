<template>
  <div :class="{entry:true, selected:selected, master:!isSubEntry, 'sub-entry':isSubEntry}" layout="row center-left" @click="select">
    <span v-if="prefix != null" class="prefix">{{prefix}}</span>
    <div class="thumb" v-if="icon">
      <img :src="icon"/>
    </div>
    <span :class="{sub:isSubEntry}">{{this.name}}</span>
    <i class="el-icon-delete" self="right" @click.stop="remove"></i>
  </div>
</template>

<script>
  export default {
    name: "ListEntry",
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

  @import "~element-ui/packages/theme-chalk/src/common/var";

  .thumb {
    position: relative;
    padding: 2px;
    margin: 0;
    cursor: pointer;
    background-color: mix($--color-primary, white, 30);
    margin: 1px;
    border-radius: $--border-radius-base;
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
    background-color: $--color-info;
    color: white;
    font-size: 0.75rem;
    border-radius: $--border-radius-base;
    text-align: center;

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
    color: $--color-primary;
    background-color: mix(white, $--color-primary, 92%);
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
