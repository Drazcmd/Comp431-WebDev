import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { Row, Button, FormGroup, FormControl,
 ControlLabel, Well } from 'react-bootstrap'
import { updateProfileData } from '../../actions'

export const ProfileUpdateSection = ({ profileData, dispatchProfileUpdate }) => {
    let _email, _zip;
    const _dispatchProfileUpdate = () => {
        //(The ternary is to prevent updating with values of empty string)
        console.log("email tracker value:", _email)
        const newEmail = _email.value ? _email.value : profileData.email
        console.log("email value to be updated to:", newEmail)
        
        console.log("zip tracker value:", _zip)
        const newZip = _zip.value ? _zip.value : profileData.zip
        console.log("zip value to be updated to:", newZip)
        dispatchProfileUpdate([
            {field: "email", value: newEmail},
            {field: "zipcode", value: newZip}
        ])
    }
    return (
        <Well>
        <form> <FormGroup controlId="ProfileInfo">
            <ControlLabel> Email: {profileData.email} </ControlLabel>
            <FormControl type="text" placeholder="Update Email Here"
            inputRef={email => {_email = email }} />

            <br/ >
            <ControlLabel> Zip: {profileData.zip} </ControlLabel>
            <FormControl type="text" placeholder="Update Zipcode Here"
            inputRef={zip => {_zip = zip }} />
        </FormGroup> </form>

        <br/ > <br /> <br />

        <Button bsStyle="primary" onClick = { _dispatchProfileUpdate }>
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
            dispatchProfileUpdate: (fieldValueObjs) => {
                updateProfileData(fieldValueObjs).then((returnedAction) => {
                    dispatch(returnedAction)
                })
            }
        }
    }
)(ProfileUpdateSection)
