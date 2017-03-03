import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { Button } from 'react-bootstrap';
import { Well } from 'react-bootstrap';

export const ArticleCard = ({ displayText, displayImage, postComment, editArticle }) => {
	const articleImage = displayImage ? ( <img src={displayImage}/> ) : (<div />);
	return (
		<Well>
		{ articleImage }
		<div> { displayText } </div>
		<input type="text" defaultValue={"Comment: "} /> 
		<Button bsSize="small" onClick = { postComment }> { "Post Comment" }  </Button>
		<Button bsSize="small" onClick = { editArticle }> { "Edit Article" }  </Button>
		</Well>
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
