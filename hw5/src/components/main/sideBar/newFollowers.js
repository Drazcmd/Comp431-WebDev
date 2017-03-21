import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { Button, Well, ListGroupItem } from 'react-bootstrap';
import { FormGroup, FormControl, ControlLabel } from 'react-bootstrap'
import { addFollowee } from '../../../actions'

export const newFollowers = ({ addFollowee }) => {
	let writeView = ""
	function _onChange(e) {
		writeView=e.target.value;
	}	
	function _addFollowee(e){
		//accessing e.target.value here wouldn't work!
		addFollowee(writeView)
	}
	return (
		<ListGroupItem> <Well>
		<form> <FormGroup controlId="writeArticleForm">
		  <ControlLabel> Add new followee! </ControlLabel>

		  <FormControl
		   type="text" placeholder={ "Write name here..." }
		   onChange={ _onChange }
		   />
		  <Button bsSize="small" onClick={ _addFollowee }> 
		  {"Add new followee"}
		  </Button>

		  <Button bsSize="small" type="reset" >
		  { "Clear above text" }
		  </Button>
		</FormGroup> </form>
		</Well> </ListGroupItem>
	)
}

newFollowers.propTypes = {
}

export default connect(
    (state) => ({}), 
 	(dispatch) => {
 		return {
			addFollowee: (name) => {
				dispatch(addFollowee(name))
			}
		}
 	}
)(newFollowers)