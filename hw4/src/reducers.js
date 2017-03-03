import { ActionTypes } from './actions'
const initialItems = require('./data/articles.json')

const Reducer = (state = {
    location: 'LANDING_PAGE',
    articles: initialItems.articles
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