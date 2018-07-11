<template>
  <div>
    <b>{{label}}<br></b>
    <el-slider size="mini" v-model="data" :min="0" :max="360" step.number="1"  @change="$emit('input', data * Math.PI / 180)"/>
  </div>
</template>

<script>
  export default {
    name: "AngleDegreeSlider",
    props: ['value', 'label'],
    mounted() {
      this.data = Math.round(this.value * 180/ Math.PI);
    },
    watch: {
      value() {
        this.data = Math.round(this.value * 180/ Math.PI);
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
