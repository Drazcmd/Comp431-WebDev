import { dispError, logout, login, register} from '../../actions'
const registrationFields = [
    "email", "zipcode", "username", "password"
]
const fieldRules = {
    "email" : "([a-zA-Z0-9]+)(\x40)([a-z]+)(\x2E)([a-z]+)",
    "zipcode" : "[0-9]{5}",
    "username" : "([a-zA-Z0-9]+)",
    "password" :".*" ,
}
const fieldMessages = {
    "email" : "youremailaddress@something.com (i.e. test@gmail.com)",
    "zipcode" : "five numbers in a row (i.e. 55555)",
    "username" : "a string of numbers or letters or spaces (but not only spaces!)",
    "password" :"anything you want - just remember to make it long enough"
}

const validateField = (field, value) => {
    const pattern = new RegExp(fieldRules[field]) 
    return pattern.test(value)
}
const invalidFieldError = (field, value) => {
    return validateField(field, value) ? `Odd error on checking ${field}?` :
    `You entered an invalid value for the ${field} field. ` +
    `A valid value looks like ${fieldMessages[field]}.`
}
const missingFieldError = (field, value) => {
    return value ? "" : `${field} is required for registration.`
}
const notifyMissingFields = (userInfo, missingFields) => {
    const errorMessages = missingFields.map(field => {
        return missingFieldError(field, userInfo[field])
    })
    return Promise.resolve(dispError(errorMessages.join("\t")))
}
const notifyInvalidFields = (userInfo, invalidFields) => {
    const errorMessages = invalidFields.map(field => {
        return invalidFieldError(field, userInfo[field])
    })
    return Promise.resolve(dispError(errorMessages.join("\t")))
}
export const delegateRegistration = (userInfo) => {
    //To avoid crashes later, I separated out checking fields existances
    const missingFields = registrationFields.filter(field => !(userInfo[field]))
    if (missingFields.length > 0) {
        return notifyMissingFields(userInfo, missingFields) 
    }

    //Now it's a little safer (we can assume they're all there)
    const invalidFields = registrationFields.filter(field => {
        return !(validateField(field, userInfo[field]))
    })
    if (invalidFields.length > 0){
        return notifyInvalidFields(userInfo, invalidFields)
    }

    //...And if we make it here, then we should be good to go
    return register(userInfo)
}