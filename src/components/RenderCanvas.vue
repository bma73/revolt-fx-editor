<template>
  <div class="wh100" style="border-radius: 12px; position: relative;">
    <canvas ref="canvas"></canvas>
    <canvas-options class="options"/>
  </div>
</template>

<script>


  import * as PIXI from 'pixi.js';
  import CanvasOptions from "./CanvasOptions.vue";


  export default {
    name: "RenderCanvas",
    components: {CanvasOptions},
    data() {
      return {
        app: null
      }
    },
    methods: {
      resize() {
        const canvas = this.$refs.canvas;
        const w = canvas.offsetWidth;
        const h = canvas.offsetHeight;
        this.app.renderer.resize(w, h);
        if (this.$editor) this.$editor.resize(w, h);
      }
    },
    mounted() {

      const canvas = this.$refs.canvas;
      let w = canvas.offsetWidth;
      let h = canvas.offsetHeight;
      const app = this.app = new PIXI.Application(w, h, {
        view: canvas,
        backgroundColor: 0x333333,
        roundPixels: true
      });

      const resize = () => {

      };

      window.addEventListener('resize', () => {
        this.resize();
      });


      // app.ticker.add(()=>{
      //   console.log('sss');
      // });


      // const g  = new PIXI.Graphics();
      // g.beginFill(0xffffff, 1).drawRect(0,0,100,100).endFill();
      // app.stage.addChild(g);


      setTimeout(() => {
        this.$eventBus.$emit('canvasReady', app);
        this.resize();
      }, 200);


    }
  }
</script>

<style scoped>
  canvas {
    width: 100%;
    height: calc(100vh - 70px);
    background-color: white;
    padding: 0;
    margin: 0;
    border-radius: 5px;
  }

  .options {
    position: absolute;
    left: 5px;
    bottom: 5px;
  }

</style>
