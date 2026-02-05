<template>
  <div>
    <b>{{ label }}<br></b>
    <el-tooltip :disabled="tooltip == null" :content="tooltip" :open-delay="1000">
      <el-input-number :min="lowerLimit" :max="upperLimit" :disabled="disabled" :step="step" controls-position="right" size="small" :model-value="modelValue" @update:model-value="$emit('update:modelValue', $event)"/>
    </el-tooltip>
  </div>
</template>

<script>
export default {
  name: 'NumberValue',
  props: ['modelValue', 'label', 'disabled', 'step', 'foo', 'tooltip', 'lowerLimit', 'upperLimit'],
  emits: ['update:modelValue'],
}
</script>

<style scoped>
div { margin-bottom: 5px; }
b { font-size: 14px; }
</style>
