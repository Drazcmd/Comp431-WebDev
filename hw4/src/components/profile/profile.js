import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import NavBar from '../navigation/navBar'

export const Profile = ({ }, { }) => {
	return (
		<span>
		<b>'Your profile awaits:'</b>
		<NavBar />
		</span>
	)

}

Profile.propTypes = {
}

export default connect(
    (state) => ({ }),
    (dispatch) => ({ })
)(Profile)
