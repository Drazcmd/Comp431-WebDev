import { updateStatus } from '../../actions'
import fetch from 'node-fetch'

export const updateHeadline = (headline) => (dispatch) => {
	dispatch(updateField('headline', headline))
}

const url = 'https://webdev-dummy.herokuapp.com'
const resource = (method, endpoint, payload) => {
  const options =  {
    method,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    }
  }
  if (payload) {
  	options.body = JSON.stringify(payload)
  };

  return fetch(`${url}/${endpoint}`, options)
    .then(r => {
      if (r.status === 200) {
        return (r.headers.get('Content-Type').indexOf('json') > 0) ? r.json() : r.text()
      } else {
        // useful for debugging, but remove in production
        console.error(`${method} ${endpoint} ${r.statusText}`)
        throw new Error(r.statusText)
      }
    })
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