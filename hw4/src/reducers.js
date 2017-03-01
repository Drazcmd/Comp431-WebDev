import * as Actions from './actions'

const Reducer = (state = {
    text: 'hello world!',
    message: '',
}, action) => {
    switch (action.type) {
        case Actions.UPDATE_TEXT:
            return { ...state, text: action.text, message: '' }
        case Actions.ERROR:
            return { ...state, message: action.message }
        default:
            return state
    }
}

export default Reducer