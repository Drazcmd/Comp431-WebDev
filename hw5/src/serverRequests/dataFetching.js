import { resource } from './serverRequest'
export const getMainData = (userList) => {
	const userListStr = userList.join(',')
    return Promise.all([
        resource('GET', 'articles'),
        resource('GET', `headlines/${userListStr}`),
        resource('GET', `avatars/${userListStr}`)
    ]).then(getRequests => {
        const articles = getRequests[0].articles

        //we need to package each followee up for my components to use
        const followeesHeadlines = getRequests[1].headlines
        const followeesAvatars = getRequests[2].avatars
        const followees = followeesHeadlines.map((followeeWithHeadline) => {
            const headline = followeeWithHeadline.headline
            const username = followeeWithHeadline.username
            const possibleAvatar = followeesAvatars.find((followee) => {
                return followee.username === username
            })
            const avatar = possibleAvatar ? possibleAvatar.avatar : null
            return { 
                name: username,
                status: headline,
                img: avatar
            }
        })
        return {
            articles: articles,
            followees: followees
        }
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
       		profileData: {
	            email: email,
	            zipcode: zipcode
       		}
       } 
    })
}

/**  
These two can be used for updating any of the various user fields who are
updated using a PUT with endpoint as /${fieldname} and required payload as
{ ${fieldname}: value }.

This includes the user's headline, user email,  zipcode, and password,
*/
const updateField = (field, value) => {
	console.log('field', field, 'val:', value)
	//unfortunately there's no way to functionally interpolate the
	//field variable as our key (rather than 'field' as the key) :(
	const payload = {}
	payload[field] = value
	return resource('PUT', field, payload)
}
export const updateFields = (fieldValueObjs) => {
	const resultingDataAcc = {}
	console.log(fieldValueObjs)
	return Promise.all(
		fieldValueObjs.map(fieldValueObj => {
			//i.e. email, zipcode, headline, etc
			const fieldToUpdate = fieldValueObj.field
			//i.e. a@gmail.com, 33333, etc.
			const newValue = fieldValueObj.value
			return updateField(fieldToUpdate, newValue)
		})
	).then((fetchResponses) => {
		return fetchResponses.reduce(
			((resultingDataAcc, fetchResponse, index) => {
				//Index should be the same due to use of Promise.all
				const field = fieldValueObjs[index].field
				console.log(field, fetchResponse[field])
				//And now package it up nicely for our reducers to use
				const withField = {
					...resultingDataAcc
				}
				//Same inability to interpolate as above :/ It's a
				//fundamental limitation of js as far as I understand
				withField[field] = fetchResponse[field]
				return withField
			})
		)
	})
}

