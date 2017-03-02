import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import NavButton from '../buttons/navButton'

export const Profile = ({ }, { }) => {
	return (
		<span>
		<b>'Your profile awaits:'</b>
		<NavButton redirectLocation={"LANDING_PAGE"} />
		<NavButton redirectLocation={"MAIN_PAGE"} />
		</span>
	)

}

Profile.propTypes = {
}

export default connect(
    (state) => ({ }),
    (dispatch) => ({ })
)(Profile)
