import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { updateLocation } from '../../actions'

console.log(connect)
console.log(updateLocation)
export const NavButton = ({ redirectLocation, navigate }) => {
	console.log(location)
	console.log(navigate)
	return (
		<span>
		<button onClick = { navigate }> 'NAVIGATE TO ' {redirectLocation}  </button>
		</span>
	)
}

NavButton.propTypes = {
	redirectLocation: PropTypes.string.isRequired
}

export default connect(
	(state, ownProps) => {
		return { redirectLocation: ownProps.redirectLocation } 
	},
	(dispatch, ownProps) => {
    	console.log("nav button")
    	return {
    		navigate: (redirectLocation) => dispatch(updateLocation(ownProps.redirectLocation))
    	}
    }

)(NavButton)
