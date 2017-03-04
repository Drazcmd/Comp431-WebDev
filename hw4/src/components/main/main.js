import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import NavBar from '../navigation/navBar'
import Feed from './feed'
import WriteArticleBox from './writeArticleBox'
import MiniProfile from './miniProfile'
import FollowSideBar from './Sidebar/followSideBar'
import { Grid, Row, Col } from 'react-bootstrap'

export const Main = ({ }) => {
	return (
	  	<Grid>
		  <Row>
		 	<NavBar />
		  </Row>
		  <br />
		  <Row> 
		  	<MiniProfile />
		  </Row>
		  <br />
		  <Row>
		 	<WriteArticleBox />
		  </Row>

		  <br /> <br /> <br />

		  <Row> 
		 	<Col md={7}> <Feed /> </Col>
		 	<Col md={3}> <FollowSideBar/> </Col>
		  </Row>
		  
//TODO:
//Publish new article
//clear new artile area
//search bar filters by author and text, but not article id or article date
//Update//add to the sidebar
	 	</Grid>
	)
}

Main.propTypes = {
}

export default connect(
    (state) => ({ }),
    (dispatch) => ({ })
)(Main)
