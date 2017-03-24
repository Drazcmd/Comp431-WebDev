import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import NavButton from '../navigation/navButton'
import { delegateLogout, delegateLogin } from '../landing/authActions'
import { FormGroup, FormControl, ControlLabel, Well, Button } from 'react-bootstrap'
export const Login = ({ dispatchLogin }) => {
    let _username, _password
    const _login = () => {
        dispatchLogin(_username.value, _password.value)
    }
    return (
        <Well>
        <h4>LOGIN: </h4>
        <FormGroup 
            controlId="Login"
        >
            <ControlLabel> Username </ControlLabel>
            <FormControl 
                type="text"
                placeholder="Enter Username Here"
                inputRef={username=> {_username = username}}
            />
            <ControlLabel> Password </ControlLabel>
            <FormControl 
                type="text"
                placeholder="Enter Password Here"
                inputRef={password=> {_password = password}}
            />

        </FormGroup>
            <Button bsStyle="primary" onClick={ _login }>
                {"Login!"}
            </Button>
    
        </Well>

    )

}

Login.propTypes = {
}

export default connect(
    (state) => ({ }),
    (dispatch) => { 
        return {
            dispatchLogin: (username, password) => {
                dispatch(delegateLogin(username, password))
            }
        }
    }
)(Login)
