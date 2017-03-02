import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { main } from '../Main/main'
import { updateLocation } from '../../actions'

console.log(connect)
console.log(updateLocation)
export const ButtonToMain = ({ location, navigate }) => {
	console.log(location)
	console.log(navigate)

	return (
		<span>
		<button onClick = { navigate }> 'CLICK  MAIN PAGE' </button>
		</span>
	)
}

ButtonToMain.propTypes = {
    location: PropTypes.string.isRequired
}

export default connect(
    (state) => ({location: state.location }),
    (dispatch) => {
    	console.log("main page")
    	return {
    		//navigate: () => console.log("dispatch")
    		navigate: () => dispatch(updateLocation('MAIN_PAGE'))
    	}
    }

  //   ({ navigate: () => {
  //   		console.log("sup!")
  //   		)

		// }
  //   })
)(ButtonToMain)
