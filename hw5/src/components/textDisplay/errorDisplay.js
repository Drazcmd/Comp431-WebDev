import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { Well, ListGroupItem } from 'react-bootstrap';
import { FormGroup, FormControl, ControlLabel } from 'react-bootstrap'

//should only have one of these visible at a time!
export const ErrorDisplay = ({ globalErrorMessage }) => {
	return (
		<Well bsStyle="danger"> {globalErrorMessage} </Well>
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
