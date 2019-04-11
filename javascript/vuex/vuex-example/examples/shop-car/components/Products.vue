<template lang="pug">
    .products
        h4  热卖商品
        el-row(:gutter="20")
            el-col.item(:span="6", v-for="item in all")
                img(:src="item.src")
                .price ¥{{ item.price }}
                .name {{ item.name }}
                .box
                    el-button.button(@click="pushcar(item)", :disabled="!item.store") 加入购物车
                    .store 剩余 {{ item.store }} 件
</template>
<script>

import { mapActions, mapGetters, mapState }  from 'vuex'

export default {
    computed:{
        ...mapState({
            all: state => state.products.all
        })
    },
    created(){
        const loading = this.$loading({
            lock: true,
            text: 'Loading',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
        });
        this.$store.dispatch('getAllData').then(()=>{
            loading.close()
        })
        
    },
    methods:{
        ...mapActions(['pushcar'])
    }

}
</script>
<style lang="scss" scoped>
.item{
    padding: 20px 10px;
    box-sizing: border-box;
    border: 1px solid rgba(0,0,0,0);
    cursor: pointer;
    &:hover{
        border: 1px solid #e9e9e9;
        box-shadow: 1px 1px 5px rgba(0,0,0,.1);
    }

    .price{
        margin-right: 10px;
        color: #e4393c;
        font-size: 20px;
        margin: 10px 0;
    }
    .name{
        line-height: 20px;
        height: 40px;
        overflow: hidden;
        margin: 10px 0;
        &:hover{
            color: #e4393c;
        }
    }
    .box{
        display: flex;
        .store{
            margin-left: 10px;
            line-height: 40px;
            color: lightcoral;
        }
    }
}

</style>


