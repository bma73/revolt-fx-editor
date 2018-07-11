<template>
  <div style="margin-bottom: 10px">
    <b>{{label}}<br></b>
    <el-row type="flex" style="margin-top: -4px">
      <el-col>
        <div class="label">Min</div>
        <angle-degree-value class="input" :min="lowerLimit" :max="upperLimit" controls-position="right" size="mini" v-model="minValue" :step="step" @input="$emit('update:min', minValue)"/>
      </el-col>
      <el-col>
        <div class="label">Max</div>
        <angle-degree-value class="input" :min="lowerLimit" :max="upperLimit" controls-position="right" size="mini" v-model="maxValue" :step="step" @input="$emit('update:max', maxValue)"/>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import AngleDegreeValue from "./AngleDegreeValue";
  export default {
    name: "MinMaxNumberAngleDegreesValue",
    components: {AngleDegreeValue},
    props: ['min', 'max', 'label', 'step', 'lowerLimit', 'upperLimit'],
    mounted() {
      this.minValue = this.min;
      this.maxValue = this.max;
    },
    watch:{
      min() {
        this.minValue = this.min;
      },
      max() {
        this.maxValue = this.max;
      }
    },
    data() {
      return {
        minValue: 0,
        maxValue: 0
      }
    }
  }
</script>

<style scoped>
  .label {
    font-size: 0.8rem;
    margin-bottom: -2px;
  }

  .input {
    width: 100px;
  }

  b {
    font-size: 14px;
  }
</style>
