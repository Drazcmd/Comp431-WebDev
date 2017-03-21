import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import NavButton from './navButton'
import { ButtonToolbar } from 'react-bootstrap'
export const NavBar = ({ }) => {
	//Like real facebook, should be able to refresh main page or profile by
	//clicking on the navigation button (when logged in)
	return (
		<ButtonToolbar>
		<NavButton redirectLocation={"MAIN_PAGE"} text={"Main Page"}/>
		<NavButton redirectLocation={"LANDING_PAGE"} text={"Log out"} />
		<NavButton redirectLocation={"PROFILE_PAGE"} text={"Profile"} />
		</ButtonToolbar>
	)
}

NavBar.propTypes = {
}

export default connect(
	(state) => ({ }),
	(dispatch) => ({ })
)(NavBar)
