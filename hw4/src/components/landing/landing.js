import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import Registration from './registration'
import Login from './login'
import { Grid, Row, Col } from 'react-bootstrap'

export const Landing = ({ }, { }) => {
	return (
	 	<Grid>
	  	  <Row>
			<b>'HELLO Landing!'</b>
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
