import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import NavBar from '../navigation/navBar'

export const Profile = ({ }, { }) => {
	return (
		<span>
		<NavBar />
		<b>'Your profile awaits:'</b>
		</span>
	)

}

Profile.propTypes = {
}

export default connect(
    (state) => ({ }),
    (dispatch) => ({ })
)(Profile)
