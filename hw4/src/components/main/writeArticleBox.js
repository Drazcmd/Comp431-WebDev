import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { Button, Well, ListGroupItem } from 'react-bootstrap';
import { FormGroup, FormControl, ControlLabel } from 'react-bootstrap'

//Normally this would be bad. HOWEVER, we don't actually want to
//be storing this state anywhere until actually submitted by the user
function buildClearInput(formControlRef) {
	//Note how this COMPOSES a funciton to clear said input,
	//as opposed to clearing the form itself
	return {
		function(){ReactDOM.findDOMNode(formControlRef).value = "";}
	} 
}

export const WriteArticleBox = ({ postArticle, clearArticle }) => {
	return (
		<ListGroupItem> <Well>
		<FormGroup>
		  <ControlLabel />
		  <FormControl 
		  	type="text" placeholder="Write Article Here" 
		  	ref="writeNewArticle"
		  />
		</FormGroup>

		<Button bsSize="small" onClick = { postArticle }> {
		  "Post Article!" 
		}
		</Button>

		<Button bsSize="small" onClick = {
		  //Higher-order function-composition here
		  buildClearInput("writeNewArticle")
		}>
		  { "Clear Article!" }
		</Button>
		</Well> </ListGroupItem>
	)
}

WriteArticleBox.propTypes = {
}

export default connect(
	(state, ownProps) => ({}),
	(dispatch) => {
    	return {
    		//Currently buttons do nothing!
    		postArticle: () => ({}),
    		clearArticle: () => ({})
    	}
    }
)(WriteArticleBox)
