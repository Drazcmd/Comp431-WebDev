import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import Registration from './registration'
import Login from './login'
import { Grid, Row, Col, Alert, Button, Well,
Tooltip, OverlayTrigger } from 'react-bootstrap'
import NavBar from '../navigation/navBar'
import ErrorDisplay from './../notification/errorDisplay'
import { url, pingBackend, facebookLoginRedirect } from '../../serverRequest.js'
import { updateLocation, MAIN_PAGE } from './../../actions'

export const Landing = ({ switchView }) => {
    pingBackend()
    .then((isLoggedIn) => {
        if (isLoggedIn) {
            switchView(MAIN_PAGE)
        }
    })
    const tooltip = (
        <Tooltip id="tooltip">
            <strong> NOTE: </strong>
            Once you click this button, it will attempt to redirect to a facebook login/authorization page.
            It will then autmoatically redirect you back after completing login). 
        </Tooltip>
    )
 
    return (
        <Grid>
            <Row>
                <h1> CMD-BOOK </h1>
                <ErrorDisplay />
            </Row>
            <Row>
                <Col md={5}> <Registration /> </Col>
                <Col md={5}> 
                    <Row> 
                        <Login />
                    </Row>
                    <Row> <Well> 
                        <h4> FACEBOOK LOGIN: </h4>
                        <OverlayTrigger overlay={tooltip}> 
                        <Button name={"Facebook Login"} bsStyle="primary"
                         href={url + "/auth/facebook/login"}>
                            { "Use my facebook acccount!"}
                        </Button> 
                        </OverlayTrigger>

                    </Well> </Row>
                </Col>
            </Row>
        </Grid>
    )
}

Landing.propTypes = {
}

export default connect(
    (state) => ({}),
    (dispatch) => { 
        //We need to ensure we can use existing login auths
        //even after refreshing the page
        return {
            switchView: (targetLocation) => {
                updateLocation(targetLocation).then(
                    (resultingAction) => dispatch(resultingAction)
                )
            }
        }
    }
)(Landing)
