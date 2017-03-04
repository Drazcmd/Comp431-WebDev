import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import NavBar from '../navigation/navBar'
import Feed from './feed'
import WriteArticleBox from './writeArticleBox'
import UserStatus from './userStatus'
import { Grid, Row, Col } from 'react-bootstrap'

export const Main = ({ profileImgSrc }) => {
	const profileImgWidth="100"
	const profileImgHeight="75"
	return (
	  	<Grid>
		  <Row>
		 	<NavBar />
		  </Row>

		  <Row> 
		 	<Col md={5}> 
		 	<img height={ profileImgHeight }
		 	 width={ profileImgWidth } src={ profileImgSrc } />
		 	</Col>
		 	<Col md={5}> <UserStatus /> </Col> 
		  </Row>

		  <br /> <br /> <br />

		  <Row> 
		 	<Col md={7}> <Feed /> </Col>
		 	<Col md={3}> <div> People following go here!  </div> </Col>
		  </Row>
		  
		  <Row>
		 	<div> ADD/EDIT/POST NEW ARTICLE HERE!!! </div>
		 	<WriteArticleBox />
		  </Row>
//TODO:
//Profile picture somewhere
//User status headline (prominently idsplayed)
//Sort articles
//New article area
//Public new article
//clear new artile area
//upload image (open file picker)
//search bar filters by author and text, but not article id or article date
//Sidebar with at least 3 followed users
//List of users being followed
	//List has for each user profile pic, display/account names, status headlines
	//These can all be hardcoded, only need like 3 of each	
	 	</Grid>
	)
}

Main.propTypes = {
}

export default connect(
    (state) => ({ 
    	profileImgSrc: state.profileImg,
    }),
    (dispatch) => ({ })
)(Main)
