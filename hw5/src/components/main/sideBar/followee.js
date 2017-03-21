import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { Grid, Row, Col } from 'react-bootstrap'
import { Button, Well, ListGroupItem } from 'react-bootstrap';
import { removeFollowee } from '../../../actions'

export const Followee = ({
	name, status, imgSrc, removeFollowee
}) => {
	const profileImgWidth="100"
	const profileImgHeight="75"
	const _removeFollowee = () => {
		removeFollowee(name)
	}
	return (
		<Well>
			<h4> {name}'s Status: '{status}' </h4>
		 	<img height={ profileImgHeight }
		 	 width={ profileImgWidth } src={ imgSrc } />
		 	<Button bsSize="small" onClick={_removeFollowee}> Remove User </Button>
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
    (dispatch) => { 
    	return {
    		removeFollowee: (name) => {
    			dispatch(removeFollowee(name))
    		}
    	}
    }
)(Followee)
