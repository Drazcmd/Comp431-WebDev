import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { Grid, Row, Col } from 'react-bootstrap'
import NewFollowers from './NewFollowers'
import Followee from './Followee'
export const followSideBar = ({ trumpImg, billImg, hillImg}) => {
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
		 	<NewFollowers/ >
		  </Row>

		  <Row>
		  	<Followee />
		  </Row>
	 	</Grid>
	)
}

followSideBar.propTypes = {
	trumpImg: PropTypes.string.isRequired,
	billImg: PropTypes.string.isRequired,
	hillImg: PropTypes.string.isRequired,
}
export default connect(
    (state) => ({ 
    	trumpImg: state.profileImg,
    	billImg: state.billImg,
    	hillImg: state.hillImg
    }),
    (dispatch) => ({ })
)(followSideBar)
