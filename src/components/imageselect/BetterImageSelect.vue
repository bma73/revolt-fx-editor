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
  import ImageSelectThumb from "./ImageSelectThumb.vue";


  export default {
    name: "BetterImageSelect",
    components: {ImageSelectThumb},
    props: ['modelValue', 'textures'],
    data() {
      return {
        over: false,
        paneVisible: false
      }
    },
    mounted() {

    },
    computed: {
      thumbSrc() {
        if (this.modelValue && this.textures) {
          const imageDef = this.textures[this.modelValue];
          if (!imageDef) {
            return null;
          }
          return imageDef.image.src;
        }
        return null;
      }
    },
    watch: {},
    methods: {
      init(currentTexture, textures) {
      },
      onShowSelection(e) {
        this.paneVisible = true;
        document.addEventListener('click', this.onDocumentClicked);
      },
      onImageSelected(image) {
        this.$emit('update:modelValue', image.data.name);
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


  $thumbSize: 80px;

  .current-thumb {
    border-radius: 4px;
    border: 1px solid #dcdfe6;
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
    border-radius: 4px;
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.3);
    border: 1px solid #dcdfe6;
    padding: 2px;
    z-index: 5;
  }

  .thumb {
    float: left;
  }


</style>
