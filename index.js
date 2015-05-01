let http = require('http')
let _ = require('lodash')
let fs = require('fs')

require('songbird')

http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'text/plain'})
    res.end('Hello World\n')
}).listen(8000, '127.0.0.1')
console.log('Server running at http://127.0.0.1:8000/')
