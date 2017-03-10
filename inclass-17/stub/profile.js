
const index = (req, res) => {
     res.send({ hello: 'world' })
}

const profile = {
     headline: 'This is my headline!',
     email: 'foo@bar.com',
     zipcode: 12345,
     avatar: 'https://upload.wikimedia.org/wikipedia/en/thumb/4/4e/DWLeebron.jpg/220px-DWLeebron.jpg',
     user = "Claytonic"
}

const headlines = (req, res) => {  
     if (!req.user) req.user = profile.user
     res.send({ headlines: [ 
          { headline: profile.headline } 
     ]}) 
}

const putHeadline = (req, res) => {
     if (!req.headline) req.headline = profile.headline
     if (!req.user) req.user = profile.user
     res.send({username: req.user, headline: req.headline})
}

module.exports = app => {
     app.get('/', index)
     app.get('/headlines/:user?', headlines)
     app.put('/headline', putHeadline)
     app.get('/', index)
     app.get('/email/:user?', index)
     app.get('/', index)
     app.get('/zipcode/:user?', index)
     app.get('/', index)
     app.get('/avatars/:user?', index)
     app.get('/', index)
}
