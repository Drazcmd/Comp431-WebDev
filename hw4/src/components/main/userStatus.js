import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
export const UserStatus = ({ }) => {
	//Like real facebook, should be able to refresh main page or profile by
	//clicking on the navigation button (when logged in)
	return (
		<div> MY STATUS IS A-OKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKK! </div>
	)
}

UserStatus.propTypes = {
}

export default connect(
	(state) => ({ }),
	(dispatch) => ({ })
)(UserStatus)