import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { Grid, Row, Col, Alert } from 'react-bootstrap'
import NewFollowers from './NewFollowers'
import Followee from './Followee'
import ErrorDisplay from './../../notification/errorDisplay'
export const followSideBar = ({ followees, msg }) => {
    const profileImgWidth="100"
    const profileImgHeight="75"
    return (
        <Grid>
        {
            followees.map((followee, index) => (
                <Row key={index}>
                <Followee data={followee} key={index} />
                </Row>
            ))
        }
        <Row>
             <div> Follow new people here! </div>
             <NewFollowers />
            <ErrorDisplay />
         </Row>

        </Grid>
    )
}

followSideBar.propTypes = {
}
export default connect(
    (state) => ({ 
        followees: state.followees,
        msg: state.globalErrorMessage 
    }),
    (dispatch) => ({ })
)(followSideBar)
