//import { ActionTypes } from '../../actions'
import { updateStatus } from '../../actions'
export const updateHeadline = (headline) => {
	(dispatch) => dispatch(updateField('headline', headline))
}

const updateField = (field, value) => (dispatch) => {
  	const payload = { field: value }
  	//(remove later) payload[field] = value
  	resource('PUT', field, payload).then((response) => {
	    // TODO - error checking...
	    /*
	    const action = {
	    	type: ActionTypes.UPDATE_STATUS,
	    	field: response.field
	 	}*/
	 	const action = updateStatus(response.field)
	    // (remove later) action[field] = response[field]
	    dispatch(action)
  	})
}