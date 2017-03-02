import * as Actions from './actions'

const Reducer = (state = {
    location: 'LANDING_PAGE',
}, action) => {
    switch (action.type) {
        case Actions.LOCATION_CHANGE:
            return { ...state, location: action.new_location}
            /*
        case Actions.USER_CHANGE:
            return 
            */
        default:
            return state
    }
}

export default Reducer