import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import NavBar from '../navigation/navBar'
import { Grid, Row, Col } from 'react-bootstrap'

export const Profile = ({ }, { }) => {
	return (
		<Grid>
		<Row>
			<NavBar />
		</Row>
		<Row>
			<b>'Your profile awaits:'</b>
		</Row>
		</Grid>
	)

}

Profile.propTypes = {
}

export default connect(
    (state) => ({ }),
    (dispatch) => ({ })
)(Profile)
