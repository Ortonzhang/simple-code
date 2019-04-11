import Vue from 'vue'
import Vuex from 'vuex'
import store from './store/index'
import ElementUI from 'element-ui'
import Counter from './components/counter'
Vue.use(ElementUI)
Vue.use(Vuex)
console.log(Counter)
new Vue({
    el:'#app',
    store,
    render: h => h(Counter)
})