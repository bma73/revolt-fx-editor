<template>
  <div>
    <b>{{ label }}<br></b>
    <el-slider size="small" :model-value="degree" :min="0" :max="360" :step="1" @update:model-value="$emit('update:modelValue', $event * Math.PI / 180)"/>
  </div>
</template>

<script>
export default {
  name: 'AngleDegreeSlider',
  props: ['modelValue', 'label'],
  emits: ['update:modelValue'],
  computed: {
    degree() {
      return Math.round((this.modelValue || 0) * 180 / Math.PI)
    },
  },
}
</script>

<style scoped>
div { margin-bottom: 5px; }
b { font-size: 14px; }
</style>
