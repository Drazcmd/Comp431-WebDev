import { ActionTypes } from './actions'
const initialItems = require('./data/articles.json')

const Reducer = (state = {
    location: 'LANDING_PAGE',
    articles: initialItems.articles,
    // the one with id=5159532 shouldn't show up!
    visibleArticleIDs: [
        3833265, 2858421, 3675962, 5423165,
        4242601, 2683634, 3744656, 3124181
    ]
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
            
        default:
            console.log("action:", action.Type)
            return state
    }
}

export default Reducer