const http = require('http')

const host = '127.0.0.1'
const port = 3333 || process.env.PORT

http.createServer(preprocess).listen(port, host)
console.log(`Server running at http://${host}:${port}`)

function preprocess(req, res) {
     let body = ''
     req.on('data', function(chunk) {
          body += chunk
     })
     req.on('end', function() {
          req.body = body
          server(req, res)
     })
}
const articleHolder = {articles: [{
        id:1, author: 'Clayton Drazner',
        body:'Here is your first article :D'
    }, {
        id:2, author: 'Clayton Drazner',
        body:'I am SUCH a magnificient author'
    }, {
        id:3, author: 'Clayton Drazner',
        body:'Just try and handle my lovely literary alliterations'

    }]
}

function server(req, res) {
    console.log('Request method        :', req.method)
    console.log('Request URL           :', req.url)
    console.log('Request content-type  :', req.headers['content-type'])
    console.log('Request payload       :', req.body)
    let payload = {}
    switch (req.method) {
        case "GET": { 
            if (req.url == "/") {
                console.log("got get empty right!")
                payload = { 'hello': 'world' }
            } else if (req.url == "/articles") {
                payload = articleHolder
            } else {
                console.log("wrong get!")
                res.setHeader('Content-Type', 'application/json')
                res.statusCode = 402
                res.end(JSON.stringify(payload))
                break;
            }
            res.setHeader('Content-Type', 'application/json')
            res.statusCode = 200
            res.end(JSON.stringify(payload))
            break;
        }
        case "POST": {
            if (req.body && req.url == "/login"){
                const params = req.body.split("&")
                const username = params[0].split("=")
                const password = params[1].split("=")
                if (username[0]=="username" && username[1]) {
                    payload = (password[0] == "password" && password[1]) ? {
                        'username': username[1],
                        'result' : 'success'
                    } : {
                        'username': username[1],
                        'result' : 'failure'
                    }
                }
                res.setHeader('Content-Type', 'application/json')
                res.statusCode = 200
                res.end(JSON.stringify(payload))
                break;
            } 
            console.log("invalid post!")
            res.statusCode = 402
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify(payload))
            break;
        }
        case "PUT": {
            if (req.url == "/logout") {
                console.log("got put right!")
                payload = "OK"
                res.setHeader('Content-Type', 'application/json')
                res.statusCode = 200
                res.end(JSON.stringify(payload))
                break
            } else {
                console.log("put failed")
                payload = "LOGOUT FAILED"
                res.setHeader('Content-Type', 'application/json')
                res.statusCode = 402;
                res.end(JSON.stringify(payload))
                break;
            }
        }
        default: {
            payload = "TODO - error somewhere????"
            res.setHeader('Content-Type', 'application/json')
            res.statusCode = 404
            res.end(JSON.stringify(payload))
            break;
        }
    }
}

