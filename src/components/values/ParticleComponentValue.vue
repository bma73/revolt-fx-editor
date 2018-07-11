<template>

  <div>
    <value-element label="Component">
      <div v-if="type==0">
        <better-image-select v-model="spriteValue" :textures="$editor.spritesheetImagesMap" @input="onSelect"/>
      </div>
      <div v-if="type==1">
        <better-image-select v-model="movieClipValue" :textures="$editor.moveClipImagesMap" @input="onSelect"/>
      </div>
    </value-element>
  </div>
</template>

<script>
  import BetterImageSelect from "../imageselect/BetterImageSelect";
  import ValueElement from "./ValueElement";

  export default {
    name: "ParticleComponentValue",
    components: {ValueElement, BetterImageSelect},
    props: ['value', 'type'],
    mounted() {
      this.setRightValue(this.type, this.value);
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
        handler(newVal, oldVal) {
          this.setRightValue(newVal, this.value);
        }
      },
      'value': {
        handler(newVal, oldVal) {
          this.setRightValue(this.type, newVal);
        }
      }
    }
    ,
    methods: {
      setRightValue(type, value) {
        switch (type) {
          case 0:
            if (this.$editor.spritesheetImagesMap[this.value] == null) {
              this.spriteValue = this.$editor.defaultSprite.name;
              this.$emit('input', this.spriteValue);
            } else {
              this.spriteValue = this.value;
            }
            break;
          case 1:
            if (this.$editor.moveClipImagesMap[this.value] == null) {
              this.movieClipValue = this.$editor.defaultMovieClip.name;
              this.$emit('input', this.movieClipValue);
            } else {
              this.movieClipValue = this.value;
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
        this.$emit('input', value);
      }
    }
  }
</script>

<style scoped>

</style>
