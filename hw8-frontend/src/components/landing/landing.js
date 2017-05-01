import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import Registration from './registration'
import Login from './login'
import { Grid, Row, Col, Alert } from 'react-bootstrap'
import NavBar from '../navigation/navBar'
import ErrorDisplay from './../notification/errorDisplay'
import { pingBackend } from '../../serverRequest.js'
import { updateLocation, MAIN_PAGE } from './../../actions'

export const Landing = ({ switchView }) => {
    console.log('hello!')
    pingBackend()
    .then((isLoggedIn) => {
        if (isLoggedIn) {
            console.log("Should be switching now!")
            switchView(MAIN_PAGE)
        }
    })
    return (
        <Grid>
            <Row>
                <h1> CMD-BOOK </h1>
                <ErrorDisplay />
            </Row>
            <Row>
                <Col md={5}> <Registration /> </Col>
                <Col md={5}> <Login /> </Col>
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
