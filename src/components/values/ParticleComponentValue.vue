<template>

  <div>
    <value-element label="Component">
      <div v-if="type==0">
        <better-image-select v-model="spriteValue" :textures="$editor.spritesheetImagesMap" @update:modelValue="onSelect"/>
      </div>
      <div v-if="type==1">
        <better-image-select v-model="movieClipValue" :textures="$editor.moveClipImagesMap" @update:modelValue="onSelect"/>
      </div>
    </value-element>
  </div>
</template>

<script>
  import BetterImageSelect from "../imageselect/BetterImageSelect.vue";
  import ValueElement from "./ValueElement.vue";

  export default {
    name: "ParticleComponentValue",
    components: {ValueElement, BetterImageSelect},
    props: ['modelValue', 'type'],
    emits: ['update:modelValue'],
    mounted() {
      this.setRightValue(this.type, this.modelValue);
    },
    computed: {},
    data() {
      return {
        spriteValue: null,
        movieClipValue: null
      }
    },
    watch: {
      'type': {
        handler(newVal) {
          this.setRightValue(newVal, this.modelValue);
        }
      },
      'modelValue': {
        handler(newVal) {
          this.setRightValue(this.type, newVal);
        }
      }
    }
    ,
    methods: {
      setRightValue(type, value) {
        switch (type) {
          case 0:
            if (this.$editor.spritesheetImagesMap[value] == null) {
              this.spriteValue = this.$editor.defaultSprite.name;
              this.$emit('update:modelValue', this.spriteValue);
            } else {
              this.spriteValue = value;
            }
            break;
          case 1:
            if (this.$editor.moveClipImagesMap[value] == null) {
              this.movieClipValue = this.$editor.defaultMovieClip.name;
              this.$emit('update:modelValue', this.movieClipValue);
            } else {
              this.movieClipValue = value;
            }
            break;
        }
      },
      onSelect(e) {
        let value;
        switch (this.type) {
          case 0:
            value = this.spriteValue;
            break;
          case 1:
            value = this.movieClipValue;
            break;
        }
        this.$emit('update:modelValue', value);
      }
    }
  }
</script>

<style scoped>

</style>
