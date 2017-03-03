import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

export const Article = ({ displayText, displayImage, postComment }) => {
	const articleImage = displayImage ? 
		//(<Article imageLink={image} />) : (<div style={"display:none"} />)
		({displayImage}) : (<div />);
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
		console.log(ownProps.displayText)
		return { 
			//image link might be null
			displayText: ownProps.displayText,
			displayImage: ownProps.displayImage 
		} 
	},
	(dispatch) => {
    	return {
    		//Currently button does nothing!
    		postComment: () => ({})
    	}
    }
)(Article)
