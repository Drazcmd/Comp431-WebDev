import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import NavButton from '../navigation/navButton'
import { Well, FormGroup, FormControl, ControlLabel } from 'react-bootstrap'
import { notifyRegistrationSuccess, notifyRegistrationFailure} from './../../actions'
import { checkRegValidity, explainRegFailures } from './authActions'
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
    (dispatch) => {
    	return {
    		//Currently registration is non-functional, even though
    		//we are validating the user's input
    		registerUser: (userInfo) => {
    			const infoValid = checkRegValidity(userInfo)
    			if (infoValid){
    				dispatch(notifyRegistrationSuccess(userInfo))
    			} else {
    				//ask it why the fields were invalid, and pass on the reason
    				const failureReasons = explainRegFailures(userInfo)
    				dispatch(notifyRegistrationFailure(
    					userInfo,
    					`Reasons for failure: ${failureReasons}`
    				))
    			}
    		}
    	}
    }
)(Registration)
