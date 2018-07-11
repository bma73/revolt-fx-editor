<template>
  <div>
    <b v-if="label">{{label}}<br></b>
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: "ValueElement",
    props: ['label']
  }
</script>

<style scoped>
  b {
    font-size: 14px;
  }
  div {
    margin-bottom: 10px;
  }
</style>
