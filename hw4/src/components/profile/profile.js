import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import NavBar from '../navigation/navBar'
import { Grid, Row, Col } from 'react-bootstrap'
import { FormGroup, FormControl, ControlLabel, Well } from 'react-bootstrap'

export const Profile = ({ profileData }) => {
	const profileImgWidth="500"
	const profileImgHeight="300"
	return (
		<Grid>
		<Row>
			<NavBar />
		</Row>
		<br />
		<Row> <Well>
	 		<img height={ profileImgHeight }
	 	 	width={ profileImgWidth } src={ profileData.img } />
			<form> <FormGroup controlId="pictureUpdateForm">
				<ControlLabel> Upload a new profile image: </ControlLabel>
			 	<FormControl type="file" />
			</FormGroup> </form>
	 	</Well> </Row>

	 	<Row> <Well>
		<h3>Update your info here: </h3>
		<FormGroup 
		  controlId="IDK"
		  >
		  <ControlLabel> Username </ControlLabel>
		  <FormControl 
		  	type="text"
		  	placeholder="Update Name Here"
		  />
		  <ControlLabel> Password </ControlLabel>
		  <FormControl 
		  	type="text"
		  	placeholder="Update other stuffs Here"
		  />
		</FormGroup>
		</Well>
		</Row>
		</Grid>
	)

}

Profile.propTypes = {
}

export default connect(
	(state) => ({ 
    	profileData: state.profileData
    }),
    (dispatch) => ({ })
)(Profile)