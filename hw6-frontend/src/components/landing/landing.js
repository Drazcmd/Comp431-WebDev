import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import Registration from './Registration'
import Login from './Login'
import { Grid, Row, Col, Alert } from 'react-bootstrap'
import NavBar from '../navigation/navBar'
import ErrorDisplay from './../notification/errorDisplay'

export const Landing = ({}) => {
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
    (dispatch) => ({ })
)(Landing)
