import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { profile } from '../Profile/profile'

//import { updateLocation } from './actions'

export const ButtonToProfile = ({ }, { }) => {
	return (
		<span>
		<b>'HELLO Landing!'</b>
		</span>
	)

}

ButtonToProfile.propTypes = {
}

export default connect(
    (state) => ({ }),
    (dispatch) => ({ })
)(ButtonToProfile)
