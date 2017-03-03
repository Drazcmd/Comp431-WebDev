import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

export const Article = ({ displayText, displayImage, postComment }) => {
	console.log(displayText)
	console.log(displayImage)
	const articleImage = displayImage ? ( <div> { displayImage } </div> ) : (<div />);
	return (
		<span>
		<b>'Article here! '</b>
		{ articleImage }
		<div> { displayText } </div>
		<input type="text" defaultValue={"Comment: "} /> 
		<button onClick = { postComment }> { "Post Comment" }  </button>
		</span>
	)
// input type="text" defaultValue={"Comment Here "} />
}

Article.propTypes = {
	displayText: PropTypes.string.isRequired
}

export default connect(
	(state, ownProps) => {
		console.log(ownProps)
		console.log(ownProps.articleJSON)
		console.log(ownProps.articleJSON.text)
		console.log(ownProps.articleJSON.img)
		return { 
			//image link might be null
			displayText: ownProps.articleJSON.text,
			displayImage: ownProps.articleJSON.img
		} 
	},
	(dispatch) => {
    	return {
    		//Currently button does nothing!
    		postComment: () => ({})
    	}
    }
)(Article)
