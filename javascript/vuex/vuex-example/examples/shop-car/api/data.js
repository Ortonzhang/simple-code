const mokaData = [
    { id: '1169699991', src: '//img10.360buyimg.com/n7/jfs/t8161/224/1169699991/177635/eb2192c2/59b64641N088dd6ad.jpg', name: '【新年货】小米Note3 美颜双摄拍照手机6GB+64GB 黑色 全网通4G手机双卡双待', price:'1899.00', store: 4, max: 4 },
    { id: '1344769770', src: '//img13.360buyimg.com/n7/jfs/t10675/253/1344769770/66891/92d54ca4/59df2e7fN86c99a27.jpg', name: 'Apple iPhone X (A1865) 64GB 深空灰色 移动联通电信4G 手机 2月9日24期免息券，限量抢！点此抢券！', price:'8388.00', store: 5, max: 5},
    { id: '4063977629', src: '//img14.360buyimg.com/n7/jfs/t7669/223/4063977629/438378/9a05bac4/5a015076Ncaa64089.jpg', name: '【新年货】华为 HUAWEI Mate 10 Pro 全网通 6GB+128GB 银钻灰 移动联通电信4G', price:'5399.00', store: 6, max: 6},
    { id: '1250191369', src: '//img14.360buyimg.com/n7/jfs/t13441/73/1250191369/239632/8b94bbc6/5a1d1e2dN6ba9aac4.jpg', name: '【新年货】荣耀 V10 高配版 6GB+64GB 幻夜黑 移动联通电信4G全面屏游戏', price:'2999.00', store: 8, max: 8}
]

export default {
    getData(){ // 模拟api请求
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                return resolve(mokaData)
            }, 1000)
        })
    }
}