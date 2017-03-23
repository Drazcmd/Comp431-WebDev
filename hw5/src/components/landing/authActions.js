import { notifyRegSuccess, notifyRegFailure, logout } from '../../actions'
import { resource } from '../../serverRequest'
const checkRegValidity = (userInfo) => {
	return false
}
const explainRegFailures = (userInfo) => {
	return "because it's not implemented yet!"
}
export const delegateRegistration = (userInfo) => {if (checkRegValidity(userInfo)){
		return notifyRegSuccess(userInfo)
	} else {
		//ask it why the fields were invalid, and pass on the reason
		const failureReasons = explainRegFailures(userInfo)
		return notifyRegFailure (
			userInfo,
			`Reasons for failure: ${failureReasons}`
		)
	}
}
export const delegateLogin = (username, password) => {
	//TODO send the login to the server
	//will need to take care of a bunch of stuffs
	return "not implemented yet"
}
export const delegateLogout = () => {
	//TODO send the logout to the server	
	//Now we return to the landing page
	return logout()	
}