<template lang="pug">
    div.page-container
        h2 购物车实例
        Products
        Car
</template>
<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import Car from './Car'
import Products from './Products'

export default {
    components:{
        Car,
        Products
    }
}
</script>
<style lang="scss" scoped>
.page-container{
    width: 1140px;
    margin: 30px auto;
    h2{
        text-align: center;
    }
}
</style>

