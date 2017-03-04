import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import ArticleCard from './articleCard'
import { ListGroup, ListGroupItem } from 'react-bootstrap'
export const Feed = ({ articles, visibleArticleIDs }, { }) => {
	//Oftentimes we have to display only some of the articles we have
	//Reducing (not mapping) in case an ID sneaks in that isn't valid
	console.log("FEED CHECKING FOR ARTICLES")
	console.log(articles)
	console.log(visibleArticleIDs)
	const displayedArticles = visibleArticleIDs.reduce((acc, id) => {
		//O(n^2), but since there shouldn't be that many on the page at
		//once (it'd  probably have to be >>> 500 to be an issue).
		const searchResult = articles.filter(
			(article) => {return article._id === id}
		)
		return searchResult.length>0 ? acc.concat(searchResult) : acc
	}, [])
	console.log(displayedArticles)
	//Arr.sort is a litle demented in js - it directly mutates
	//This is why I call .concat - to get us a fresh copy 
	const sortedDisplayedArticles = displayedArticles.concat().sort(
		(articleA, articleB) => {
			return (-1 *
				(Date.parse(articleA.date) - Date.parse(articleB.date))
			)
	})
	console.log(sortedDisplayedArticles)
	return (
		<ListGroup>
		{
			sortedDisplayedArticles.map((article, index) => (
				<ArticleCard articleJSON={ article } key={ index } />
			))
		}
		</ListGroup>
	)
}

Feed.propTypes = {
	articles: PropTypes.array.isRequired,
	visibleArticleIDs: PropTypes.array.isRequired
}

export default connect(
    (state) => {
     	return ({
     	 	articles: state.articles, 
     		visibleArticleIDs: state.visibleArticleIDs 
     	})
    }, (dispatch) => ({ })
)(Feed)
