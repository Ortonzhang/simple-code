import { ADDTOCART, INPUTCART, REMOVECARTITEM, EMPTYCART } from '../mutations-type'
const state = {
    buylist:[]
}
const mutations = {
    [ADDTOCART](state, product) { // 添加商品到购物车
        let commodity = state.buylist.find(item => item.id === product.id )
        if(commodity){ // 已经存在 直接加数量
            commodity.count++
        } else { // 不存在 添加数据到购物车
            state.buylist.push(Object.assign({}, product, {count: 1}))
        }
    },
    [INPUTCART](state, params){ // 更改购买商品数量
        /*
            params: {
                number: 更改的数量 ,
                id: 商品id 
            }
        */
        let commodity = state.buylist.find(item => item.id === params.id )
        if(params.number > commodity.max){ // 最大为商品最大值
            commodity.count =  commodity.max   
        } else {
            commodity.count = Number(params.number)  // 转成number类型
        }
    },
    [REMOVECARTITEM](state, { id }){ // 删除一个购物车商品
        let list = state.buylist.filter(item => item.id !== id )  // 过滤掉用户选择的
        state.buylist = list
    },
    [EMPTYCART](state){   // 清空购物车
        state.buylist = []
    }

}

const actions = {
    pushcar({state, commit}, product){ 
        commit('ADDTOCART', product)    // 添加到购物车
        commit('DECREMNETPRODUCT', {id: product.id}) // 商品展示数量 减去1
    },
    decrement({state, commit}, product){ 
        commit('DECREMNETPRODUCT', {id: product.id}) // 购物车某个商品数量减1
    },
    increment({state, commit}, product){
        commit('INCREMENTPRODUCT', {id: product.id}) // 购物车某个商品数量加1
    },
    change({state, commit}, product){ // 更改某一个商品数量
        commit('INPUTCART', product)
        commit('CHANGEPRODUCT', product) // 更改商品显示数量
    },
    remove({state, commit}, product){ // 删除当前商品
        commit('REMOVECARTITEM', product)
        commit('RESTOREPRODUCT', product)
    },
    empty({dispatch, commit}){  // 清空
        return dispatch('getAllData').then((data) => { //  调用商品的actions 还原商品数据
            commit('EMPTYCART')
        })
    }
}

const getters = {
    carList: (state) => {
        return state.buylist
    },
    totalPrice: (state) => {
        return state.buylist.reduce((total,product)=>{
            return total + product.price * product.count
        },0)
    }
}

export default {
    state,
    mutations,
    actions,
    getters
}