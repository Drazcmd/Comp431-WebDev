import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import NavBar from '../navigation/navBar'

export const Main = ({ }, { }) => {
	return (
		<span>
		<NavBar />
		<b>'HELLO MAIN!'</b>
		</span>
	)

}

Main.propTypes = {
}

export default connect(
    (state) => ({ }),
    (dispatch) => ({ })
)(Main)
