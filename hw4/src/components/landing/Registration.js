import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import NavButton from '../navigation/navButton'
export const Registration = ({ }, { }) => {
	return (
		<div>
		<b>'Register Directly Below:'</b>
		<h4>
		<input type="text" defaultValue={"First Name"} /> 
		<input type="text" defaultValue={"Last Name"} /> 
		<input type="text" defaultValue={"Username"} /> 
		<input type="text" defaultValue={"Password"} /> 
		<input type="text" defaultValue={"Confirm Password"} /> 
		</h4>
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
