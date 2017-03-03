import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import NavButton from '../navigation/navButton'
import { FormGroup, FormControl, ControlLabel } from 'react-bootstrap'
export const Registration = ({ }, { }) => {
	return (
		<div>
		<b>'Register Directly Below:'</b>
		<FormGroup 
		  controlId="Registration"
		  >
		  <ControlLabel> First Name</ControlLabel>
		  <FormControl 
		  	type="text"
		  	placeholder="Enter Text Here"
		  />
		  <ControlLabel> Last Name</ControlLabel>
		  <ControlLabel> Username Name</ControlLabel>
		  <ControlLabel> Password rst Name</ControlLabel>
		</FormGroup>

		<NavButton redirectLocation={"MAIN_PAGE"} text={"Create New Account!"}/>
		</div>

	)

}

Registration.propTypes = {
}

export default connect(
    (state) => ({ }),
    (dispatch) => ({ })
)(Registration)
