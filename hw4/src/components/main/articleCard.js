import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { Button, Well, ListGroupItem } from 'react-bootstrap';
import { FormGroup, FormControl, ControlLabel } from 'react-bootstrap'

export const ArticleCard = ({ displayText, displayImage, postComment, editArticle }) => {
	const articleImage = displayImage ? ( <img src={displayImage}/> ) : (<div />);
	return (
		<ListGroupItem>
		<Well>
		{ articleImage }
		<div> { displayText } </div>

		<FormGroup>
		  <ControlLabel />
		  <FormControl type="text"placeholder="Enter Comment Here"/>
		</FormGroup>

		<Button bsSize="small" onClick = { postComment }> { "Post Comment" }  </Button>
		<Button bsSize="small" onClick = { editArticle }> { "Edit Article" }  </Button>
		</Well>
		</ListGroupItem>
	)
// input type="text" defaultValue={"Comment Here "} />
}

ArticleCard.propTypes = {
	displayText: PropTypes.string.isRequired
}

export default connect(
	(state, ownProps) => {
		return { 
			//image link might be null
			displayText: ownProps.articleJSON.text,
			displayImage: ownProps.articleJSON.img
		} 
	},
	(dispatch) => {
    	return {
    		//Currently button does nothing!
    		postComment: () => ({}),
    		editArticle: () => ({})
    	}
    }
)(ArticleCard)
