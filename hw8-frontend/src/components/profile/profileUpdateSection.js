import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { Row, Button, FormGroup, FormControl,
 ControlLabel, Well } from 'react-bootstrap'
import { updateProfileData, updatePassword, dispError } from '../../actions'
import { validateData } from './profileValidation'
export const ProfileUpdateSection = ({ 
    profileData, dispatchProfileUpdate, dispatchPasswordUpdate 
}) => {
    let _email, _zip, _password;
    const _dispatchProfileUpdate = () => {
        //(The ternary is to prevent crashing if something weird happended
        //(with the variables
        const newEmail = _email ? _email.value : null
        const newZip = _zip ? _zip.value : null
        dispatchProfileUpdate(newEmail, newZip)
    }
    const _dispatchPasswordUpdate = () => {
        const newPassword = _password ? _password.value : null
        dispatchPasswordUpdate(newPassword)
    }
    return (
        <Well>
        <form> <FormGroup controlId="ProfileInfo">
            <ControlLabel name="email"> Email: {profileData.email} </ControlLabel>
            <FormControl name={"updateEmail"} type="text" placeholder="Update Email Here"
            inputRef={(email) => {_email = email }} />

            <br />
            <ControlLabel name="zipcode"> Zip: {profileData.zip} </ControlLabel>
            <FormControl name={"updateZipcode"} type="text" placeholder="Update Zipcode Here"
            inputRef={(zip) => {_zip = zip }} />
        </FormGroup> </form>

        <Button name={"profileUpdateBtn"} bsStyle="primary" onClick = { _dispatchProfileUpdate }>
            Update Information! 
        </Button>
        <br /> <br /> <br />

        <form> <FormGroup name="updatePassword" controlId="PasswordUpdate">
        <ControlLabel> 
        </ControlLabel>
        <FormControl name={"updatePassword"} type="text" placeholder="Update Password Here" 
         inputRef={(password) => {_password = password }} />
        </FormGroup> </form>
        <Button name={"passwordUpdateBtn"} bsStyle="danger" onClick = {_dispatchPasswordUpdate} >
            Update Your Password
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
                    dispatch(dispError(validationResults.errorReason))
                }
            },
            dispatchPasswordUpdate: (newPassword) => {
                updatePassword([{field: "password", value: newPassword}])
                .then((returnedAction) => {
                    dispatch(returnedAction)
                })
            }
        }
    }
)(ProfileUpdateSection)
