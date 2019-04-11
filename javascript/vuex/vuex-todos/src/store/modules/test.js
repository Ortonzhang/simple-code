
// 引入mutation常量 
import { FILTER_TODOS, NEWNAME, ADDSTRING } from '../mutation-type'

const test = {
    namespaced: true, // 添加 namespaced: true 的方式使其成为带命名空间的模块
    state: {  // 可以理解成 vue中data 就是放置所有状态的
        name : '最美的爱情回忆里待续',
        todos:[
            { id: 1, text: '最美的不是下雨天，是曾与你躲过雨的屋檐', done: true },
            { id: 2, text: '回忆是捉不到的月光握紧就变黑暗', done: false }
        ]
    },
    getters: { // 就是个计算属性 返回过滤后的值
        doneTodos: state => { 
            return state.todos.filter(todo => todo.done) 
        },
    },
    actions: { // 执行异步操作 api接口会写在这里 
        addmsg({commit}, obj){
            return new Promise((resolve, reject) => {
                setTimeout(()=> { // 使用setTimeout 模拟了异步操作 可以理解成请求成功后触发commit 调用 mutations
                    commit('ADDSTRING', obj)
                    resolve()
                }, 1000)
            })
        }
    },
    mutations: {
        // [NEWNAME] 固定写法 当没有定义mutation常量的时候 直接写也是可以的 其实就是一个函数
        [NEWNAME](state, payload) {
            state.name = payload.msg
        },
        [FILTER_TODOS](state){
            // 调用需要指定命名空间
            state.todos = this.getters['test/doneTodos']
        },
        [ADDSTRING](state, payload){
            state.name += payload.string
        }
    }
}

// 将当前的store导出
export default test