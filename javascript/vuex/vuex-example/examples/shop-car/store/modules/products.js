import shop from '../../api/data'
import { GETALLDATA, DECREMNETPRODUCT, INCREMENTPRODUCT, CHANGEPRODUCT, RESTOREPRODUCT} from '../mutations-type'

const state = {
    all:[]
}
const getters = {

}
const mutations = {
    [GETALLDATA](state, products) { // 获取商品数据
        state.all = JSON.parse(JSON.stringify(products))
    },
    [DECREMNETPRODUCT](state, { id }) { // 商品数据数量减去1
        const product = state.all.find(product => product.id === id)
        if(product.store > 0){
            product.store--
        } 
    },
    [INCREMENTPRODUCT](state, { id }){ // 商品数据数量增加1
        const product = state.all.find(product => product.id === id)
        if(product.store <  product.max){
            product.store++
        }
    },
    [CHANGEPRODUCT](state, {id, number}){ // 商品数据数量更改 购物车触发
        const product = state.all.find(product => product.id === id)
        if(number < product.max){
            product.store = product.max - Number(number)
        } else {
            product.store = 0
        }
    },
    [RESTOREPRODUCT](state, params){ // 还原某一个商品
        const item = state.all.find(product => product.id === params.id)
        item.store += params.count
    }
}
const actions = {
    getAllData ({commit}) { // 获取所有商品
        return new Promise((resolve, reject) => {
            // 返回promise 供其他模块调用
            shop.getData().then((data) => {
                commit('GETALLDATA', data)
                resolve()
            })
        })
        
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}