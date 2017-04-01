import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { Row, Button, FormGroup, FormControl,
 ControlLabel, Well } from 'react-bootstrap'
import { updateProfileData, dispError } from '../../actions'
import { validateData } from './profileValidation'
export const ProfileUpdateSection = ({ profileData, dispatchProfileUpdate }) => {
    let _email, _zip;
    const _dispatchProfileUpdate = () => {
        //(The ternary is to prevent crashing if something weird happended
        //(with the variables
        const newEmail = _email ? _email.value : null
        const newZip = _zip ? _zip.value : null
        dispatchProfileUpdate(newEmail, newZip)
    }
    return (
        <Well>
        <form> <FormGroup controlId="ProfileInfo">
            <ControlLabel> Email: {profileData.email} </ControlLabel>
            <FormControl type="text" placeholder="Update Email Here"
            inputRef={email => {_email = email }} />

            <br />
            <ControlLabel> Zip: {profileData.zip} </ControlLabel>
            <FormControl type="text" placeholder="Update Zipcode Here"
            inputRef={zip => {_zip = zip }} />
        </FormGroup> </form>

        <Button bsStyle="primary" onClick = { _dispatchProfileUpdate }>
            Update Information! 
        </Button>
        <br /> <br /> <br />

        <form> <FormGroup controlId="PasswordUpdate">
        <ControlLabel> Password: (Currently unimplemented! Password will not change) </ControlLabel>
        <FormControl type="text" placeholder="Update Password Here" />
        </FormGroup> </form>
        <Button> Coming Soon: Update Password! </Button>
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
            dispatchProfileUpdate: (newEmail, newZip) => {
                const validationResults = validateData(newEmail, newZip)
                if (validationResults.validity) {
                    const fieldValueObjs = [
                        {field: "email", value: newEmail},
                        {field: "zipcode", value: newZip}
                    ]
                    updateProfileData(fieldValueObjs)
                        .then((returnedAction) => {
                            dispatch(returnedAction)
                        })
                } else {
                    console.log("invalid profile update", validationResults.errorReason)
                    dispatch(dispError(validationResults.errorReason))
                }
            }
        }
    }
)(ProfileUpdateSection)
