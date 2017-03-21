import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import ArticleCard from './articleCard'
import { ListGroup, ListGroupItem } from 'react-bootstrap'


export const Feed = ({ articles, visibleArticles }) => {
	//Arr.sort is a litle demented in js - it directly mutates
	//This is why I call .concat - to get us a fresh copy 
	const correctlyOrderedArticles = 
	 visibleArticles.concat().sort((articleA, articleB) => {
		//Although sorting is technically buisness logic, it's
		//somethign that NEEDS to be delegated to this component 
		return (-1 *
		  (Date.parse(articleA.date) -
		   Date.parse(articleB.date))
		)
	  })
	return (
		<ListGroup>
		{
			correctlyOrderedArticles.map((article, index) => (
				<ArticleCard articleJSON={ article } key={ index } />
			))
		}
		</ListGroup>
	)
}

Feed.propTypes = {
	articles: PropTypes.array.isRequired,
	visibleArticles: PropTypes.array.isRequired,
}
export default connect(
    (state) => {
     	return ({
     	 	articles: state.articles, 
     		visibleArticles: state.visibleArticles 
     	})
    }, (dispatch) => {
    	return {

    	}	
    }
)(Feed)
