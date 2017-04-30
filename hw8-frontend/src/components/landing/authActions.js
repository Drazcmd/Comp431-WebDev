import { dispError, logout, login, notifyRegSuccess } from '../../actions'

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
