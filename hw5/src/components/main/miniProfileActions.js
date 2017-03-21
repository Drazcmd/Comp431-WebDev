import { updateStatus } from '../../actions'
import { resource } from '../../dummyRequest'
import fetch from 'node-fetch'

export const updateHeadline = (headline) => (dispatch) => {
	dispatch(updateField('headline', headline))
}


const updateField = (field, value) => (dispatch) => {
  	const payload = { field: value }
  	resource('PUT', field, payload).then((response) => {
	 	const action = updateStatus(response.field)
	    dispatch(action)
  	})
}