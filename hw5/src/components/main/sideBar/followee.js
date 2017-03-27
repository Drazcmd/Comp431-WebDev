import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { Grid, Row, Col } from 'react-bootstrap'
import { Button, Well, ListGroupItem } from 'react-bootstrap';
import { removeFollowee, updateShownArticles, VisModes } from '../../../actions'

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
	imgSrc: PropTypes.string.isRequired
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
 				return removeFollowee(name).then((returnedAction) => {
 					dispatch(returnedAction)
 					//we also need to refresh the articles so that
 					//any belonging to the folowee are removed
 					return updateShownArticles(VisModes.REFRESH)
 				}).then((articleRefreshAction) => {
 					dispatch(articleRefreshAction)
 				})
    		}
    	}
    }
)(Followee)
