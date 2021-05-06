import Vue from 'vue';
import App from './App';
import router from './router';
import ElementUI from 'element-ui';
import axios from 'axios';
import VueAxios from 'vue-axios';
import 'element-ui/lib/theme-chalk/index.css';
import VeeValidate from 'vee-validate';
import store from './store/store';
import VueCookie from 'vue-cookie';
import './assets/icon/iconfont.css';
import i18n from '@/i18n/i18n';
Vue.use(ElementUI);
Vue.use(VueCookie);
Vue.use(VueAxios, axios);
Vue.config.productionTip = false;

import api from '@/request/api.js' // 导入api接口
Vue.prototype.$api = api;
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
	i18n,
  components: { App },
  template: '<App/>'
})