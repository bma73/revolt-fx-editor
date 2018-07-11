<template>
  <div>
    <b>{{label}}<br></b>
    <el-color-picker v-model="data" @change="$emit('input', int)"/>
  </div>
</template>

<script>
  export default {
    name: "ColorValue",
    props: ['value', 'label', 'disabled'],
    mounted() {
      this.data = '#' + this.value.toString(16);
    },
    computed: {
      int() {
        if (this.data == null) {
          this.data = '#ffffff';
        }
        return parseInt(this.data.replace('#', ''), 16);
      }
    },
    watch: {
      value() {
        this.data = '#' + this.value.toString(16);
      }
    },
    data() {
      return {
        data: '#ff00ff'
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
