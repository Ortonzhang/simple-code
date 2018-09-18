<template>
  <div class="preview-box">
    <div class="preview-body">
      <img :src="preview" alt="" />
      <p class="message" v-if="this.message"> {{ this.message }} </p>
    </div>
    <div class="preview-footer">
      <button @click="back" class="red">重新选择</button>
      <button @click="speech" class="blue">语音播报</button>
    </div>
    <audio :src="this.mp3" autoPlay></audio>
  </div>
</template>

<script>
  import { imgOCR, getRadio } from '../util';
  export default {
    name: 'preview',
    data() {
      return {
        message: '',
        mp3: '',
        file: '',
        preview: '',
      };
    },
    methods: {
      back() {
        this.$router.push('/')
      },
      speech() {
        (async () => {
          if (this.message) {
            const mp3 = await getRadio(this.message)
            this.mp3 = mp3
          }
        })()
      },
    },
    mounted() {
      if (this.$route.query.file) {
        this.preview = this.$route.query.preview
        imgOCR(this.$route.query.file).then((message) => {
          this.message = message
          this.$electron.clipboard.writeText(message)
          const notifition = new Notification('成功', {
            body: '文本已经复制,赶紧去粘贴吧',
          })
          notifition.onclick = () => {}
        })
      }
    },
  };
</script>

<style>
.preview-box{
  width: 800px;
  height: 500px;
  margin: auto;
  border-radius: 10px;
  background: #fff;
}

.preview-body{
  height: 440px;
  border-radius: 10px;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  position: relative;
  display: flex;
  background: url('../images/pre-bg.png') 0 0 repeat;
}
.preview-body img {
  max-width: 500px;
  margin: auto;
  max-height: 86%;
}
.message{
  background: rgba(0,0,0,.4);
  padding: 5px;
  position: absolute;
  width: 100%;
  bottom: 0;
  box-sizing: border-box;
  color: lightyellow;
}
.preview-footer{
  display: flex;
  height: 60px;
  justify-content: center;
  align-items: center;
}
.preview-footer > button {
  margin-left: 10px;
}
</style>
