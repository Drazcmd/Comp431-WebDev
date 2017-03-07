
const express = require('express')
const bodyParser = require('body-parser')

const hello = (req, res) => res.send({ hello: 'world' })

const initArticles = [
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

//.concat with no-args will (shallow I believe) copy 
let articles = initArticles.concat()
const getArticles = (req, res) => res.send({articles: articles})
const addArticle = (req, res) => {
     console.log('Payload received', req.body)    
     const next_article = ((input_article) => ({
        ...input_article,
        id = initArticles[initArticles.length - 1].id + 1
     }))
     console.log(next_article(req.body))
     res.send(next_article(req.body))
}



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
