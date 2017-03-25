import { resource } from './serverRequest'
export const MAIN_PAGE = 'MAIN_PAGE'
export const PROFILE_PAGE = 'PROFILE_PAGE'
export const LANDING_PAGE = 'LANDING_PAGE'
export const ERROR = 'ERROR'

export const VisModes = {
    REFRESH : 'REFRESH',
    FIL_AUTH : 'FILTER_BY_AUTHOR',
    FIL_TEXT : 'FILTER_BY_TEXT',
    NO_FILTER : 'NO_FILTER'
}

export const ActionTypes = {
    LOCATION_CHANGE: 'LOCATION_CHANGE',
    ADD_ARTICLE: 'ADD_ARTICLE',
    UPDATE_STATUS: 'UPDATE_STATUS',
    UPDATE_PROFILE_DATA: 'UPDATE_PROFILE_DATA',
    DOWNLOAD_PROFILE_DATA: 'DOWNLOAD_PROFILE_DATA',
    UPDATE_SHOWN_ARTICLES: 'UPDATE_SHOWN_ARTICLES',
    REMOVE_FOLLOWEE: "REMOVE_FOLLOWEE",
    ADD_FOLLOWEE: "ADD_FOLLOWEE",
    LOGOUT: "LOGOUT",
    LOGIN: "LOGIN",
    UPDATE_ERROR_MESSAGE: 'UPDATE_ERROR_MESSAGE'
}

/* 
As a reminder to help explain what on earth all this is for,
"Actions are payloads of information that send data from
your application to your store. They are the only source of information for
the store. You send them to the store using store.dispatch().
...
Actions are plain JavaScript objects. Actions must have a type property that
indicates the type of action being performed.
...
Action creators are exactly that—functions that create actions. It's easy to
conflate the terms “action” and “action creator,” so do your best to use the
proper term.
In Redux action creators simply return an action:
*/
export const updateLocation = (new_location) => {
    let resultingAction = { type: ActionTypes.LOCATION_CHANGE, location: new_location }
    if (new_location == MAIN_PAGE) {
        //need to grab the articles and followees
        return resource('GET', 'articles')
        .then(r => {
            const articles = r.articles
            resultingAction.articles = articles
            return resource('GET', 'following')
        })
        .then(r => {
            const followees = r.following
            resultingAction.followees = followees
            return resultingAction
        })
        .catch(r => {
            console.log("caught something")
            return resultingAction
        })
    } else if (new_location == PROFILE_PAGE) {
        console.log("implement profile data update")
        //need to grab the other profile data
        return resource('GET', 'email')
        .then(r => {
            const email = r.email
            resultingAction.email = email
            return resultingAction
        }).catch(r => {
            console.log("caught something")
            return resultingAction
        })
    } else {
        //only one left is landing page - note we should
        //have already logged out before this part!
        return resultingAction
    }
}
export const addArticle = (newArticle) => {
    return { type: ActionTypes.ADD_ARTICLE, newArticle }
}
export const updateStatus = (newStatus) => {
    return { type: ActionTypes.UPDATE_STATUS, newStatus }
}
export const updateProfileData = (newData) => {
    return { type: ActionTypes.UPDATE_PROFILE_DATA, newData }
}
export const updateShownArticles =
 (visibilityMode, filterStr, optionallyArticles) => {
    return { 
        type: ActionTypes.UPDATE_SHOWN_ARTICLES,
        visibilityMode, filterStr, optionallyArticles
    }
}
export const removeFollowee = (name) => {
    return {type: ActionTypes.REMOVE_FOLLOWEE, name}
}
export const addFollowee = (name) => {
    return {type: ActionTypes.ADD_FOLLOWEE, name}
}
/* 
Input ought to look something like:
{
    'username' : 'cmd11test',
    'headline' : 'TESTING'
}
*/
export const downloadProfileData = (field, user) => {
    return {type: ActionTypes.DOWNLOAD_DATA, field, user}
}
//Although possibly successful, it's not actually implemented on
//the server's side - so it'll always display an error msg
export const notifyRegSuccess = (newUser) => {
    const firstHalf = `Your registration inputs were valid, but the `
    const secondHalf = `server's registration feature isn't working yet`
    const msg = firstHalf + secondHalf
    return {type: ActionTypes.UPDATE_ERROR_MESSAGE, message:msg}
}
export const logout = () => {
    //TODO - clear stuff?
    console.log("gotta clear stuff still")
    return resource('PUT', 'logout')
    .then(r => {
        return updateLocation(LANDING_PAGE)
    }).catch(r => {
        console.log('caught something...')
        return updateLocation(LANDING_PAGE)
    })
}

const requestProfile = (username) => {
    const profileData = resource('GET', 'headlines')
    .then(jsonData => {
        console.log(jsonData) 
    })
    console.log(profileData)
    return profileData

}

export const login = (username, password) => {
    return resource('POST', 'login', { username, password })
    .then(r => resource('GET', 'headlines/'))
    .then(r => {
      const user = r.headlines[0]
      const message = `you are logged in as ${user.username} "${user.headline}"`
      return updateLocation(MAIN_PAGE)
    })
    .catch(r => {
        const message = `"${r.message || 'Error'}" when logging in`
        console.log("caught something!!")
        //return dispError(message)
        return updateLocation(MAIN_PAGE)

    })
}

export const dispError = (message) => {
    return {type: ActionTypes.UPDATE_ERROR_MESSAGE, message:message}
}
