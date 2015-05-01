let http = require('http')
let fs = require('fs')
let arr = []

require('songbird')


async function read(folder){
    let stat = await fs.promise.stat(folder)

    if (!stat.isDirectory()) {
        // console.log(">< folder", folder)
        arr.push(folder)
        return
    }
    let process = []
    let files = await fs.promise.readdir(folder)
        // console.log("><files", files)

    for (let item of files) {
        process.push(read(folder + '/' + item))
    }
    let results = await Promise.all(process)
    // return results automatci returned
}


http.createServer((req, res) => {
    arr = []
    res.setHeader('Content-Type', 'application/json')
    res.writeHead(200, {
        'Content-Type': 'text/plain'
    })
    let folder = process.cwd() + req.url
    console.log(">< folder", folder)
    async() => {
        await read(folder)
        res.end(JSON.stringify(arr))
    }()
    //another way to call
    // read(folder).then(() => {
    //    res.end(JSON.stringify(arr))
    // })
}).listen(8000, '127.0.0.1')
console.log('Server running at http://127.0.0.1:8000/')








