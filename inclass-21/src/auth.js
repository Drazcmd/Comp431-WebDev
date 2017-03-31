const md5 = require('md5')
const bodyParser = require('body-parser')
exports.setup = function(app){
    app.post('/login', login)
    app.post('/register', register)
    app.put('/logout', isLoggedIn, logout)
}
//Maps username to hash
const authMap = { }

const login = (req, res) => {
	console.log('Payload received', req.body)

	const username = req.body.username;
	const password = req.body.password;
	if (!username || !password)	{
		console.log('nope')
		res.sendStatus(400)
		return
	}

	const userObj = authMap[username]
	if (!(username in authMap && userObj)){
		res.sendStatus(401)
		return
	}

	const saltedInput = password + userObj.salt
	const hashedInput = md5(saltedInput)
	if (hashedInput === userObj.hash){
		res.cookie(
			cookieKey, generateCode(userObj),
			{maxAge: 3600*1000, httpOnly: true}
		)
		const msg = {username: username, result: 'success'}
		res.send(msg)
	} else {
		const msg = {username: username, result: 'failure'}
		res.send(msg)
	}

}
const register = (req, res) => {
	const username = req.body.username;
	const password = req.body.password;
	if (!username || !password)	{
		console.log("woah")
		res.sendStatus(400)
		return
	}
	const salt = Date.now()
	const saltedPass = password + salt
	console.log(saltedPass)
	const hash = md5(saltedPass)
	authMap[username] = {salt: salt, hash: hash}
	console.log(authMap)
	const msg = {username: username, result: 'success'}
	res.send(msg)
}
const logout = (req, res) => {
	return;
}
const isLoggedIn = () => {
	return;
}
