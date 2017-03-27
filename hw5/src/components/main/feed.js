import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import ArticleCard from './articleCard'
import { ListGroup, ListGroupItem } from 'react-bootstrap'
import { displayedArticles } from './feedFilters.js'
export const Feed = ({ articles, visibilityMode, filterStr }) => {
    console.log("input articles to feed:", articles)
    const correctlyOrderedArticles = () => {
        return displayedArticles(articles, visibilityMode, filterStr)
    }
    return (
        <ListGroup>
        {
            correctlyOrderedArticles().map((article, index) => (
                <ArticleCard articleJSON={ article } key={ index } />
            ))
        }
        </ListGroup>
    )
}

Feed.propTypes = {
    articles: PropTypes.array.isRequired,
    filterStr: PropTypes.string.isRequired,
    visibilityMode: PropTypes.string.isRequired
}
export default connect(
    (state) => {
        return ({
            articles: state.articles, 
            visibilityMode: state.visibilityMode,
            filterStr: state.filterStr
        })
    }, (dispatch) => {
        return {

        }   
    }
)(Feed)
