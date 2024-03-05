const http = require('http')
/**
 * Run time environment for JavaScript
 * Server side language
 * yarn, npm - Node Package Manager
 */
/**
 * node <filename>.<extension>
 * npx nodemon <filename>.<extension>
 * 
 * npm install <package_name> / npm i <package_name>
 * npm uninstall <package_name>
 * npm install <package_name> --save-dev
 * npm init
 * npm init -y
 */

console.log('hello')

http.createServer(function(request, response) {
    console.log(request)
    console.log(response)
    response.writeHead(200, {'Content-Type' : 'text/html'})
    // response.writeHead(200, {'Content-Type' : 'text/plain'})
    response.write('hello')
    response.end()
}).listen(4000)