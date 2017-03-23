import { notifyRegSuccess, notifyRegFailure } from '../../actions'
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