import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { Grid, Row, Col } from 'react-bootstrap'
import { Button, Well, ListGroupItem } from 'react-bootstrap';

export const Followee = ({ name, status, imgSrc}) => {
	const profileImgWidth="100"
	const profileImgHeight="75"
	return (
		<Well>
			<h4> {name}'s Status: '{status}' </h4>
		 	<img height={ profileImgHeight }
		 	 width={ profileImgWidth } src={ imgSrc } />
		 	<Button bsSize="small"> Remove User </Button>
		</Well>
	)
}

Followee.propTypes = {
	name: PropTypes.string.isRequired,
	status: PropTypes.string.isRequired,
	imgSrc: PropTypes.string.isRequired,
}
export default connect(
    (state, ownProps) => ({ 
    	name: ownProps.data.name,
    	status: ownProps.data.status,
    	imgSrc: ownProps.data.img
    }),
    (dispatch) => ({ })
)(Followee)
