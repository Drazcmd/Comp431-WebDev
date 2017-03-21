import { updateStatus } from '../../actions'
import { resource } from '../../dummyRequest'

//probably would want to refactor when we have to handle more than just
//the two things we are updating here.
export const updateEmail = (email) => (dispatch) => {
	dispatch(updateField('email', email)
}
export const updateHeadline = (zip) => (dispatch) => {
	dispatch(updateField('zipcode', zip))
}

const updateField = (field, value) => (dispatch) => {
  	const payload = { field: value }
  	resource('PUT', field, payload).then((response) => {
	 	const action = updateStatus(response.field)
	    dispatch(action)
  	})
}