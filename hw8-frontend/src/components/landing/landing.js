import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import Registration from './Registration'
import Login from './Login'
import { Grid, Row, Col, Alert } from 'react-bootstrap'
import NavBar from '../navigation/navBar'
import ErrorDisplay from './../notification/errorDisplay'
import { isLoggedIn } from '../../serverRequest.js'
import { updateLocation, visModes } from './../../actions'

export const Landing = ({ switchView }) => {
    if (isLoggedIn()){
        switchView(visModes.MAIN_PAGE)
        return (<div> Already logged in! Fetching info... </div>)
    } else {
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
