import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import NavBar from '../navigation/navBar'
import Feed from './feed'

export const Main = ({ }, { }) => {
	return (
		<span>
		<NavBar />
		<b>'HELLO MAIN!'</b>
	//TODO:
	//Profile picture somewhere
	//Feed (collection of articles, either text or picture or both
	//User status headline (prominently idsplayed)
	//List of users being followed
		//List has for each user profile pic, display/account names, status headlines
		//These can all be hardcoded, only need like 3 of each	

		<br /> <br /> <br />
		<Feed />
		</span>
	)

}

Main.propTypes = {
}

export default connect(
    (state) => ({ }),
    (dispatch) => ({ })
)(Main)
