<template lang="pug">
    .page-container
        el-row(:gutter="20") 
            el-col(:span="16")
                h3 计数器应用
                p 当前数字{{ number }}， 它是{{ type }}
                el-button(@click="increment") +
                el-button(@click="decrement") -
                el-button(@click="changeodd")
                    | 添加到偶数
                el-input(placeholder="请输入等待时间", v-model="time", style="width: 150px; margin: 0 15px")
                el-button(@click="incrementAsync", :disabled="!time")
                    | 异步增加1
</template>
<script>
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'

export default {
    data(){
        return {
            time:''
        }
    },
    computed:{
        ...mapState(['number', 'msg']),
        ...mapGetters(['type'])
    }
    ,
    methods:{
        ...mapActions(['increment', 'decrement', 'changeodd']),
        incrementAsync(){ // 根据用户输入等待秒数 进行加1操作
            this.$store.dispatch('incrementAsync',this.time)
            this.time = ''
        }

    }
}
</script>

<style lang="scss" scoped>
.page-container{
    width: 1140px;
    margin: 30px auto;
}
</style>

