import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import NavBar from '../navigation/navBar'

export const Main = ({ }, { }) => {
	return (
		<span>
		<b>'HELLO MAIN!'</b>
		<NavBar />
		</span>
	)

}

Main.propTypes = {
}

export default connect(
    (state) => ({ }),
    (dispatch) => ({ })
)(Main)
