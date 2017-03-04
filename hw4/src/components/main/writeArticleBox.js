import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { Button, Well, ListGroupItem } from 'react-bootstrap';
import { FormGroup, FormControl, ControlLabel } from 'react-bootstrap'

export const WriteArticleBox = ({ postArticle, clearArticle }) => {
	return (
		<ListGroupItem> <Well>
		<FormGroup>
		  <ControlLabel />
		  <FormControl 
		    type="text"placeholder="Write Article Here"
		  />
		</FormGroup>

		<Button bsSize="small" onClick = { postArticle }> {
		  "Post Article!" 
		}
		</Button>

		<Button bsSize="small" onClick = { clearArticle }>
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
