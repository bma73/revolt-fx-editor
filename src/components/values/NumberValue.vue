<template>
  <div>
    <b>{{label}}<br></b>
    <el-tooltip :disabled="tooltip == null" :content="tooltip" :open-delay="1000">
      <el-input-number :min="lowerLimit" :max="upperLimit" :disabled="disabled" :step="step" controls-position="right" size="mini" v-model="data" @change="$emit('input', data)"/>
    </el-tooltip>
  </div>
</template>

<script>
  export default {
    name: "NumberValue",
    props: ['value', 'label', 'disabled', 'step', 'foo', 'tooltip', 'lowerLimit', 'upperLimit'],
    mounted() {
      this.data = this.value;
    },
    watch: {
      value() {
        this.data = this.value;
      }
    },
    data() {
      return {
        data: 0
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
