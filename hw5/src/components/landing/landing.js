import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import Registration from './Registration'
import Login from './Login'
import ErrorDisplay from './../textDisplay/errorDisplay'
import { Grid, Row, Col } from 'react-bootstrap'

export const Landing = ({ }, { }) => {
	return (
	 	<Grid>
	 		<Row> <ErrorDisplay /> </Row>
	 	  <Row>
	 	    <h1> ELECT-BOOK </h1>
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
    (state) => ({ }),
    (dispatch) => ({ })
)(Landing)
