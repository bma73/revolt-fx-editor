<template>
  <div>
    <b>{{ label }}<br></b>
    <el-color-picker :model-value="colorStr" @update:model-value="onChange"/>
  </div>
</template>

<script>
export default {
  name: 'ColorValue',
  props: ['modelValue', 'label', 'disabled'],
  emits: ['update:modelValue'],
  computed: {
    colorStr() {
      const v = this.modelValue
      return v != null ? '#' + (typeof v === 'number' ? v : parseInt(v, 16)).toString(16).padStart(6, '0') : '#ffffff'
    },
  },
  methods: {
    onChange(val) {
      this.$emit('update:modelValue', val ? parseInt(val.replace('#', ''), 16) : 0xffffff)
    },
  },
}
</script>

<style scoped>
div { margin-bottom: 5px; }
b { font-size: 14px; }
</style>
