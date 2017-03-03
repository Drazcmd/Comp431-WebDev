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
	//User status headline (prominently idsplayed)
	//Sort articles
	//New article area
	//Public new article
	//clear new artile area
	//upload image (open file picker)
	//search bar filters by author and text, but not article id or article date
	//Sidebar with at least 3 followed users
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
