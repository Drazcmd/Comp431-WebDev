import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { updateLocation } from '../../actions'

console.log(connect)
console.log(updateLocation)
export const ButtonToMain = ({ redirectLocation, navigate }) => {

	console.log(location)
	console.log(navigate)

	return (
		<span>
		<button onClick = { navigate }> 'CLICK  MAIN PAGE' </button>
		</span>
	)
}

ButtonToMain.propTypes = {
	redirectLocation: PropTypes.string.isRequired
}

export default connect(
	(state, ownProps) => { 
		return { redirectLocation: ownProps.redirectLocation }
	}, (dispatch, ownProps) => {
    	console.log("main page")
    	return {
    		//navigate: () => console.log("dispatch")
    		navigate: (redirectLocation) => dispatch(updateLocation(ownProps.redirectLocation))
    	}
    }

)(ButtonToMain)
