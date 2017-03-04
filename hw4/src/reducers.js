import { ActionTypes } from './actions'
const initialItems = require('./data/articles.json')
const otherUsers = require('./data/followees.json')
const obama = require('./data/profile.json')

const Reducer = (state = {
    location: 'LANDING_PAGE',
    
    articles: initialItems.articles,
    // the one with id=5159532 shouldn't show up!
    visibleArticleIDs: [
        3833265, 2858421, 3675962, 5423165,
        4242601, 2683634, 3744656, 3124181
    ],
    profileData: obama,
    trump: otherUsers[0],
    hill: otherUsers[1],
    bill: otherUsers[2]

}, action) => {
    switch (action.type) {
        case ActionTypes.LOCATION_CHANGE:
            console.log("Location change action's reducer")
            return { ...state, location: action.location}
        case ActionTypes.HIDE_ARTICLE:
            console.log("hiding an article", action.articleID)
            return { ...state, visibleArticleIDs: 
                visibleArticleIDs.filter(
                    id => id != action.articleID
                )
            }
        case ActionTypes.SHOW_ARTICLE:
            console.log("Showing an article")
            return 
        case ActionTypes.ADD_ARTICLE:
            //These will be non-persitant on refresh as required")
            return {
                ...state,
                articles:
                    state.articles.concat(action.newArticle),
                visibleArticleIDs: 
                    state.visibleArticleIDs.concat(action.newArticle._id)
            }
        case ActionTypes.UPDATE_STATUS:
            console.log("new status:", action.new_status)
            console.log("old status", state.profileData.status)
            return {
                ...state, profileData: {
                    ...state.profileData, status: action.new_status
                }
            }

        default:
            console.log("action:", action.Type)
            return state
    }
}

export default Reducer