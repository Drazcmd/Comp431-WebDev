
const index = (req, res) => {
     res.send({ hello: 'world' })
}

module.exports = app => {
     app.get('/', index)
     app.get('/headlines/:user?', index)
     app.get('/', index)
     app.get('/email/:user?', index)
     app.get('/', index)
     app.get('/zipcode/:user?', index)
     app.get('/', index)
     app.get('/avatars/:user?', index)
     app.get('/', index)
}
