<template>
  <div class="hello">
    <h1>{{ name }}</h1>
    <input type="text" v-model="msg">
    <button @click="NEWNAME({msg})">更改标题</button>
    <ul>
      <li v-for="item in todos" :key="item.id">{{item.text}}</li>
    </ul>
    <button @click="FILTER_TODOS">获取周杰伦唱的歌</button>
    <!-- <button @click="add">添加😊</button> -->
    <button @click="addmsg({string:'😊'})">添加😊</button>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'

// 使用 createNamespacedHelpers 创建基于某个命名空间辅助函数
const { mapState, mapMutations, mapActions } = createNamespacedHelpers('test') // 需要获取test模块下的数据 
export default {
  data () {
    return {
      msg: ''
    }
  },
  computed : {
    ...mapState(['name', 'todos']),
  },
  mounted() {
    console.log(this.$store.state.test)
  },
  methods:{
    // change(){
    //   this.$store.commit({
    //     type:'NEWNAME',
    //     msg: this.msg 
    //   })
    //   this.msg = ''
    // },
    // getlist(){
    //   this.$store.commit('FILTER_TODOS')
    // },
    ...mapMutations(['FILTER_TODOS', 'NEWNAME']),
    ...mapActions(['addmsg']),
    // add(){
    //   this.$store.dispatch('addmsg', {string: '😄'})
    // }

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  margin: 10px;
}
a {
  color: #42b983;
}
</style>
