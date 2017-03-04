import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { Button, Well, ListGroupItem } from 'react-bootstrap';
import { FormGroup, FormControl, ControlLabel } from 'react-bootstrap'

export const ArticleCard = ({text, image,
	author, timestamp, postComment, editArticle
}) => {
	const articleImage = image ? ( <img src={image}/> ) : (<div />);
	return (
		<ListGroupItem>
		<Well>
		<div> { author, timestamp } </div>
		{ image }
		<div> { text } </div>

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
	text: PropTypes.string.isRequired,
	author: PropTypes.string.isRequired
}

export default connect(
	(state, ownProps) => {
		return { 
			//image link might be null
			text: ownProps.articleJSON.text,
			image: ownProps.articleJSON.img,
			author: ownProps.articleJSON.author,
			timestamp: ownProps.articleJSON.date
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
