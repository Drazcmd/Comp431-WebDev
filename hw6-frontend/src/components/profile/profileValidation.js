export const validateData = ((newEmail, newZipcode) => {
    const error_base = {
        validity: false 
    }

    //I decidd to only allow an update if every field has an input value
    const emailMissing = (!newEmail) ? 
    "Error: You need to input a new email" : ""
    const zipcodeMissing = (!newZipcode) ? 
    "Error: You need to input a new zipcode" : ""
    //An empty string "" has falsiness (nonempty has truthiness)
    if (emailMissing || zipcodeMissing) {
        return {
            ...error_base,
            errorReason: emailMissing + zipcodeMissing
        }
    }

    //If we made it to here then there is SOMETHING inputted for both parts
    const emailRegex = /([a-zA-Z0-9]+)(\x40)([a-z]+)(\x2E)([a-z]+)/
    const zipcodeRegex = /\d{5}/  

    const emailInvalid = emailRegex.test(newEmail) 
    ? "" : "Email was invalid - enter something of form 'a@b.c'. "
    const zipcodeInvalid = zipcodeRegex.test(newZipcode) 
    ? "" : "Zipcode was invalid - enter 5 digits, each 0-9. "

    if (emailInvalid || zipcodeInvalid) {
        return {
            ...error_base,
            errorReason: emailInvalid + zipcodeInvalid
        }
    } else {
        return {
            validity: true,
            errorReason: "No error :)"
        }
    }
})