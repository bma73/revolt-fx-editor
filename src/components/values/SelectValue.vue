<template>
  <div>
    <b>{{label}}</b><br>
    <el-select :disabled="disabled" size="small" v-model="data" @change="$emit('input', data);$emit('change', data);">
      <el-option
        v-for="option in options"
        :value="option.value"
        :label="getLabel(option)"
      />
    </el-select>
  </div>
</template>

<script>
  import * as _ from 'lodash';
  export default {
    name: "SelectValue",
    props: ['value', 'label', 'options', 'disabled'],
    mounted() {
      this.data = this.value;
    },
    methods: {
      getLabel(option) {
          return option.name == null || option.name == '' ? _.startCase(option.value.replace('ease', '')) : option.name;
      }
    },
    watch: {
      value() {
        this.data = this.value;
      }
    },
    data() {
      return {
        data: ''
      }
    }

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
