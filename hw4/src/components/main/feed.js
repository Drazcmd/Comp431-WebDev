import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import Article from './article'

export const Feed = ({ articles }, { }) => {
	return (
		<span>
		<b>'FEED ME HERE'</b>
		<Article displayText={ articles[0].text }/>
		<br /> <br />
		<Article displayText={ articles[1].text }/>
		<br /> <br />
		<Article displayText={ articles[2].text }/>
		<br /> <br />
		<Article displayText={ articles[3].text }/>
		<br /> <br />
		<Article displayText={ articles[4].text }/>
		<br /> <br />
		<Article displayText={ articles[5].text }/>
		<br /> <br />
		<Article displayText={ articles[6].text }/>
		<br /> <br />
		<Article displayText={ articles[7].text }/>

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
