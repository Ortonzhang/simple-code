import Vue from 'vue'
import Vuex from 'vuex'
import car from './modules/car'
import products from './modules/products'
Vue.use(Vuex)



export default new Vuex.Store({
    modules:{
        car,
        products
    }
})