import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import axios from "axios";
import formatTime from "./filter/formatTime";

//引入富文本编辑器
import VueQuillEditor from "vue-quill-editor";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";

Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.prototype.axios = axios;
Vue.filter('formatTime',formatTime)
Vue.use(VueQuillEditor);

Vue.prototype.baseURL =
  process.env.NODE_ENV === "production" ?"http://49.235.238.144:3000": "/api" ;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
