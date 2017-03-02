import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import NavButton from '../buttons/navButton'

export const Main = ({ }, { }) => {
	return (
		<span>
		<b>'HELLO MAIN!'</b>
		<NavButton redirectLocation={"LANDING_PAGE"} />
		</span>
	)

}

Main.propTypes = {
}

export default connect(
    (state) => ({ }),
    (dispatch) => ({ })
)(Main)
