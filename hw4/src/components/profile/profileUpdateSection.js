import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { Row, Button, FormGroup, FormControl,
 ControlLabel, Well } from 'react-bootstrap'
import {updateProfileData} from '../../actions'

export const ProfileUpdateSection = ({ profileData, updateProfileData }) => {
	let liveData = {
		name: profileData.name,
		email: profileData.email,
		phoneNumber: profileData.phoneNumber,
		zip: profileData.zip
	}
	function _liveName (e) {
		liveData.name=e.target.value;
	}	
	function _liveEmail(e) {
		liveData.email=e.target.value;
	}	
	function _livePhoneNumber(e) {
		liveData.phoneNumber=e.target.value;
	}	
	function _liveZip(e) {
		liveData.zip=e.target.value;
	}	
	const _updateProfileInfo = () => {
		updateProfileData(liveData)
	}
	return (
		<Well>
		<form> <FormGroup controlId="ProfileInfo">
		  <ControlLabel> Name: {profileData.name} </ControlLabel>
		  <FormControl type="text" placeholder="Update Name Here"
		   onChange={ _liveName } />

		  <br/ >
		  <ControlLabel> Email: {profileData.email} </ControlLabel>
		  <FormControl type="text" placeholder="Update Email Here"
		   onChange={ _liveEmail } />

		  <br/ >
		  <ControlLabel> Phone Number: {profileData.phoneNumber} </ControlLabel>
		  <FormControl type="text" placeholder="Update Phone Number Here"
		   onChange={ _livePhoneNumber} />

		  <br/ >
		  <ControlLabel> Zip: {profileData.zip} </ControlLabel>
		  <FormControl type="text" placeholder="Update Zipcode Here"
		   onChange={ _liveZip} />
		</FormGroup> </form>

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
			updateProfileData: (newData) => {
				dispatch(updateProfileData(newData))
			}
		}
	}
)(ProfileUpdateSection)
