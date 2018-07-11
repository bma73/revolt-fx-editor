<template>
  <div style="position: relative;" @mouseover="over=true" @mouseout="over=false">
    <div class="current-thumb">
      <image-select-thumb :src="thumbSrc" @select="onShowSelection"/>
    </div>
    <div class="pane" v-show="paneVisible">

      <!--@select="onImageSelected"/>-->

      <image-select-thumb
        v-for="image in textures"
        :key="image.name"
        width="80px"
        height="80px"
        :data="image"
        :src="image.image.src"
        :name="image.name"
        @select="onImageSelected"
      />

    </div>


  </div>
</template>

<script>
  import * as PIXI from 'pixi.js';
  import ImageSelectThumb from "./ImageSelectThumb";


  export default {
    name: "ImageSelect",
    components: {ImageSelectThumb},
    props: ['value', 'textures'],
    data() {
      return {
        thumbSrc: '',
        over: false,
        paneVisible: false
      }
    },
    mounted() {
      this.thumbSrc = this.value;
    },
    watch: {
      value() {
        this.thumbSrc = this.value;
      }
    },
    methods: {
      init(currentTexture, textures) {
      },
      onShowSelection(e) {
        this.paneVisible = true;
        document.addEventListener('click', this.onDocumentClicked);
      },
      onImageSelected(image) {
        this.$emit('selected', image.data);
        this.closePane();
      },
      onDocumentClicked() {
        this.closePane();
      },
      closePane() {
        this.paneVisible = false;
        document.removeEventListener('click', this.onDocumentClicked);
      }

    }

  }
</script>

<style lang="scss" scoped>

  @import "~element-ui/packages/theme-chalk/src/common/var";

  $thumbSize: 80px;

  .current-thumb {
    border-radius: $--border-radius-base;
    border: $--border-base;
    padding: 5px;
    width: $thumbSize;
    height: $thumbSize;

  }

  .pane {
    position: absolute;
    background-color: white;
    width: $thumbSize * 3 + 12;
    height: $thumbSize * 4 + 12;
    overflow-x: hidden;
    overflow-y: auto;
    margin-top: 5px;
    border-radius: $--border-radius-base;
    box-shadow: $--box-shadow-dark;
    border: $--border-base;
    padding: 2px;
    z-index: 5;
  }

  .thumb {
    float: left;
  }


</style>
