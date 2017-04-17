import { ActionTypes, VisModes } from './actions'

//export is only so I can test it easier :)
export const defaultState = {
    location: 'LANDING_PAGE',
    articles: [],
    visibilityMode: VisModes.NO_FILTER,
    filterStr: '',  
    profileData: {
        'name':'Anon',
        'email':'missingEmail@missing.com', 
        'zip':'00000',
        'img': 'http://www.clker.com/cliparts/n/T/5/z/f/Y/image-missing-md.png',
        'status':'missing status'
    },
    followees: [],
    globalErrorMessage: 'No errors at present'
}
export const Reducer = (state=defaultState, action) => {
    switch (action.type) {
        case ActionTypes.LOCATION_CHANGE: {
            //doing a full refresh - Facebook seems to do this too

            const location = action.newLocation
            if (location == 'LANDING_PAGE'){ 
                //almost certainly a logout - and as such we really
                //need to wipe our internal state
                return defaultState
            }

            //Since this assignment doesn't require all the fields we
            //will eventually, can't guarantee what'll be passed in
            const profileData = action.profileData 
            ? {
                name: action.profileData.name ?
                    action.profileData.name : state.profileData.name,
                email: action.profileData.email ?
                    action.profileData.email : state.profileData.email,
                zip: action.profileData.zipcode ?
                    action.profileData.zipcode : state.profileData.zip,
                img: action.profileData.img ?
                    action.profileData.img : state.profileData.img,
                status: action.profileData.status ?
                    action.profileData.status : state.profileData.status,
            } 
            : state.profileData
            const articles = action.articles ? action.articles: state.articles
            const followees = action.followees ? action.followees: state.followees
            return { ...state,
                location: location, articles: articles,
                followees: followees, profileData: profileData
            }
        }
        case ActionTypes.LOGIN: {
            return { ...state, location: "MAIN_PAGE"}
        }

        case ActionTypes.UPDATE_SHOWN_ARTICLES: {
            //(just in case the GET fails)
            const returnedArticles =
                action.articles ? action.articles: state.articles

            //It's a direction to use the old settings; the
            //state itself should NEVER have VisModes.REFRESH
            if (action.visibilityMode === VisModes.REFRESH) {
                return {
                    ...state,
                    articles: returnedArticles
                }
            } else {
                //Or a request to use the new visibility mode
                return {
                    ...state,
                    visibilityMode: action.visibilityMode,
                    articles: returnedArticles,
                    filterStr: action.filterStr
                } 
            }
        }

        case ActionTypes.UPDATE_STATUS: {
            return {
                ...state, profileData: {
                    ...state.profileData, status: action.newStatus
                }
            }
        }
        case ActionTypes.UPDATE_FOLLOWEES: {
            const newFollowees = action.resultingFollowees 
                ? action.resultingFollowees : state.followees
            return {...state, followees: newFollowees}
        }
        case ActionTypes.UPDATE_PROFILE_DATA: {
            const newProfileData = action.newProfileData;
            return {
                ...state,
                profileData: {
                    ...state.profileData, 
                    zip: newProfileData.zipcode ?
                        newProfileData.zipcode : 
                        state.profileData.zip,
                    email: newProfileData.email ?
                        newProfileData.email :
                        state.profileData.email,
                    img: newProfileData.img ?
                        newProfileData.img :
                        state.profileData.img
                }
            }
        }

        case ActionTypes.LOGIN: {
            return {
                ...state,
                location:"MAIN_PAGE",
                profileData: action.profileData
            }
        }
        case ActionTypes.LOGOUT: {
            return defaultState
        }
        case ActionTypes.UPDATE_ERROR_MESSAGE: {
            return {
                ...state,
                globalErrorMessage: action.message
            }
        }
        default: {
            return {
                ...state, 
            }
        }
    }
}
export default Reducer