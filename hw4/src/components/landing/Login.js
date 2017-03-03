import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import NavButton from '../navigation/navButton'
export const Login = ({ }, { }) => {
	return (
		<div>
		<b>'Login Directly Below:'</b>
		<h4>
		<input type="text" defaultValue={"Username goes here"} /> 
		<input type="text" defaultValue={"Password goes here"} /> 
		</h4>
		<NavButton redirectLocation={"MAIN_PAGE"} text={"Login!"}/>
		</div>

	)

}

Login.propTypes = {
}

export default connect(
    (state) => ({ }),
    (dispatch) => ({ })
)(Login)
