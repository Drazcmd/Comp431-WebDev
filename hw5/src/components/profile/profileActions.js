import { updateProfileData, downloadProfileData } from '../../actions'
import { resource } from '../../serverRequest'

/** 
Note that fetching user's profile info is done both in the real profile
file and the 'mini' profile, whereas actually updating the headline is only
done in this 'mini' profile, and not done in the real profile. However, the
functionality used for each such operation is the exact same; as such, I
decided to store all the relevant action code inside this profileActions.js
file, and have mini profile simply use the same actions when it needs to do
stuff. This means that the profile COULD update the headline and the mini
profile COULD update the  rest of the stuff quite trivially, even thoguh they
don't.

The biggest benefit of this is it makes things modular and easy to use;
although this is called 'profileActions', it's not truly tied to the profile
component any more. Rather, it's almost like a general purpose profile action
library in a sense - I can have any version of the profile anywhere on the
website, and it'll be able to dispatch these actions in order to get or update
profile info. 
*/

/**
See piazza @138. In the future when we have more than just three 
fields as required for this assingment, I might want to make this a
loop that updates for any passed in values we have (almost a
generic profile update if you will).

However, for now explicitly doing these three is the best option.
*/
export const multiUpdateGenerator = (newProfileData) => {
	return ((dispatch) => {
		newProfileData.forEach((dataPiece) => {
	    	dispatch(updateField(dataPiece))
		})
	})
}
/**
Special case for updating the user's profile's data,
such as the headline, email, or zipcode

the data piece, which is our payload, should be
like {'username':blah, 'headline':'blah'}
*/
const updateField = (dataPiece) => (dispatch) => {
    const field = Object.keys(dataPiece).filter((key) => {
        return key != 'username'
    })[0]
  	resource('PUT', field, dataPiece).then((response) => {
  		//TODO error checking
	 	const action = updateProfileData(response.field)
	    dispatch(action)
  	})
}

export const getProfileData = () => {
    return Promise.all([
        resource('GET', 'email'),
        resource('GET', 'zipcode')
    ]).then(getRequests => {
        const email = getRequests[0].email
        const zipcode = getRequests[1].zipcode
       return {
            email: email,
            zipcode: zipcode
       } 
    })
}
