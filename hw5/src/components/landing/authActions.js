import { dispError, logout, login, notifyRegSuccess } from '../../actions'
import { resource } from '../../serverRequests/serverRequest'

const missingField = (field, value) => value ? "" : `${field} is invalid (you entered "${value}"). `

export const delegateRegistration = (userInfo) => {
    if (userInfo.username && userInfo.password
      && userInfo.firstName && userInfo.lastName){
        return notifyRegSuccess(userInfo)
    } else {
        const usernameFailure = missingField("username", userInfo.username)     
        const passwordFailure = missingField("password", userInfo.password)
        const firstNameFailure = missingField("First Name", userInfo.firstName)     
        const lastNameFailure = missingField("Last Name", userInfo.lastName)
        //ask it why the fields were invalid, and pass on the reason
        const errorMessage = usernameFailure + passwordFailure +
            firstNameFailure + lastNameFailure
        return dispError (errorMessage)
    }
}
export const delegateLogin = (username, password) => {
    //will return a promise for either an update_error_message
    //or for a location change, depending on if successful or not
    return login(username, password) 
}
/**
Not particularly needed atm, but I want this thing to be extensible
for if I want to add code here in the future
*/
export const delegateLogout = () => {
    //Now we return to the landing page
    return logout() 
}