import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import NavBar from '../navigation/navBar'
import ProfileImgSection from './profileImgSection'
import ProfileUpdateSection from './profileUpdateSection'
import { Grid, Row, Col } from 'react-bootstrap'
import { Button, FormGroup, FormControl,
 ControlLabel, Well } from 'react-bootstrap'
import ErrorDisplay from './../notification/errorDisplay'

export const Profile = ({ profileData, updateProfileData, msg }) => {
    return (
        <Grid>
        <Row> <NavBar /> </Row>
        <br />
        <Row> <ProfileImgSection /> </Row>
        <br />  
        <Row> <Col md={3}><ErrorDisplay /></Col> </Row>
        <Row>
            <h3>Update your info here: </h3>
            <ProfileUpdateSection />
        </Row>
        </Grid>
    )

}

Profile.propTypes = {
}

export default connect(
    (state) => ({ 
        profileData: state.profileData,
        msg: state.globalErrorMessage
    }),
    (dispatch) => ({})
)(Profile)