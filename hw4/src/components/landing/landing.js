import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import ButtonToLanding from '../locbuttons/buttonToLanding'
import ButtonToMain from '../locbuttons/buttonToMain'
export const Landing = ({ }, { }) => {
	let redirectLocation = "MAIN_PAGE"

	return (
		<span>
		<b>'HELLO Landing!'</b>
		<ButtonToLanding />
		<ButtonToMain redirectLocation={redirectLocation} />
		</span>
	)

}

Landing.propTypes = {
}

export default connect(
    (state) => ({ }),
    (dispatch) => ({ })
)(Landing)
