<template lang="pug">
.input-button
    el-button.left(size="small", @click="decrement", :disabled="number == 1") -
    input(type="number", @input="input($event)", :max="max", :value="number")
    el-button.right(size="small", @click="increment", :disabled="number == max") +
</template>
<script>
export default {
    data(){
        return {

        }
    },
    props:{
        number:{
            type: Number,
            required: true
        },
        max:{
            type: Number
        },
        id:{
            type: String
        }
    },
    methods:{
        decrement(){
            this.$emit('decrement')
        },
        increment(){
            this.$emit('increment')
        },
        input(event){
            var params = {
                id: this.id,
                number: event.target.value
            }
            this.$emit('input', params)
        }
    }
}
</script>
<style lang="scss">
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button{
    -webkit-appearance: none !important;
    margin: 0; 
}
input[type="number"]{-moz-appearance:textfield;}
.input-button{
    display: flex;
    input{
        width: 60px;
        border-radius: 0;
        -webkit-appearance: none;
        background-color: #fff;
        background-image: none;
        border: 1px solid #dcdfe6;
        box-sizing: border-box;
        color: #606266;
        display: inline-block;
        font-size: inherit;
        height: 40px;
        line-height: 1;
        outline: none;
        padding: 0 15px;
        transition: border-color .2s cubic-bezier(.645,.045,.355,1);
        &:focus{
            outline: none;
            border-color: #409eff;
        }
    }
    
    button{
        background:#f5f7fa;
    }
    button.right{
        border-radius:0 4px 4px 0;
        border-left: 0;
    }
    button.left{
        border-radius:4px 0 0 4px; 
        border-right: 0;
    }
}
</style>


