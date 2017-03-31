import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import NavButton from '../navigation/navButton'
import { Well, FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap'
import { delegateRegistration } from './authActions'
export const Registration = ({ registerUser }) => {
    let _firstName, _lastName, _username, _password
    const _register = () => {
        const userInfo = {
            "firstName": _firstName.value,
            "lastName": _lastName.value,
            "username": _username.value,
            "password": _password.value
        }   
        registerUser(userInfo)
    }
    return (
        <Well>
        <h4>REGISTER A NEW ACCOUNT: </h4>
        <FormGroup controlId="Registration">
            <ControlLabel> First Name</ControlLabel>
            <FormControl 
                type="text"
                placeholder="Enter Text Here"
                inputRef={firstName=> {_firstName = firstName}}
            />
            <ControlLabel> Last Name</ControlLabel>
            <FormControl 
                type="text"
                placeholder="Enter Text Here"
                inputRef={lastName=> {_lastName = lastName}}
            />
            <ControlLabel> Username </ControlLabel>
            <FormControl 
                type="text"
                placeholder="Enter Text Here"
                inputRef={username=> {_username = username}}
            />
            <ControlLabel> Password </ControlLabel>
            <FormControl 
                type="text"
                placeholder="Enter Text Here"
                inputRef={password=> {_password = password}}
            />
        </FormGroup>
        <Button bsStyle="primary" onClick={_register}> 
            {"Create New Account!"} 
        </Button>
        </Well>

    )

}

Registration.propTypes = {
}

export default connect(
    (state) => {
        return {
            registrationMessage: state.registrationMessage
        }
    },
    (dispatch) => {
        return {
            //Currently registration is non-functional, even though
            //we are validating the user's input
            registerUser: (userInfo) => {
                dispatch(delegateRegistration(userInfo))
            }
        }
    }
)(Registration)
