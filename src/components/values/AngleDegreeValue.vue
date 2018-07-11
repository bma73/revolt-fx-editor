<template>
  <div>
    <b v-if="label">{{label}}<br></b>
    <el-input-number style="width:100%; max-width: 130px;" size="mini" v-model="data" :min="lowerLimit" :max="upperLimit" :step="step" controls-position="right" @change="$emit('input', data * Math.PI / 180)"/>
  </div>
</template>

<script>

  const round = value => {
    return Number((value * 180/ Math.PI).toFixed(1))
  };

  export default {
    name: "AngleDegreeValue",
    props: ['value', 'label', 'step', 'lowerLimit', 'upperLimit'],
    mounted() {
      this.data = round(this.value);
    },
    watch: {
      value() {
        this.data = round(this.value);
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
