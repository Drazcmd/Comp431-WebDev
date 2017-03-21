import { updateStatus } from '../../actions'
import { resource } from '../../dummyRequest'
/**
Note that fetching user's profile info is done both in the real profile
file and in this 'mini' profile. However, actually updating the headline is
only done in this 'mini' profile, and not done in the real profile. As such, I
decided to split the 'validate profile actions' section into two separate
sections - the mini profile's actions and the real profile's actiobns, with
updating the status headline the only action in the mini profile's set of
actions. but all the other profile actions
*/
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