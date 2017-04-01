import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { Well, ListGroupItem } from 'react-bootstrap';
import { FormGroup, FormControl, ControlLabel } from 'react-bootstrap'

//should only have one of these visible at a time!
export const ErrorDisplay = ({ message }) => {
	console.log("eror display updating")
	//might be a string, might be an error object
	return (
		<p>Most recent error: {message} </p>
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
