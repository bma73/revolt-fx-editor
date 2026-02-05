<template>
  <div>
    <b>{{ label }}</b><br>
    <el-select :disabled="disabled" size="small" :model-value="modelValue" @update:model-value="$emit('update:modelValue', $event); $emit('change', $event)">
      <el-option
        v-for="option in options"
        :key="option.value"
        :value="option.value"
        :label="getLabel(option)"
      />
    </el-select>
  </div>
</template>

<script>
import _ from 'lodash'

export default {
  name: 'SelectValue',
  props: ['modelValue', 'label', 'options', 'disabled'],
  emits: ['update:modelValue', 'change'],
  methods: {
    getLabel(option) {
      return option.name == null || option.name === '' ? _.startCase(option.value.replace('ease', '')) : option.name
    },
  },
}
</script>

<style scoped>
  div {
    margin-bottom: 5px;
  }
  b {
    font-size: 14px;
  }
</style>
