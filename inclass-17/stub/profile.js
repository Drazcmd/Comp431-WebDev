
const index = (req, res) => {
     res.send({ hello: 'world' })
}

const profile = {
     headline: 'This is my headline!',
     email: 'foo@bar.com',
     zipcode: 12345,
     user = 'Claytonic',
     avatar: 'https://upload.wikimedia.org/wikipedia/en/thumb/4/4e/DWLeebron.jpg/220px-DWLeebron.jpg',
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

const email = (req, res) => {
     if (!req.email) req.email = profile.email
     if (!req.user) req.user = profile.user
     res.send({username: req.user, email: req.email})
}
const putEmail = (req, res) => {
     if (!req.email) req.email = profile.email
     res.send({email: req.email}) 
}

const zipcode = (req, res) => {
     if (!req.user) req.user = profile.user
     res.send({username: profile.user, email: profile.email})
}
const putZipcode = (req, res) => {
     if (!req.zipcode) req.zipcode = profile.zipcode
     res.send({username: profile.user, zipcode: req.zipcode}) 
}
const avatars  = (req, res) => {
     if (!req.email) req.email = profile.email
     if (!req.user) req.user = profile.user
     res.send({avatars: [
          username: req.user, avatar: profile.avatar
     ]})
     res.send({username: req.user, email: req.email})
}
const putAvatar = (req, res) => {
     if (!req.user) req.user = profile.user
     if (!req.avatar) req.avatar = profile.avatar
     res.send({username: req.user, avatar: req.avatar}) 
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
