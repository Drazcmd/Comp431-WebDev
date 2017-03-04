import { ActionTypes } from './actions'
const initialItems = require('./data/articles.json')

const Reducer = (state = {
    location: 'LANDING_PAGE',
    articles: initialItems.articles,
    visibleArticleIDs: [
        3833265, 2858421, 3675962, 5423165
        //4242601, 2683634, 3744656, 3124181, 5159532
    ]
}, action) => {
    switch (action.type) {
        case ActionTypes.LOCATION_CHANGE:
            console.log("Location change action's reducer")
            return { ...state, location: action.location}
            /*
        case Actions.USER_CHANGE:
            return 
            */
        default:
            console.log("action:", action.Type)
            return state
    }
}

export default Reducer