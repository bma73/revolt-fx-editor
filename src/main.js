import 'es6-promise/auto'
import './pixi-global.js'
import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'normalize.css'
import 'flex-layout-attribute'
import '@/css/main.scss'

import App from './App.vue'
import store from './store'
import { eventBus } from './eventBus'
import { Editor } from './editor/editor.js'

async function init() {
  const { FX } = await import('revolt-fx')
  const fx = new FX()
  Editor.fx = fx

  const app = createApp(App)
  app.use(store)
  app.use(ElementPlus)
  app.config.globalProperties.$eventBus = eventBus
  app.config.globalProperties.$fx = fx
  app.provide('vueApp', app)
  app.mount('#app')
}

init()
