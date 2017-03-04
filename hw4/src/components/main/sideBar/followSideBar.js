import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { Grid, Row, Col } from 'react-bootstrap'
import NewFollowers from './NewFollowers'
import Followee from './Followee'
export const followSideBar = ({ trump, bill, hill}) => {
	const profileImgWidth="100"
	const profileImgHeight="75"
	return (
	  	<Grid>
		  <Row>
		  	<Followee data={ trump } />
		  </Row>

		  <Row> 
		  	<Followee data={ bill } />
		  </Row>

		  <Row> 
		  	<Followee data={ hill }/>
		  </Row>
		  
		  <Row>
		 	<div> Follow new people here! </div>
		 	<NewFollowers/ >
		  </Row>
	 	</Grid>
	)
}

followSideBar.propTypes = {
}
export default connect(
    (state) => ({ 
    	trump: state.trump,
    	bill: state.bill,
    	hill: state.hill
    }),
    (dispatch) => ({ })
)(followSideBar)
