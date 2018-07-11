import 'es6-promise/auto';

import Vue from 'vue'

import * as PIXI from 'pixi.js';
import {FX} from 'revolt-fx';

import ElementUI from 'element-ui';
import locale from 'element-ui/lib/locale/lang/en'
import 'normalize.css';
import 'flex-layout-attribute';
import '@/css/main.scss';
import '@/css/theme.scss';

import App from './App'

import store from './store';

import {Editor} from "./editor/Editor";

import VueClipboard from 'vue-clipboard2'

Vue.use(VueClipboard);

Vue.config.productionTip = false;

Vue.use(ElementUI, { locale });

Vue.prototype.$eventBus = new Vue();
Vue.prototype.$fx = Editor.fx = new FX();

new Vue({
  el: '#app',
  store,
  components: { App },
  template: '<App/>'
});
