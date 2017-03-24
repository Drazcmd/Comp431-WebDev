import { dispError, logout, login } from '../../actions'
import { resource } from '../../serverRequest'

const missingField = (field) => field ? "" : `${field} is invalid. `

export const delegateRegistration = (userInfo) => {

	if (userInfo.username && userInfo.password
	  && userInfo.firstName && userInfo.lastName){

		return notifyRegSuccess(userInfo)
	} else {
		const usernameFailure = missingField(userInfo.username)		
		const passwordFailure = missingField(userInfo.password)
		const firstNameFailure = missingField(userInfo.firstName)		
		const lastNameFailure = missingField(userInfo.lastName)
		//ask it why the fields were invalid, and pass on the reason
	    const errorMessage = usernameFailure + passwordFailure +
	    	firstNameFailure + lastNameFailure
		return dispError (errorMessage)
	}
}
export const delegateLogin = (username, password) => {
	//TODO send the login to the server
	//will need to take care of a bunch of stuffs
	//either will return an actions.login or an actions.errorMessage thingy
	//will bear responsiblitiy for changing location if
	//it succeeded - otherwise it'll alter the error message
	if (username && password) {
		return login({"data":"data"}) 
	} else {
		const usernameFailure = missingField(username)		
		const passwordFailure = missingField(password)
		const errorMessage = usernameFailure + passwordFailure
		return dispError(errorMessage)
	}
}
export const delegateLogout = () => {
	//TODO send the logout to the server	
	//Now we return to the landing page
	return logout()	
}