import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import NavBar from '../navigation/navBar'
import ProfileImgSection from './profileImgSection'
import ProfileUpdateSection from './profileUpdateSection'
import { Grid, Row, Col } from 'react-bootstrap'
import { Button, FormGroup, FormControl,
 ControlLabel, Well } from 'react-bootstrap'

export const Profile = ({ profileData, updateProfileData }) => {
	return (
		<Grid>
		<Row> <NavBar /> </Row>
		<br />
		<Row> <ProfileImgSection /> </Row>

		<br />	
	 	<Row>
		  	<b> Date of Birth: {profileData.dob} (Cannot be updated) </b>
		  	<br />
			<h3>Update your info here: </h3>
			<ProfileUpdateSection />
		</Row>
		</Grid>
	)

}

Profile.propTypes = {
}

export default connect(
	(state) => ({ 
    	profileData: state.profileData
    }),
 	(dispatch) => ({})
)(Profile)