import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import NavButton from '../navigation/navButton'
export const Landing = ({ }, { }) => {
	return (
		<span>
		<b>'HELLO Landing!'</b>
		<NavButton redirectLocation={"MAIN_PAGE"} text={"Log in"}/>
		</span>
	)

}

Landing.propTypes = {
}

export default connect(
    (state) => ({ }),
    (dispatch) => ({ })
)(Landing)
