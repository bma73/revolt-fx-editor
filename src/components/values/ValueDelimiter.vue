<template>
  <div><span class="label">{{label}}</span></div>
</template>

<script>
  export default {
    name: "ValueDelimiter",
    props: ['label']
  }
</script>

<style lang="scss" scoped>
  @import "~element-ui/packages/theme-chalk/src/common/var";

  div {
    border-bottom: 1px solid $--border-color-base;
    margin-top: 15px;
    margin-bottom: 15px;
    position: relative;
  }

  .label {
    position: absolute;
    top:-10px;
    right: 8px;
    background: white;
    padding-left: 3px;
    padding-right: 3px;
    color: #8C8F95;
    font-size:0.8rem;
  }
</style>
