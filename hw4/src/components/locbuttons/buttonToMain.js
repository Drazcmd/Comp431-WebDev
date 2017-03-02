import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { main } from '../Main/main'
import { updateLocation } from '../../actions'

export const ButtonToMain = ({ navigate }) => {

	console.log(navigate)
	
	return (
		<span>
		<button onClick = { navigate }> 'CLICK  MAIN PAGE' </button>
		</span>
	)
}

ButtonToMain.propTypes = {
}

export default connect(
    null,
    (dispatch) => {
    	console.log("main page")
    	return {
    		navigate: () => dispatch(updateLocation('MAIN_PAGE'))
    	}
    }

  //   ({ navigate: () => {
  //   		console.log("sup!")
  //   		)

		// }
  //   })
)(ButtonToMain)
