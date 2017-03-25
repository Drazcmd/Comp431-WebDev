import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import ArticleCard from './articleCard'
import { ListGroup, ListGroupItem } from 'react-bootstrap'
import { VisModes } from './../../actions'

export const Feed = ({ articles, visibilityMode, filterStr }) => {
    console.log(articles, visibilityMode, filterStr)
    //TODO - move to external file
    const filterArticles = (articles, visibilityMode, filterStr) => {
        if (visibilityMode === VisModes.FIL_AUTH) {
            return articles.filter(article => {
                return article.author.includes(filterStr)
            })
        } else if (visibilityMode === VisModes.FIL_TEXT){
            return articles.filter(article => {
                return article.text.includes(filterStr)
            })
        } else if (visibilityMode === VisModes.NO_FILTER) {
            return articles
        } else {
            //This should be an error! No reason to get here
            return articles
        }
    }
    //Arr.sort is a litle demented in js - it directly mutates
    //This is why I call .concat - to get us a fresh copy 
    const displayedArticles = (articles, visibilityMode, filterStr) => {
        return filterArticles(
            articles.concat(), visibilityMode, filterStr
        ).sort((articleA, articleB) => {
            //Although sorting is technically buisness logic, it's
            //somethign that NEEDS to be delegated to this component 
            return (-1 *
                (Date.parse(articleA.date) -
                Date.parse(articleB.date))
            )
        })
    }
    const correctlyOrderedArticles = () => {
        console.log(displayedArticles(articles, visibilityMode, filterStr))
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
