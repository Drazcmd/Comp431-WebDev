import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import ArticleCard from './articleCard'
import { ListGroup, ListGroupItem } from 'react-bootstrap'
export const Feed = ({ articles, visibleArticleIDs }, { }) => {
		//Reducing (not mapping) because some ids might not be in the list
		const displayedArticles = visibleArticleIDs.reduce((acc, id) => {
			//O(n^2), but since there shouldn't be that many on the page at
			//once (it'd  probably have to be >>> 500 to be an issue).
			const searchResult = articles.filter(
				(article) => {return article._id === id}
			)
			return searchResult.length>0 ? acc.concat(searchResult) : acc
			console.log(searchResult)
		}, [])
	return (
		<ListGroup>
		<b>'FEED ME HERE'</b>
		{
			displayedArticles.map((article, index) => (
			<ArticleCard articleJSON={ article } key={ index } />
			))
		}
		</ListGroup>
	)
}

Feed.propTypes = {

}

export default connect(
    (state) => {
     	return ({
     	 	articles: state.articles, 
     		visibleArticleIDs: state.visibleArticleIDs 
     	})
    }, (dispatch) => ({ })
)(Feed)
