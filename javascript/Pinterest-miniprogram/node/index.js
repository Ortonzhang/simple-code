const sizeOf = require('image-size')
const request = require('request')
const fs = require('fs')
const ImgData = []
const URL = 'http://cued.xunlei.com/demos/publ/img/P_'

const createImageName = () => {
    let arr = Array.from(Array(100).keys()).map(item => {
        if(item < 10){
            return '00' + item
        } else {
            return '0' + item
        }
    })
    return arr
}


const getImgData = (name) => {
    let options = {
        url: URL + name + '.jpg',
        encoding: null,
        timeout: 1000,
        Headers:{
            'User-Agent': 'Mozilla/5.0 (Windows NT 5.2) AppleWebKit/537.36 (KHTML, like Gecko)',
        }
    }

    return new Promise((resolve, reject) => {
        request.get(options, function(error, body, buffer){
            if(error){
                console.log('出错了', 'name' + name)
                reject(error) 
            } else {
                let imgInfo = sizeOf(buffer)
                resolve({"height":imgInfo.height, "width": imgInfo.width, url: options.url, "index": name, "show": false})
            }
            
        })
    })
    
}

const Data = async () => {
    let List = createImageName()
    let array = await Promise.all(List.map(item => getImgData(item)))
    fs.writeFile('data.json', JSON.stringify(array), function(err){
        if(err){
            console.log(err)
        }
        console.log('文件创建成功')
    })
}
Data()
