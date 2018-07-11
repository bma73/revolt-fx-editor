<template>
  <el-tooltip
    :effect="$store.state.settings.tt.effect"
    :content="text"
    :placement="$store.state.settings.tt.placement"
    :open-delay="$store.state.settings.tt.delay"
  >
    <slot></slot>
  </el-tooltip>
</template>

<script>
    export default {
        name: "Help",
        props:['text']
    }
</script>

<style scoped>

</style>
