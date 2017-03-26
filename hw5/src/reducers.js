import { ActionTypes, VisModes } from './actions'
//TODO remove hardcoding
//export is only so I can test it
export const Reducer = (state = {
    location: 'LANDING_PAGE',
    articles: [],
    visibilityMode: VisModes.NO_FILTER,
    filterStr: "",  
    profileData: {
        "name":"Anon", 
        "email":"missingEmail@missing.com", 
        "zip":"00000",
        "img": "http://www.clker.com/cliparts/n/T/5/z/f/Y/image-missing-md.png ",
        "status":"missing status"
    },
    followees: [],
    globalErrorMessage: ""
}, action) => {
    switch (action.type) {
        case ActionTypes.LOCATION_CHANGE: {
            //doing a full refresh - Facebook seems to do this too
            const location = action.newLocation
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
            //TODO - update other areas if needed
            return { ...state, location: "MAIN_PAGE"}
        }

        case ActionTypes.UPDATE_SHOWN_ARTICLES: {
            //These articles were an optional input
            const returnedArticles =
                action.articles ? action.articles: state.articles

            //It's a direction to use the old settings...
            //(the state itself should have VisModes.REFRESH)
            if (action.visibilityMode === VisModes.REFRESH) {
                return {
                    ...state,
                    visibilityMode: state.visibilityMode,
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

        case ActionTypes.ADD_ARTICLE: {
            //These will be non-persitant on refresh as required")
            const new_state = ((action.newArticle.text) &&
              (action.newArticle.text.length != 0)) ? {
                    ...state,
                    articles:
                        state.articles.concat(action.newArticle),
                } :
                state
            return new_state
        }

        case ActionTypes.UPDATE_STATUS: {
            return {
                ...state, profileData: {
                    ...state.profileData, status: action.newStatus
                }
            }
        }
        case ActionTypes.REMOVE_FOLLOWEE: {
            return {...state, followees: state.followees.filter(
                (followee) => {
                    return !(followee.name === action.name)
                }
            )}
        }
        case ActionTypes.ADD_FOLLOWEE: {
            return {...state, followees: state.followees.concat(
                {
                    name: action.name,
                    status: "Now struggling with a HARD CODE assignment...",
                    img: "https://unsplash.it/200"
                }
            )}
        }
        case ActionTypes.UPDATE_PROFILE_DATA: {
            const new_data = action.newData;
            console.log(new_data)
            return {
                ...state,
                profileData: {
                    ...state.profileData, 
                    zip: new_data.zip,
                    email: new_data.email
                }
            }
        }
        case ActionTypes.LOGIN: {
            return {
                ...state,
                location:"MAIN_PAGE",
                profileData: action.profileData,
                globalErrorMessage: ""
            }
        }
        case ActionTypes.LOGOUT: {
            return {
                ...state,
                location:"LANDING_PAGE",
                profileData: {
                    "name":"Anon", 
                    "email":"missingEmail@missing.com", 
                    "zip":"00000",
                    "img": "http://www.clker.com/cliparts/n/T/5/z/f/Y/image-missing-md.png ",
                    "status":"missing status"
                },
                globalErrorMessage: ""
            }
            return state
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