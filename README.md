# node-recursive-ls

API for recursively listing the files in a directory in parallel. 


⋅⋅* List subdirectory contents recursively instead of excluding them
⋅⋅* Parallelize the directory traversal by using  Promise.all(promiseArray):

```javascript
// Example of how to parallelize with Promise.all
async function(items) {
    let promises = []
    for (let item of items) {
        promises.push(asyncFn(item))
    }
    // Wait in parallel for the above async operations
    let results = await Promise.all(promises)
}
```
⋅⋅* Given a list of subdirectories, fs.stat calls for each of the subdirectories should run in paralle
⋅⋅* Given a list of subdirectories, fs.readdir should wait only for its one corresponding fs.stat:
⋅⋅*Recursive ls calls for subdirectories should run in parallel
⋅⋅* Returns a single flat JSON-encoded recursive array of all files in a directory
