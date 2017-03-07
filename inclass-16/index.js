
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
        author: "Bob",
        test: "My first article!"
    },
    {
        id: 3,
        author: "Bill",
        test: "My first article!"
    }
]

//.concat with no-args will (shallow I believe) copy 
let articles = initArticles.concat()

const getArticles = (req, res) => {
    console.log(articles)
    res.send({articles})
}
const addArticle = ((req, res) => {
     console.log('Payload received', req.body)    
     //unlike react-redux we don't have an object spread :'(
     /*
     const next_article = {
            ...req.body, 
     };
     */
     const id = articles[articles.length - 1].id + 1 
     const next_article = Object.assign({ id }, req)

     console.log(next_article)
     articles = articles.concat(next_article)
     res.send(id)
})



const app = express()
app.use(bodyParser.json())
app.get('/articles', getArticles)
app.post('/article', addArticle)
app.get('/', hello)

// Get the port from the environment, i.e., Heroku sets it
const port = process.env.PORT || 3000
const server = app.listen(port, () => {
     const addr = server.address()
     console.log(`Server listening at http://${addr.address}:${addr.port}`)
})
