import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { Well, ListGroupItem } from 'react-bootstrap';
import { FormGroup, FormControl, ControlLabel } from 'react-bootstrap'

//should only have one of these visible at a time!
export const ErrorDisplay = ({ globalErrorMessage }) => {
	//might be a string, might be an error object
	const message = globalErrorMessage ? 
		globalErrorMessage : "No erros so far!"
	return (
		<div> {message} </div>
	)
}

export default connect(
	(state) => {
		return { 
			globalErrorMessage: state.globalErrorMessage 
		} 
	},
	(dispatch) => ({ })
)(ErrorDisplay)
