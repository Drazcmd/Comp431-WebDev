import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { Button, Well, ListGroupItem } from 'react-bootstrap';

export const newFollowers = ({ }) => {
	return (
		<Well>

		HELLO WORLD

		</Well>
	)
}



newFollowers.propTypes = {

}

export default connect(
    (state) => ({}), 
    (dispatch) => ({ })
)(newFollowers)
