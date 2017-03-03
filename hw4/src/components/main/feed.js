import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import Article from './article'

export const Feed = ({ articles }, { }) => {
	return (
		<span>
		<b>'FEED ME HERE'</b>
		<Article articleJSON={ articles[0] }/>
		<br /> <br />
		<Article articleJSON={ articles[1] }/>
		<br /> <br />
		<Article articleJSON={ articles[2] }/>
		<br /> <br />
		<Article articleJSON={ articles[3] }/>
		<br /> <br />
		<Article articleJSON={ articles[4] }/>
		<br /> <br />
		<Article articleJSON={ articles[5] }/>
		<br /> <br />
		<Article articleJSON={ articles[6] }/>
		<br /> <br />
		<Article articleJSON={ articles[7] }/>

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
