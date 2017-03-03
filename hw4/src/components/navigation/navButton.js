import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { updateLocation } from '../../actions'

console.log(connect)
console.log(updateLocation)
export const NavButton = ({ displayText, navigate }) => {
	return (
		<span>
		<button onClick = { navigate }> { displayText }  </button>
		</span>
	)
}

NavButton.propTypes = {
	redirectLocation: PropTypes.string.isRequired,
	displayText: PropTypes.string.isRequired
}

export default connect(
	(state, ownProps) => {
		return { displayText: ownProps.text } 
	},
	(dispatch, ownProps) => {
    	return {
    		navigate: (redirectLocation) => dispatch(updateLocation(ownProps.redirectLocation))
    	}
    }

)(NavButton)
