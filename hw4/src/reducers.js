import { ActionTypes, VisModes } from './actions'
const initialItems = require('./data/articles.json')
const otherUsers = require('./data/followees.json')
const obama = require('./data/profile.json')
const Reducer = (state = {
    location: 'LANDING_PAGE',
    articles: initialItems.articles,
    visibleArticles: initialItems.articles,
    visibilityMode: VisModes.NO_FILTER,
    profileData: obama,
    trump: otherUsers[0],
    hill: otherUsers[1],
    bill: otherUsers[2]
}, action) => {
    console.log(action, action.visibilityMode, action.VisMode)
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
            if (action.visibilityMode != VisModes.REFRESH) {
                visibilityMode = action.visibilityMode
            }
            console.log('vis mode:', visibilityMode)

            //NO_FILTER wants to show everything
            if (visibilityMode == VisModes.NO_FILTER) {
                return {
                    ...state, visibleArticles: state.articles.concat()
                }
            }

            //Otherwise we'll be filtering it
            const filterStr = action.filterStr
            console.log(visibilityMode)
            console.log(VisModes.FIL_AUTH)
            console.log(visibilityMode === VisModes.FIL_AUTH) 
            const filterFunc = visibilityMode === VisModes.FIL_AUTH ?
                (articles) => {
                    //Only assume it's by author if explicitly so
                    articles.filter(article => {
                        article.author.includes(filterStr)
                    })
                } : 
                (articles) => {
                    //If it's not by author, we assume it's by text
                    //AKA, == VisModes.FIL_TEXT
                    articles.filter(article => {
                        article.text.includes(filterStr)
                    })
                };
            console.log(state.articles)
            console.log(filterFunc)
            console.log(filteredArticles)
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
            console.log("new status:", action.newStatus)
            return {
                ...state, profileData: {
                    ...state.profileData, status: action.newStatus
                }
            }
        }

        default: {
            console.log("action:", action.Type)
            return state
        }
    }
}
export default Reducer