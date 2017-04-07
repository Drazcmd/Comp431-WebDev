import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { Well, ListGroupItem } from 'react-bootstrap';
import { FormGroup, FormControl, ControlLabel, Alert } from 'react-bootstrap'

//should only have one of these visible at a time!
export const ErrorDisplay = ({ message }) => {
	//might be a string, might be an error object
	return (
		<Alert bsStyle='warning'>Most recent error: {message} </Alert>
	)
}
ErrorDisplay.propTypes = {
}
export default connect(
	(state) => {
		const msg = state.globalErrorMessage
		return { 
			message: msg ? msg : "None yet :)"
		} 
	},
	(dispatch) => ({ })
)(ErrorDisplay)
