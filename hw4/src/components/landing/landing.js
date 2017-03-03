import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import NavButton from '../navigation/navButton'
import Registration from './registration'
import Login from './login'
export const Landing = ({ }, { }) => {
	return (
		<div>
		<span>
		<b>'HELLO Landing!'</b>
		</span>
		<br /> <br /> <br />
		<Registration />
		<br /> <br /> <br />
		<Login />
		</div>


	)

}

Landing.propTypes = {
}

export default connect(
    (state) => ({ }),
    (dispatch) => ({ })
)(Landing)
