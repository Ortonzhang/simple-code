<template>
  <div class="upload box">
    <div @drop="drop($event)" @dragover.prevent="preventDefault($event)" @click="click">
      <i class="iconfont">&#xe71a;</i>
      <p>拖拽文件或者点击上传</p>
    </div>
  </div>
</template>
<script>
export default {
  name: 'upload',
  data() {
    return {
      src: '',
    }
  },
  methods: {
    drop(event) {
      event.preventDefault()
      const file = event.dataTransfer.files[0]
      this.$router.push({ path: 'preview', query: { file, preview: URL.createObjectURL(file) } })
    },
    preventDefault(event) {
      event.preventDefault()
    },
    click() {
      if (!this.src) {
        const input = document.createElement('input')
        input.setAttribute('type', 'file')
        input.setAttribute('accept', 'image/*')
        input.onchange = (event) => {
          const file = event.target.files[0]
          this.$router.push({ path: 'preview', query: { file, preview: URL.createObjectURL(file) } })
        }
        input.click()
      }
    },
  },
}
</script>
<style>
.box{
  width: 800px;
  height: 500px;
  border-radius: 10px;
  margin: auto;
  transition: all .3s;
  cursor: pointer;
  text-align: center;
  padding-top: 53px;
  background: rgba(255,255,255,.4);
  box-sizing: border-box;
}
.upload i{
  font-size: 222px;
  color: #d6d6d6;
}
.upload p{
  font-size: 20px;
  color: azure;
  font-style: normal;
}
.upload:hover{
  transform: translateY(-10px)
}
</style>


