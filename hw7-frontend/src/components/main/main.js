import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import NavBar from '../navigation/navBar'
import Feed from './feed'
import WriteArticleBox from './writeArticleBox'
import MiniProfile from './miniProfile'
import FilterArticlesBox from './FilterArticlesBox'
import FollowSideBar from './Sidebar/followSideBar'
import { Grid, Row, Col, Alert } from 'react-bootstrap'

export const Main = ({ msg }) => {
    return (
        <Grid>
            <Row>
                <Col md={3}><NavBar /> </Col>
            </Row>
            <br />

            <Row> <MiniProfile /> </Row>
            <br />

            <Row>
                <WriteArticleBox md={5}/>
                <FilterArticlesBox md={5} />
            </Row>
            <br /> <br /> <br />

            <Row> 
                <Col md={7}> <Feed /> </Col>
                <Col md={3}> <FollowSideBar/> </Col>
            </Row>          
        </Grid>
    )
}

Main.propTypes = {
}

export default connect(
    (state) => ({  }),
    (dispatch) => ({ })
)(Main)
