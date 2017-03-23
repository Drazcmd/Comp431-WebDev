import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import NavButton from '../navigation/navButton'
import { Well, FormGroup, FormControl, ControlLabel } from 'react-bootstrap'

export const Registration = ({ registrationMessage }) => {
	return (
		<Well>
		<h4>REGISTER A NEW ACCOUNT: </h4>
		<FormGroup 
		  controlId="Registration"
		  >
		  <ControlLabel> First Name</ControlLabel>
		  <FormControl 
		  	type="text"
		  	placeholder="Enter Text Here"
		  />
		  <ControlLabel> Last Name</ControlLabel>
		  <FormControl 
		  	type="text"
		  	placeholder="Enter Text Here"
		  />
		  <ControlLabel> Username </ControlLabel>
		  <FormControl 
		  	type="text"
		  	placeholder="Enter Text Here"
		  />
		  <ControlLabel> Password </ControlLabel>
		  <FormControl 
		  	type="text"
		  	placeholder="Enter Text Here"
		  />
		</FormGroup>

		<NavButton redirectLocation={"MAIN_PAGE"} text={"Create New Account!"}/>
		<div> { registrationMessage } </div>
		</Well>

	)

}

Registration.propTypes = {
}

export default connect(
    (state) => {
    	return {
    		registrationMessage: state.registrationMessage
    	}
    },
    (dispatch) => ({ })
)(Registration)
