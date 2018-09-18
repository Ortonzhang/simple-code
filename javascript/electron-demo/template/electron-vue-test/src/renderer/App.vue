<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'my-project',
  };
</script>

<style>
  *{
  padding: 0;
  margin: 0;
}
body,html{
  width: 100%;
  height: 100%;
}

::selection { background: white; /* WebKit/Blink Browsers */ } 

@font-face {font-family: "iconfont";
  src: url('./font/iconfont.eot?t=1535014958351'); /* IE9*/
  src: url('./font/iconfont.eot?t=1535014958351#iefix') format('embedded-opentype'), /* IE6-IE8 */
  url('./font/iconfont.ttf?t=1535014958351') format('truetype'), /* chrome, firefox, opera, Safari, Android, iOS 4.2+*/
  url('./font/iconfont.svg?t=1535014958351#iconfont') format('svg'); /* iOS 4.1- */
}
.iconfont {
  font-family:"iconfont" !important;
  font-size:16px;
  font-style:normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

#app{
  height: 100%;
  background: url('./images/bg.jpg') no-repeat;
  background-size: cover;
  display: flex;
}
button{
  color: #fff;
  cursor: pointer;
  margin: 0;
  border: 0;
  display: inline-flex;
  padding: 0;
  outline: none;
  position: relative;
  user-select: none;
  align-items: center;
  border-radius: 0;
  vertical-align: middle;
  justify-content: center;
  -moz-appearance: none;
  text-decoration: none;
  background-color: transparent;
  -webkit-appearance: none;
  -webkit-tap-highlight-color: transparent;
  padding: 8px 16px;
  font-size: 0.875rem;
  min-width: 64px;
  transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  min-height: 36px;
  box-sizing: border-box;
  line-height: 1.4em;
  font-family: "Roboto", "Helvetica", "Arial", sans-serif;
  font-weight: 500;
  border-radius: 4px;
  text-transform: uppercase;
}
button a{
  text-decoration: none;
  color: #fff;
}
button:hover{
  text-decoration: none;
}
button.blue{
  background-color: #3f51b5;
}
button.blue:hover{
  background-color: #303f9f;
}
button.red{
  background-color: #f50057;
}
button.red:hover{
  background-color: #c51162;
}

</style>
