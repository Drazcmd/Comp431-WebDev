import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import NavButton from '../navigation/navButton'
import { Well, FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap'
import { delegateRegistration } from './authActions'
export const Registration = ({ registerUser }) => {
    let _firstName, _lastName, _zipcode, _email, _username, _password
    const _register = () => {
        const userInfo = {
            "username": _username.value,
            "password": _password.value,
            "email": _email.value,
            "zipcode": _zipcode.value
        }   
        registerUser(userInfo)
    }
    return (
        <Well>
        <h4>REGISTER A NEW ACCOUNT: </h4>
        <FormGroup>
            <ControlLabel> Username </ControlLabel>
            <FormControl 
                name="regUsername"
                type="text"
                placeholder="Enter Text Here"
                inputRef={username=> {_username = username}}
            />
            <ControlLabel> Password </ControlLabel>
            <FormControl 
                name="regPassword"
                type="text"
                placeholder="Enter Text Here"
                inputRef={password=> {_password = password}}
            />
            <ControlLabel> Email </ControlLabel>
            <FormControl 
                name="regEmail"
                type="text"
                placeholder="Enter Text Here"
                inputRef={email => {_email = email}}
            />

            <ControlLabel> Zipcode </ControlLabel>
            <FormControl 
                name="regZipcode"
                type="text"
                placeholder="Enter Text Here"
                inputRef={zipcode=> {_zipcode = zipcode}}
            />
        </FormGroup>
        <Button name="regButton" bsStyle="primary" onClick={_register}> 
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
            registerUser: (userInfo) => {
                dispatch(delegateRegistration(userInfo))
            }
        }
    }
)(Registration)
