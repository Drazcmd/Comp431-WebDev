const express = require('express')
const bodyParser = require('body-parser')
const auth = require('./auth')
const articles = [
     { id:1, author:'Scott', text:'This is my first article'},
     { id:2, author: 'Max', text:"This is Max's article"},
     { id:3, author: 'Leo', text:"This is Leo's article"}
]

const addArticle = (req, res) => {
     console.log('Payload received', req.body)
     const newArticle = {
          id: articles.length+1,
          author:req.connection.remoteAddress,
          text:req.body.text
     }
     articles.push(newArticle)
     res.send(newArticle)
}

const getArticles = (req, res) => res.send({ 
    articles: articles.filter(({id}) => !req.params.id || id == req.params.id) 
})

const hello = (req, res) => res.send({ hello: 'world' })

const app = express()
app.use(bodyParser.json())
// Get the port from the environment, i.e., Heroku sets it
const port = process.env.PORT || 3000
//gives us register, login, and logout
auth.setup(app)
app.get('/articles/:id?', getArticles)
app.post('/article', addArticle)
app.get('/', hello)

const server = app.listen(port, () => {
     const addr = server.address()
     console.log(`Server listening at http://${addr.address}:${addr.port}`)
})

