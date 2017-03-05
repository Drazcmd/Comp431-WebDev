import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { Row, FormGroup, FormControl, 
	ControlLabel, Well } from 'react-bootstrap'

export const ProfileImgSection = ({ profileImgSrc }) => {
	const profileImgWidth="500"
	const profileImgHeight="300"
	return (
		<Row> <Well>
	 		<img height={ profileImgHeight }
	 	 	width={ profileImgWidth } src={ profileImgSrc} />
			<form> <FormGroup controlId="pictureUpdateForm">
				<ControlLabel> Upload a new profile image: </ControlLabel>
			 	<FormControl type="file" />
			</FormGroup> </form>
	 	</Well> </Row>
	)
}

ProfileImgSection.propTypes = {
}

export default connect(
	(state) => ({ 
		profileImgSrc: state.profileData.img
    }), (dispatch) => ({
	})
)(ProfileImgSection)