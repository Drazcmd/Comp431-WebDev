import { ActionTypes, VisModes } from './actions'
const initialItems = require('./data/articles.json')
const otherUsers = require('./data/followees.json')
const obama = require('./data/profile.json')
const Reducer = (state = {
    location: 'LANDING_PAGE',
    articles: initialItems.articles,
    visibleArticles: initialItems.articles,
    visibilityMode: VisModes.NO_FILTER,
    filterStr: "",
    profileData: obama,
    followees: otherUsers
}, action) => {
    console.log(action, action.visibilityMode)
    console.log("in action:", action.type)
    console.log("vis mode", action.visibilityMode)
    switch (action.type) {
        case ActionTypes.LOCATION_CHANGE: {
            console.log("Location change action's reducer")
            return { ...state, location: action.location}
        }

        case ActionTypes.UPDATE_SHOWN_ARTICLES: {
            //It's either a new mode or a direction to use the old
            console.log("in vis mode", action.visibilityMode)
            console.log(state.visibilityMode)
            let visibilityMode = VisModes.NO_FILTER
            let filterStr = state.filterStr
            if (action.visibilityMode != VisModes.REFRESH) {
                visibilityMode = action.visibilityMode
                filterStr = action.filterStr
            }
            console.log('vis mode:', visibilityMode, filterStr)

            //NO_FILTER wants to show everything
            if (visibilityMode == VisModes.NO_FILTER) {
                return {
                    ...state, visibleArticles: state.articles.concat()
                }
            }

            //Otherwise we'll be filtering it
            console.log(visibilityMode, filterStr)
            console.log(VisModes.FIL_AUTH)
            console.log(visibilityMode === VisModes.FIL_AUTH) 
            //Ternary operator is being weird, not sure why.
            //This is identical in function to one though
            let filterFunc = () => articles.concat()

            if (visibilityMode === VisModes.FIL_AUTH){
                console.log("filtering by author", filterStr)
                filterFunc = (articles) => {
                    //Only assume it's by author if explicitly so
                    return articles.filter(article => {
                        return article.author.includes(filterStr)
                    })
                }
            } else if (visibilityMode === VisModes.FIL_TEXT){
                console.log("filtering by text", filterStr)
                filterFunc = (articles) => {
                    //If it's not by author, we assume it's by text
                    //AKA, == VisModes.FIL_TEXT
                    return articles.filter(article => {
                        return article.text.includes(filterStr)
                    })
                };
            } else {
                console.log("No match! huh?")
            }
            console.log(state.articles)
            console.log(filterFunc)
            const filteredArticles = filterFunc(state.articles);
            console.log("filtered articles:", filteredArticles)
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
            console.log("new status:", action.newStatus)
            return {
                ...state, profileData: {
                    ...state.profileData, status: action.newStatus
                }
            }
        }
        case ActionTypes.REMOVE_FOLLOWEE: {
            console.log("remove him", action.name)
            return {...state, followees: state.followees.filter(
                (followee) => {
                    return !(followee.name === action.name)
                }
            )}
        }
        case ActionTypes.ADD_FOLLOWEE: {
            console.log("add him", action.name)
            return {...state, followees: state.followees.concat(
                {
                    name: action.name,
                    status: "Now struggling with a HARD CODE assignment...",
                    img: "https://unsplash.it/200"
                }
            )}
        }

        default: {
            console.log("action:", action.Type)
            return {
                ...state, 
            }
        }
    }
}
export default Reducer