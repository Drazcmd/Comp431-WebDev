import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import ButtonToLanding from '../locbuttons/buttonToLanding'
import ButtonToMain from '../locbuttons/buttonToMain'
export const Landing = ({ }, { }) => {
	return (
		<span>
		<b>'HELLO Landing!'</b>
		<ButtonToLanding />
		<ButtonToMain />
		</span>
	)

}

Landing.propTypes = {
}

export default connect(
    (state) => ({ }),
    (dispatch) => ({ })
)(Landing)
