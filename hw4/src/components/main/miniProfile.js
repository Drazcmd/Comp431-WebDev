import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { Well, Grid, Row, Col } from 'react-bootstrap'
//This component is the picture, status, and name of the 
//currently logged in user that appears on the main page
export const MiniProfile = ({ profileName, profileStatus, profileImgSrc}) => {
	const profileImgWidth="200"
	const profileImgHeight="133"
	return (
		<Well>
		<Col>
	 		<img height={ profileImgHeight }
	 	 	width={ profileImgWidth } src={ profileImgSrc } />
	 	</Col>
	 	<Col>
	 		<span>
		 	<h3> { profileName }, your current status is: </h3>
			<h2> '{ profileStatus }' </h2>
			</span>
		</Col>
		</Well>
	)
}

MiniProfile.propTypes = {
}

export default connect(
	(state) => ({ 
    	profileName: state.profileData.name,
    	profileStatus: state.profileData.status,
    	profileImgSrc: state.profileData.img
    }),
	(dispatch) => ({ })
)(MiniProfile)