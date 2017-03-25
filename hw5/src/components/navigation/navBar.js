import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import NavButton from './navButton'
import { delegateLogout } from './../landing/authActions'
import { ButtonToolbar, Button } from 'react-bootstrap'
export const NavBar = ({ dispatchLogout }) => {
    //Like real facebook, should be able to refresh main page or profile by
    //clicking on the navigation button (when logged in)
    return (
        <ButtonToolbar> 
        <NavButton redirectLocation={"MAIN_PAGE"} text={"Main Page"}/>
        <NavButton redirectLocation={"PROFILE_PAGE"} text={"Profile"} />
        <Button bsStyle="primary" onClick = { dispatchLogout }> Logout </Button>
        </ButtonToolbar>
    )
}

NavBar.propTypes = {
}

export default connect(
    (state) => ({ }),
    (dispatch) => {
        //Logout is special - has to be a custom button unfortunately,
        //since it dispatches a LOGOUT rather than a normal loc change
        return {
            dispatchLogout: () => {
                delegateLogout().then(
                    (resultingAction) => dispatch(resultingAction)
                )
            }
        }
     }
)(NavBar)
