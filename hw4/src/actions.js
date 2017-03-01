export const UPDATE_TEXT = 'UPDATE_TEXT'
export const ERROR = 'ERROR'

export const ActionTypes = {
    UPDATE_TEXT: 'UPDATE_TEXT', 
}

export const updateText = (text) => {
    if (text.length > 5) {
        return { type: UPDATE_TEXT, text }
    }
    return { type: ERROR, message: 'Text must be longer than 5 characters'}
}