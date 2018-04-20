const koa = require('koa')

const WXBizDataCrypt = require('./WXBizDataCrypt')

const appId =  'wx98591ca7659eb4f9'

const request = require('request')

const koaBody = require('koa-body')()

const koaRouter = require('koa-router');

const crypto = require('crypto')

const router = koaRouter()

const logo = async function (ctx, next){
    if(!ctx.request.header.skey && ctx.url!='/use'){
        ctx.response.status = 402
        ctx.body = '缺少字段'
        return
    } 
    await next()
}

const USERINFO = []

const app = new koa()

app.use(logo)

app.use(koaBody)

app.use(router['routes']());

function createTryptoSha(data){
    return crypto.createHash('sha1').update(data, 'utf8').digest('hex')
}

function cryptoData(sessionKey, data, iv){
    return new Promise((resolve, reject) => {
        var pc = new WXBizDataCrypt(appId, sessionKey)
        var a = pc.decryptData(data , iv)
        resolve(a)
    })
}

function getUserInfo(code){
    return new Promise((resolve, reject) => {
        let options = {
            url: 'https://api.weixin.qq.com/sns/jscode2session',
            qs:{
                appid: 'wx98591ca7659eb4f9',
                secret: '6a056a220ba46902dc889e3719b264ed',
                js_code:code,
                grant_type:'authorization_code'
            }
        }

        

        request(options, (err, response, body) => {
            if(err) reject(err) 
            body = JSON.parse(body)
            let skey = createTryptoSha(body.session_key)
            let data = {
                key: skey
            }
            if(USERINFO.length){
                USERINFO.forEach((item) => {
                    if(item.openid ==  body.openid){
                        item.session_key = body.session_key
                        item.skey = skey
                    }
                })
            } else {
                USERINFO.push({
                    session_key: body.session_key,
                    openid: body.openid,
                    skey: skey
                })
            }

            console.log(skey)
            
            resolve(data)
        })
    })
}

router.get('/', async (ctx, next)=>{
    ctx.body = '服务已经启动，请在微信开发工具调用接口'
    next()
})

router.get('/test', async(ctx, next) => {
    ctx.body = 'test'
    next()
})

router.post('/use', async (ctx, next)=>{
    ctx.body = await getUserInfo(ctx.request.body.code)
    next()
})

router.post('/crypto', async(ctx, next) => {
    let item = USERINFO.find((item => item.skey == ctx.request.header.skey))
    if(item){
    	let skey = item['session_key']
        ctx.body = await cryptoData(skey, ctx.request.body.data, ctx.request.body.iv)
    } else {
        ctx.body = '缺少字段'
    }
    
    next()
})


app.listen(3000, () => {
    console.log('open http://localhost:3000')
})