import Vue from 'vue'
import Vuex from 'vuex'
import test from './modules/test'

Vue.use(Vuex)


export default new Vuex.Store({
    modules:{ // modules 是因为当项目中的store多了的时候，写在一个文件中不好维护。 用来进行模块划分
        test
    }
})