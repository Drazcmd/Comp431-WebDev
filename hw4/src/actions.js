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
    CLEAR_WRITE_VIEW: 'CLEAR_WRITE_VIEW',
    UPDATE_STATUS: 'UPDATE_STATUS',
    UPDATE_SHOWN_ARTICLES: 'UPDATE_SHOWN_ARTICLES',
    REMOVE_FOLLOWEE: "REMOVE_FOLLOWEE"
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
export const updateShownArticles = (visibilityMode, filterStr) => {
	return { 
		type: ActionTypes.UPDATE_SHOWN_ARTICLES,
	 	visibilityMode, filterStr
	}
}
export const removeFollowee = (name) => {
	return {type: ActionTypes.REMOVE_FOLLOWEE, name}
}
