import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import NavBar from '../navigation/navBar'
import ProfileImgSection from './profileImgSection'
import { Grid, Row, Col } from 'react-bootstrap'
import { Button, FormGroup, FormControl,
 ControlLabel, Well } from 'react-bootstrap'

export const Profile = ({ profileData, updateProfileData }) => {
	const profileImgWidth="500"
	const profileImgHeight="300"
	let liveData = {...profileData}
	const _updateProfileInfo = () => {
		//updateProfileData(liveData)
		return
	}
	return (
		<Grid>
		<Row>
			<NavBar />
		</Row>
		<br />
		<ProfileImgSection />
	 	<Row> <Well>
	  	<b> Date of Birth: {profileData.dob} (Can't be updated) </b>
	  	<br />
		<h3>Update your info here: </h3>

		<FormGroup controlId="ProfileInfo">
		  <ControlLabel> Name: {profileData.name} </ControlLabel>
		  <FormControl type="text" placeholder="Update Name Here"/>
		  <br/ >
		  <ControlLabel> Name: {profileData.email} </ControlLabel>
		  <FormControl type="text" placeholder="Update Email Here"/>
		  <br/ >
		  <ControlLabel> Name: {profileData.phoneNumber} </ControlLabel>
		  <FormControl type="text" placeholder="Update Phone Number Here"/>
		  <br/ >
		  <ControlLabel> Name: {profileData.zip} </ControlLabel>
		  <FormControl type="text" placeholder="Update Zipcode Here"/>
		</FormGroup>

		</Well></Row>
		<Row>
		<Button bsStyle="primary" onClick = { _updateProfileInfo }>
		  Update Information! 
		</Button>
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
 	(dispatch) => {
 		return {
			updateProfileInfo: (newData) => {
				console.log("updating Data")
				dispatch(updateProfileData(newData))
			}
		}
	}
)(Profile)