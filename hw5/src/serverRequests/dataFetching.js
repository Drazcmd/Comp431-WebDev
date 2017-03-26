import { resource } from './serverRequest'
export const getMainData = (userListStr) => {
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
