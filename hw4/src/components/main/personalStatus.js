import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
export const PersonalStatus = ({ status }) => {
	//Like real facebook, should be able to refresh main page or profile by
	//clicking on the navigation button (when logged in)
	return (
		<h3> MY CURRENT STATUS: { status } </h3>
	)
}

PersonalStatus.propTypes = {
}

export default connect(
	(state) => { 
		return {
			status: state.userStatus
		}
	},
	(dispatch) => ({ })
)(PersonalStatus)