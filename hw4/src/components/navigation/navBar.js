import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import NavButton from './navButton'
export const NavBar = ({ }) => {
	//Like real facebook, should be able to refresh main page or profile by
	//clicking on the navigation button (when logged in)
	return (
		<span>
		<NavButton redirectLocation={"MAIN_PAGE"} text={"Main Page"}/>
		<NavButton redirectLocation={"LANDING_PAGE"} text={"Log out"} />
		<NavButton redirectLocation={"PROFILE_PAGE"} text={"Profile"} />
		</span>
	)
}

NavBar.propTypes = {
}

export default connect(
	(state) => ({ }),
	(dispatch) => ({ })
)(NavBar)
