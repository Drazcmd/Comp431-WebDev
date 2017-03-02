import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { updateLocation } from '../../actions'
import landing from '../Landing/landing'

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
