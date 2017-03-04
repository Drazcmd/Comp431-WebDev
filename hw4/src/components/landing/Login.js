import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import NavButton from '../navigation/navButton'
import { FormGroup, FormControl, ControlLabel, Well } from 'react-bootstrap'
export const Login = ({ }, { }) => {
	return (

		<Well>
		<h4>LOGIN: </h4>
		<FormGroup 
		  controlId="Login"
		  >
		  <ControlLabel> Username </ControlLabel>
		  <FormControl 
		  	type="text"
		  	placeholder="Enter Username Here"
		  />
		  <ControlLabel> Password </ControlLabel>
		  <FormControl 
		  	type="text"
		  	placeholder="Enter Password Here"
		  />
		</FormGroup>

		<NavButton redirectLocation={"MAIN_PAGE"} text={"Login!"}/>
		</Well>

	)

}

Login.propTypes = {
}

export default connect(
    (state) => ({ }),
    (dispatch) => ({ })
)(Login)
