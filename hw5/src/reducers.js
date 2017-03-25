import { ActionTypes, VisModes } from './actions'
//TODO remove hardcoding
//export is only so I can test it
export const Reducer = (state = {
    location: 'LANDING_PAGE',
    articles: [],
    visibleArticles: [],
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
            return { ...state, location: action.location}
        }
        case ActionTypes.LOGIN: {
            //TODO - update other areas if needed
            return { ...state, location: "MAIN_PAGE"}
        }

        case ActionTypes.UPDATE_SHOWN_ARTICLES: {
            //It's either a new mode or a direction to use the old
            let visibilityMode = VisModes.NO_FILTER
            let filterStr = state.filterStr
            if (action.visibilityMode != VisModes.REFRESH) {
                visibilityMode = action.visibilityMode
                filterStr = action.filterStr
            }

            //NO_FILTER wants to show everything
            if (visibilityMode == VisModes.NO_FILTER) {
                return {
                    ...state, visibleArticles: state.articles.concat()
                }
            }

            let filterFunc = () => articles.concat()
            //Ternary operator is being weird, not sure why.
            //This is identical in function to one though
            if (visibilityMode === VisModes.FIL_AUTH){
                filterFunc = (articles) => {
                    //Only assume it's by author if explicitly so
                    return articles.filter(article => {
                        return article.author.includes(filterStr)
                    })
                }
            } else if (visibilityMode === VisModes.FIL_TEXT){
                filterFunc = (articles) => {
                    //If it's not by author, we assume it's by text
                    //AKA, == VisModes.FIL_TEXT
                    return articles.filter(article => {
                        return article.text.includes(filterStr)
                    })
                };
            } else {
                ;
            }
            const filteredArticles = filterFunc(state.articles);
            return {
                ...state, 
                visibleArticles: filteredArticles
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