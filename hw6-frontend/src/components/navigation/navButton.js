import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { updateLocation } from '../../actions'
import { Button } from 'react-bootstrap';
export const NavButton = ({ displayText, navigate, beforeNavigating }) => {
	const doStuffThenNavigate = () => {
		if (beforeNavigating) {beforeNavigating();}
		navigate()
	}
	return (
		<span>
		<Button bsStyle="primary" onClick = { doStuffThenNavigate }> { displayText }  </Button>
		</span>
	)
}

NavButton.propTypes = {
	redirectLocation: PropTypes.string.isRequired,
	displayText: PropTypes.string.isRequired,
	//Not required! It's something else that can dispatch when neccessary
	beforeNavigating: PropTypes.func
}

export default connect(
	(state, ownProps) => {
		return { displayText: ownProps.text } 
	},
	(dispatch, ownProps) => {
    	return {
    		navigate: (redirectLocation) => {
	    		updateLocation(ownProps.redirectLocation).then(
	    			(resultingAction) => dispatch(resultingAction)
	    		)
	    	}
    	}
    }

)(NavButton)
