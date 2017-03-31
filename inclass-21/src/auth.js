const md5 = require('md5')
const cookieParser = require('cookie-parser')
exports.setup = function(app){
    app.post('/login', login)
    app.post('/register', register)
    app.put('/logout', isLoggedIn, logout)
    app.use(cookieParser())
}
//Maps username to hash
const authMap = { }

function login(req, res) {
	const username = req.body.username;
	const password = req.body.password;
	if (!username || !password)	{
		console.log('nope')
		res.sendStatus(400)
		return
	}
	const userObj = authMap.get(username)
	if (!userObj){
		res.sendStatus(401)
		return
	}

	const saltedInput = password + userObj.salt
	const hashedInput = md5(saltedInput)
	if (hashedInput === userObj.password){
		res.cookie(
			cookieKey, generateCode(userObj),
			{maxAge: 3600*1000, httpOnly: true}
		)
	}

	const msg = {username: username, result: 'success'}
	res.send(msg)
}
function register(req, res) {
	console.log('body:', req.body)
	console.log('uname', req.username)
	console.log('pword', req.password)
	const username = req.body.username;
	const password = req.body.password;
	if (!username || !password)	{
		res.sendStatus(400)
		return
	}
	const salt = Date.now()
	const saltedPass = password + salt
	console.log(saltedPass)
	const hash = md5(saltedPass)
	authMap[username] = {salt, hash}
	console.log(authMap)
	const msg = {username: username, result: 'success'}
	res.send(msg)
}
function logout(req, res) {

}
function isLoggedIn(){

}
