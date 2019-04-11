<template lang="pug">
.car
    h4 购物车
    p(v-if="!carList.length") 啊哦，购物车还是空的，赶紧去添加商品吧
    ul.car-list(v-if="carList.length")
        li(v-for="item in carList") 
            dl
                dt 
                    img.img(:src="item.src")
                dd.name {{ item.name }}
                dd.price ¥{{ item.price }}
                dd.count
                    inputButton(:number="item.count", :id="item.id", :max="item.max", @decrement="decrement(item)", @increment="increment(item)", @input="input")  
                dd.price ¥{{ item.price }}
                dd.sumprice ¥{{ item.price * item.count }}
                dd
                    el-button(size="small", @click="remove(item)") 删除
    el-row(:gutter="20", v-if="carList.length")
        h4 结算
        .box
            p  总价 ¥{{ totalPrice }}
            el-button(@click="empty", size="small") 清空购物车
</template>
<script>
import Vue from 'vue'
import  { mapGetters, mapActions } from 'vuex'
import inputButton from './input-button'
export default {
    computed:{
        ...mapGetters(['carList', 'totalPrice'])
    },
    methods:{
        decrement(item){
            if(item.count > 1){
                item.count--
                this.$store.dispatch('increment', item)
            } else {
                item.count = 1
            }
            
        },
        increment(item){
            if(item.max > item.count){
                item.count++
            } else {
                item.count = item.max
            }
            this.$store.dispatch('decrement', item)
        },
        input(obj){
            this.$store.dispatch('change', obj)
        },
        remove(obj){
            this.$confirm('确定删除当前商品?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$store.dispatch('remove', obj)
            }).catch(()=>{

            })       
        },
        empty(){
            this.$confirm('确定清空购物车?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$store.dispatch('empty')
            }).catch(()=>{

            }) 
        }
    },
    components:{
        inputButton
    }

}
</script>
<style lang="scss" scoped>
.car{
    .car-list{
        list-style: none;
        li{
            padding: 10px 20px;
            border: 1px solid #ccc;
            margin-bottom: 10px;
            dl{
                display: flex;
                align-items: center;
                .name{
                    width: 340px;
                }
            }
            .img{
                width: 80px;
                height: 80px;
            }
        }
    }
    .box{
        display: flex;
        text-align: right;
        justify-content: flex-end;
        align-items: center;
        button{
            margin-left: 20px;
            height: 40px;
            box-sizing: border-box;
        }
    }
}
</style>


