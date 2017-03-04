import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { Grid, Row, Col } from 'react-bootstrap'
import { Button, Well, ListGroupItem } from 'react-bootstrap';

export const Followee = ({ imgSrc }) => {
	const profileImgWidth="100"
	const profileImgHeight="75"
	return (
		<Well>
		 	<img height={ profileImgHeight }
		 	 width={ profileImgWidth } src={ imgSrc } />
		 	<Button bsSize="small"> Remove User </Button>
		</Well>
	)
}

Followee.propTypes = {
	imgSrc: PropTypes.string.isRequired,
}
export default connect(
    (state) => ({ 
    	imgSrc: state.profileImg,
    }),
    (dispatch) => ({ })
)(Followee)
