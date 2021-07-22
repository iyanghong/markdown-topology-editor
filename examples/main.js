import Vue from 'vue'
// import App from './markdown-editor.vue'
// import App from './markdown-editor-lib.vue'
// import App from './topology-editor.vue'
import App from './views/topology-editor-lib.vue'
// import App from './topology-view.vue'


Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
