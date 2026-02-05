<template>
  <div id="app">
    <div class="blocker" v-if="blocker"></div>
    <el-container>
      <el-header>
        <top-menu />
      </el-header>
      <el-container>
        <el-container>
          <el-main>
            <render-canvas />
          </el-main>
        </el-container>
        <el-aside width="560px">
          <side-panel />
        </el-aside>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import RenderCanvas from './components/RenderCanvas.vue'
import TopMenu from './components/TopMenu.vue'
import SidePanel from './components/SidePanel.vue'
import { Editor } from './editor/editor.js'

export default {
  name: 'App',
  components: { SidePanel, TopMenu, RenderCanvas },
  inject: ['vueApp'],
  data() {
    return { blocker: true }
  },
  mounted() {
    this.$eventBus.$once('canvasReady', async (app) => {
      const editor = new Editor(app, this)
      this.vueApp.config.globalProperties.$editor = editor
      await editor.loadDefaultBundle()
      this.blocker = false
    })
  },
}
</script>

<style>
#app {
  width: 100%;
  height: 100%;
}

.blocker {
  position: absolute;
  background-color: white;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 10;
}

.el-main {
  height: 100%;
  width: 100%;
  padding: 5px;
  margin: 0;
}
</style>
