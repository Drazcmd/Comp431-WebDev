import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

//import { updateLocation } from './actions'

export const Profile = ({ }, { }) => {
	return (
		<span>
		<b>"HELLO Profile"</b>
		</span>
	)

}

Profile.propTypes = {
}

export default connect(
    (state) => ({ }),
    (dispatch) => ({ })
)(Profile)
