<template>
  <div class="group" >
    <div class="label">{{label}}</div>
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: "ValueGroup",
    props:['label', 'sub']
  }
</script>

<style lang="scss" scoped>

  .group {
    border-radius: 4px;
    border: 1px solid #dcdfe6;
    padding: 10px;
    margin-bottom: 5px;
    margin-top: 15px;
    position: relative;


  }
  .label {
    position: absolute;
    top:-10px;
    right: 8px;
    background: white;
    padding-left: 3px;
    padding-right: 3px;
    color: #409eff;
    font-size:1rem;
    font-weight:400;
  }
</style>
