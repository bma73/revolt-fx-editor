<template>
  <div class="thumb" :style="{width: _width, height: _height}" layout="row center-center" @click.stop="handleClick">
    <img :src="src"/>

    <span>{{name}}</span>
  </div>
</template>

<script>
  export default {
    name: "ImageSelectThumb",
    props: ['width', 'height', 'src', 'data', 'name'],
    computed: {
      _width() {
        return this.width || '100%';
      },
      _height() {
        return this.height || '100%';
      }
    },
    methods: {
      handleClick(e) {
        this.$emit('select', this);
      }
    }

  }
</script>

<style lang="scss" scoped>

  .thumb {
    position: relative;
    padding: 2px;
    margin: 0;
    cursor: pointer;
    background-color: #409eff;
    margin: 1px;
    border-radius: 4px;
    overflow: hidden;
  }

  .thumb img {
    max-width: 100%;
    height:auto;
  }

  .thumb span {
    position: absolute;
    bottom: 0;
    left: 0;
    text-align: center;
    width: 100%;
    z-index: 1;
    font-size: 0.55rem;
    text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;
    color: white;
    letter-spacing: 0.6px;
    background-color: rgba(0, 0, 0, 0.3);
  }
</style>
