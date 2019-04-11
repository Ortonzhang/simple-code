import Vue from 'vue'
import Vuex from 'vuex'
import { INCREMENT, DECREMENT } from './mutation-type'
Vue.use(Vuex)


const state = {
    number: 0,
    msg: ''
}

const getters = {
    type: state => state.number % 2 === 0 ? '偶数' : '单数'
}

const mutations = {
    [INCREMENT] (state) {
        state.number++
    },
    [DECREMENT] (state) {
        state.number--
    }
}

const actions = {
    increment: ({ commit }) => commit('INCREMENT'),
    decrement: ({ commit }) => commit('DECREMENT'),
    changeodd: ({ commit, state }) => {
        if(state.number % 2 !== 0){
            commit('INCREMENT')
        }
    },
    incrementAsync: ({ commit }, time) => {
        return new Promise((resolve, reject) => {
            setTimeout(()=>{
                commit('INCREMENT')
                resolve()
            }, time * 1000)
        })
    }
}

export default new Vuex.Store({
    state,
    getters,
    mutations,
    actions
})