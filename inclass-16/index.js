
const express = require('express')
const bodyParser = require('body-parser')

const addArticle = (req, res) => {
     console.log('Payload received', req.body)    
     res.send(req.body)
}

const hello = (req, res) => res.send({ hello: 'world' })

const staticArticles = [
    {
        id: 1,
        author: "Clayton",
        test: "My first article!"
    },
    {
        id: 2,
        author: "Clayton",
        test: "My first article!"
    },
    {
        id: 3,
        author: "Clayton",
        test: "My first article!"
    }
]
const articles = (req, res) => res.send({articles: staticArticles})

const app = express()
app.use(bodyParser.json())
app.get('/articles', articles)
app.post('/article', addArticle)
app.get('/', hello)

// Get the port from the environment, i.e., Heroku sets it
const port = process.env.PORT || 3000
const server = app.listen(port, () => {
     const addr = server.address()
     console.log(`Server listening at http://${addr.address}:${addr.port}`)
})
