import { ActionTypes } from './actions'

const Reducer = (state = {
    location: 'LANDING_PAGE',
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
            console.log("NOPE!")
            return state
    }
}

export default Reducer