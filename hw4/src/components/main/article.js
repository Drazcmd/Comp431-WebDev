import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

export const Article = ({ displayText, displayImage, postComment, editArticle }) => {
	const articleImage = displayImage ? ( <img src={displayImage}/> ) : (<div />);
	return (
		<span>
		{ articleImage }
		<div> { displayText } </div>
		<input type="text" defaultValue={"Comment: "} /> 
		<button onClick = { postComment }> { "Post Comment" }  </button>
		<button onClick = { editArticle }> { "Edit Article" }  </button>
		</span>
	)
// input type="text" defaultValue={"Comment Here "} />
}

Article.propTypes = {
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
)(Article)
