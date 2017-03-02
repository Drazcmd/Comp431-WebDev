import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { landing } from '../Landing/landing'
import { updateLocation } from '../../actions'

export const ButtonToLanding = ({ navigate }) => {
	return (
		<span>
		<button onClick = { navigate }> 'CLICK FOR LANDING PAGE'</button>
		</span>
	)
}

ButtonToLanding.propTypes = {
}

export default connect(
    (state) => ({ }),
    (dispatch) => ({ navigate: () => dispatch(updateLocation('LANDING_PAGE'))})
)(ButtonToLanding)
