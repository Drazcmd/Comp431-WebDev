import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { Row, Button, FormGroup, FormControl,
 ControlLabel, Well } from 'react-bootstrap'

export const ProfileUpdateSection = ({ profileData, updateProfileData }) => {
	let liveData = {...profileData}
	const _updateProfileInfo = () => {
		//updateProfileData(liveData)
		return
	}
	return (
		<Well> 
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

		<br/ > <br /> <br />

		<Button bsStyle="primary" onClick = { _updateProfileInfo }>
		  Update Information! 
		</Button>
		</Well>
	)
}

ProfileUpdateSection.propTypes = {
}
export default connect(
	(state) => ({ 
    	profileData: state.profileData
    }), (dispatch) => {
 		return {
			updateProfileInfo: (newData) => {
				console.log("updating Data")
				dispatch(updateProfileData(newData))
			}
		}
	}
)(ProfileUpdateSection)
