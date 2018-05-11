const http = require('http')
const fs = require('fs')

http.createServer(function(request, response){
    response.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
    if(request.url == '/data'){
        response.write(fs.readFileSync('data.json').toString())
    } else {
        response.write('填写接口路径错误')
    }
    response.end()
}).listen(3000)