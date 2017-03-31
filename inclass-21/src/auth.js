exports.setup = function(app){
    app.post('login', login)
    app.post('register', register)
    app.put('logout', isLoggedIn, logout)
}
//Maps username to hash
const authMap = { }
const md5 = require('md5')

//todo - convert to looking up salt from the username, then combine with password to create the hashk
function login(req, res) {
	const username = req.body.username;
	const password = req.body.password;
	if (!username || !password)	{
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
	console.log('sup')
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
}
function logout(req, res) {

}
function isLoggedIn(){

}
