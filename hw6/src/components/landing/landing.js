import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import Registration from './Registration'
import Login from './Login'
import { Grid, Row, Col, Alert } from 'react-bootstrap'
import NavBar from '../navigation/navBar'

export const Landing = ({msg}) => {
    return (
        <Grid>
            <Row>
                <h1> ELECT-BOOK </h1>
                <Alert> {msg} </Alert>
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
    (state) => { 
        return {
            msg: state.globalErrorMessage
        }
    },
    (dispatch) => ({ })
)(Landing)
