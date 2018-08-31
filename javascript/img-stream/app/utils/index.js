// 图片文件转blob
export const fileToBlob = file => {
  return new Promise(resolve => {
    let blob = URL.createObjectURL(file)
    resolve(blob)
  })
}

// 图片文件转base
export const fileToBase = file => {
  return new Promise(resolve => {
    let render = new FileReader()

    render.onload = () => {
      resolve(render.result)
    }

    render.readAsDataURL(file)
  })
}

// dataURLtoBlob
export function dataURLtoBlob(dataurl) {
  let arr = dataurl.split(",");
  let mime = arr[0].match(/:(.*?);/)[1];
  let bstr = atob(arr[1]);
  let n = bstr.length;
  let u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  return new Blob([u8arr], { type: mime });
}
