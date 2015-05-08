/**
 * Node recursively ls all files at leaf node
 * @type {[type]}
 */
let http = require('http')
let fs = require('fs')
let path = require('path')
let args = require('yargs').argv
const PORT = process.env.PORT || 8000
let ROOT_DIR = args.dir ? path.resolve(args.dir) : path.resolve(process.cwd())
require('songbird')

//TODO better error handling
//TODO add bonus

async function read(folder, resultArr){
    let stat = await fs.promise.stat(folder)
    if (!stat.isDirectory()) {
        //if not a dir, print
        resultArr.push(folder)
        return
    }
    let process = []
    let files = await fs.promise.readdir(folder)
    for (let item of files) {
        process.push(read(folder + '/' + item, resultArr))
        console.log(process[0], "><2 ", folder, item)
    }
    await Promise.all(process)
    // return results automatci returned
}

// async function read2 (folder, resultArr){
//     let files = await fs.promise.readdir(folder)
//     let processDir = []
//     console.log("><0", folder)
//     for (let file of files){
//         var fileFullPath = folder + "/" + file
//         let stat = await fs.promise.stat(fileFullPath)
//         console.log("><02", file, isDir)
//         let isDir = stat.isDirectory()
//         console.log("><01", file, isDir)
//         if (!isDir){
//             console.log("><1 ", folder, file)
//             resultArr.push(fileFullPath)
//         }else{
//             console.log("><2 ", folder, file)
//             processDir.push(fileFullPath)
//         }
//     }
//     let process2 = []
//     for (let dir of processDir) {
//             process2.push(read2(dir, resultArr))
//     }
//     console.log("><4", process2.length)
//     if (process2.length > 0) {
//        await Promise.all(process2)
//     }
// }
// async function read3(folder, resultArr) {
//     let files = await fs.promise.readdir(folder)
//     let process2 = []
//     console.log("><0", folder)
//     for (let file of files){
//         var fileFullPath = folder + "/" + file
//         let stat = fs.statSync(fileFullPath)
//         let isDir = stat.isDirectory()
//         if (!isDir){
//             console.log("><1 ", folder, file)
//             resultArr.push(fileFullPath)
//         }else{
//             console.log("><2 ", folder, file)
//             process2.push(read3(fileFullPath, resultArr))
//         }
//     }
//     console.log("><4", process2.length)
//     if (process2.length > 0) {
//        await Promise.all(process2)
//     }
// }

async function recursiveLS(parentDir){
    let resultArr = []
    try {
       await read(parentDir, resultArr)
       return resultArr
    }catch(error){
       console.log(">< error", error)
       return error
    }
}

http.createServer((req, res) => {
    // arr = []
    res.setHeader('Content-Type', 'application/json')

    let parentDir = path.resolve(ROOT_DIR + req.url)
    async() => {
        //? Does not seem like it's really working
        try {
           let arr = await recursiveLS(parentDir)
           res.writeHead(200, {
                'Content-Type': 'text/plain'
           })
           res.end(JSON.stringify(arr))
        }catch(error){
          res.writeHead(500)
          res.end(error)
        }

    }()
    //another way to call
    // read(folder).then(() => {
    //    res.end(JSON.stringify(arr))
    // })
}).listen(PORT, '127.0.0.1')
console.log('Server running at http://127.0.0.1:', PORT)








