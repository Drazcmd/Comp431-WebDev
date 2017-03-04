import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import NavBar from '../navigation/navBar'
import Feed from './feed'
import WriteArticleBox from './writeArticleBox'
import UserStatus from './userStatus'
import { Grid, Row, Col } from 'react-bootstrap'

export const Following = ({ trumpImg, billImg, hillImg}) => {
	const profileImgWidth="100"
	const profileImgHeight="75"
	return (
	  	<Grid>
		  <Row>
		 	<img height={ profileImgHeight }
		 	 width={ profileImgWidth } src={ trumpImg } />
		  </Row>

		  <Row> 
		 	<img height={ profileImgHeight }
		 	 width={ profileImgWidth } src={ hillImg } />
		  </Row>

		  <Row> 
		 	<img height={ profileImgHeight }
		 	 width={ profileImgWidth } src={ billImg } />
		  </Row>
		  
		  <Row>
		 	<div> Follow new people here! </div>
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

Following.propTypes = {
}

export default connect(
    (state) => ({ 
    	trumpImg: state.profileImg,
    	billImg: state.billImg,
    	hillImg: state.hillImg
    }),
    (dispatch) => ({ })
)(Following)
