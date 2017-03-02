import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import NavButton from '../buttons/navButton'
export const Landing = ({ }, { }) => {
	return (
		<span>
		<b>'HELLO Landing!'</b>
		<NavButton redirectLocation={"MAIN_PAGE"} />
		<NavButton redirectLocation={"PROFILE_PAGE"} />
		</span>
	)

}

Landing.propTypes = {
}

export default connect(
    (state) => ({ }),
    (dispatch) => ({ })
)(Landing)
