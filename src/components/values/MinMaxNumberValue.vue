<template>
  <div style="margin-bottom: 10px">
    <b>{{label}}<br></b>
    <el-row type="flex" style="margin-top: -4px">
      <el-col>
        <div class="label">{{minLabel || 'Min'}}</div>
        <el-input-number class="input" :min="lowerLimit" :max="upperLimit" controls-position="right" size="mini" v-model="minValue" :step="step" @change="$emit('update:min', minValue)"/>
      </el-col>
      <el-col>
        <div class="label">{{maxLabel || 'Max'}}</div>
        <el-input-number class="input" :min="lowerLimit" :max="upperLimit" controls-position="right" size="mini" v-model="maxValue" :step="step" @change="$emit('update:max', maxValue)"/>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    name: "MinMaxNumberValue",
    props: ['min', 'max', 'label', 'step', 'lowerLimit', 'upperLimit', 'minLabel', 'maxLabel'],
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
