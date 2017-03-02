import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

//import { updateLocation } from './actions'

export const Main = ({ }, { }) => {
	return (
		<span>
		<b>"HELLO MAIN"</b>
		</span>
	)

}

Main.propTypes = {
}

export default connect(
    (state) => ({ }),
    (dispatch) => ({ })
)(Main)
