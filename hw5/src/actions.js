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
    return { type: ActionTypes.LOCATION_CHANGE, location: new_location }
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
export const updateShownArticles = (visibilityMode, filterStr) => {
    return { 
        type: ActionTypes.UPDATE_SHOWN_ARTICLES,
        visibilityMode, filterStr
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
    return {type: ActionTypes.LOGOUT}
}
export const login = (username, password) => {
    const resultingAction = resource('POST', 'login', {
        username, password 
    })
    .then(jsonData => {
        console.log(jsonData)
        return {
            type: ActionTypes.LOGIN,
            username: jsonData.username
        }
    }).catch(res => {
        console.log(res.message)
        return dispError(`"${res.message || 'Error'}" when logging in`)
    })
    console.log("what we got:", resultingAction)
    return resultingAction
}

export const dispError = (message) => {
    return {type: ActionTypes.UPDATE_ERROR_MESSAGE, message:message}
}
