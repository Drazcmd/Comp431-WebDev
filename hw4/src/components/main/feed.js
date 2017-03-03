import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import ArticleCard from './articleCard'

export const Feed = ({ articles }, { }) => {
	return (
		<span>

		//TODO: get it filtering. Will require I start using the hidden
		//articles state list like he suggests - then I can just do a filter
		//on a map of the articles page, where the map functions creates one
		//of these
		<b>'FEED ME HERE'</b>
		<ArticleCard articleJSON={ articles[0] }/>
		<br /> <br />
		<ArticleCard articleJSON={ articles[1] }/>
		<br /> <br />
		<ArticleCard articleJSON={ articles[2] }/>
		<br /> <br />
		<ArticleCard articleJSON={ articles[3] }/>
		<br /> <br />
		<ArticleCard articleJSON={ articles[4] }/>
		<br /> <br />
		<ArticleCard articleJSON={ articles[5] }/>
		<br /> <br />
		<ArticleCard articleJSON={ articles[6] }/>
		<br /> <br />
		<ArticleCard articleJSON={ articles[7] }/>
		</span>
	)
}

Feed.propTypes = {
}

export default connect(
    (state) => {
     	return ({ articles: state.articles })
    }, (dispatch) => ({ })
)(Feed)
