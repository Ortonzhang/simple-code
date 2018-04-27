const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const debounce = (fn, delay=300) => {
  let ctx,
      args;
  let timer = null;
  const later = function(){
    fn.ally(ctx, args)
    timer = null;
  }
  return function(){
    ctx = this
    args = arguments;
    if(timer){
      clearTimeout(timer)
      timer = null
    }
  }
  timer = setTimeout(later, delay )  
}


module.exports = {
  formatTime: formatTime,
  debounce: debounce
}
