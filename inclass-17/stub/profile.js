
const index = (req, res) => {
     res.send({ hello: 'world' })
}

//Default user for if not specified
const user = 'me'

const profile = {
     headline: 'This is my headline!',
     email: 'cmd11@blah.com',
     zipcode: 12345,
     avatar: 'https://upload.wikimedia.org/wikipedia/en/thumb/4/4e/DWLeebron.jpg/220px-DWLeebron.jpg',
}

const headlines = (req, res) => {  
     if (!req.user) req.user = user
     res.send({ headlines: [ 
          { username: req.user, headline: profile.headline } 
     ]}) 
}

const putHeadline = (req, res) => {
     if (!req.user) req.user = user
     if (!req.body.headline) req.headline = profile.headline
     res.send({username: req.user, headline: req.body.headline})
}

const email = (req, res) => {
     if (!req.email) req.email = profile.email
     if (!req.user) req.user = user
     res.send({username: req.user, email: req.email})
}
const putEmail = (req, res) => {
     if (!req.user) req.user = user
     res.send({username: req.user, email: req.body.email}) 
}

const zipcode = (req, res) => {
     if (!req.user) req.user = user
     res.send({username: user, email: profile.email})
}
const putZipcode = (req, res) => {
     if (!req.user) req.user = user
     res.send({username: req.user, zipcode: req.body.zipcode}) 
}
const avatars  = (req, res) => {
     if (!req.email) req.email = profile.email
     if (!req.user) req.user = user
     res.send({avatars: [
          { username: user, avatar: profile.avatar}
     ]})
     res.send({username: req.user, email: req.email})
}
const putAvatar = (req, res) => {
     if (!req.user) req.user = user
     res.send({username: req.user, avatar: req.body.avatar}) 
}


module.exports = app => {
     app.get('/', index)
     app.get('/headlines/:user?', headlines)
     app.put('/headline', putHeadline)

     app.get('/email/:user?', email)
     app.put('/email', putEmail)

     app.get('/zipcode/:user?', zipcode)
     app.put('/zipcode', putZipcode)

     app.get('/avatars/:user?', avatars)
     app.put('/avatar', putAvatar)
}
