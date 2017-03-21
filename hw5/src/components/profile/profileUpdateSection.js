import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { Row, Button, FormGroup, FormControl,
 ControlLabel, Well } from 'react-bootstrap'
import {updateProfileData} from '../../actions'

export const ProfileUpdateSection = ({ profileData, updateProfileData }) => {
	let _name, _email, _phoneNumber, _zip;
	
	const _updateProfileInfo = () => {
		console.log(_name, _email, _name.value, _email.value)
		updateProfileData({
			name:_name ? _name.value : profileData.name,
			email:_email ? _email.value : profileData.email,
			phoneNumber: _phoneNumber ? _phoneNumber.value : profileData.email,
			zip: _zip ? _zip.value : profileData.zip
		})
	}
	return (
		<Well>
		<form> <FormGroup controlId="ProfileInfo">
		  <ControlLabel> Name: {profileData.name} </ControlLabel>
		  <FormControl type="text" placeholder="Update Name Here"
		   inputRef={name => {_name = name }} />

		  <br/ >
		  <ControlLabel> Email: {profileData.email} </ControlLabel>
		  <FormControl type="text" placeholder="Update Email Here"
		   inputRef={email => {_email = email }} />

		  <br/ >
		  <ControlLabel> Phone Number: {profileData.phoneNumber} </ControlLabel>
		  <FormControl type="text" placeholder="Update Phone Number Here"
		   inputRef={phoneNumber => {_phoneNumber = phoneNumber }} />

		  <br/ >
		  <ControlLabel> Zip: {profileData.zip} </ControlLabel>
		  <FormControl type="text" placeholder="Update Zipcode Here"
		   inputRef={zip => {_zip = zip }} />
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
