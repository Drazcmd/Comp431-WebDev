import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import ArticleCard from './articleCard'
import { ListGroup, ListGroupItem } from 'react-bootstrap'
export const Feed = ({ articles, visibleArticleIDs }, { }) => {
	//Oftentimes we have to display only some of the articles we have
	//Reducing (not mapping) in case an ID sneaks in that isn't valid
	const displayedArticles = visibleArticleIDs.reduce((acc, id) => {
		//O(n^2), but since there shouldn't be that many on the page at
		//once (it'd  probably have to be >>> 500 to be an issue).
		const searchResult = articles.filter(
			(article) => {return article._id === id}
		)
		return searchResult.length>0 ? acc.concat(searchResult) : acc
	}, [])

	//Arr.sort is a litle demented in js - it directly mutates
	//This is why I call .concat - to get us a fresh copy 
	const sortedDisplayedArticles = displayedArticles.concat().sort(
		(articleA, articleB) => {
			return (-1 *
				(Date.parse(articleA.date) - Date.parse(articleB.date))
			)
	})

	return (
		<ListGroup>
		<b>'FEED ME HERE'</b>
		{
			sortedDisplayedArticles.map((article, index) => (
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
