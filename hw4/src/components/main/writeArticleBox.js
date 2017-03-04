import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { Button, Well, ListGroupItem } from 'react-bootstrap';
import { FormGroup, FormControl, ControlLabel } from 'react-bootstrap'
import { addArticle, clearWriteView } from '../../actions'
export const WriteArticleBox = ({
	temporaryArticles, postArticle
}) => {

	/* 
	Normally this wouldn't be what we'd do, but we need a way to dump the
	temporary non-persitant writing over into our actual postArticle function.
	This is the best way to do so since react-bootsrap doesn't provide any
	easy way to accessing form's input from one of the buttons.

	Note that until 'submitted' it is NOT somethign we ever want to have
	stored elsewhere. It can't be considered part of the global state of the
	program. In other words, although it is data, it is NOT state
	*/
	let writeView = ""
	function _onChange(e) {
		writeView=e.target.value;
	}	
	function _postArticle(e){
		//accessing e.target.value here wouldn't work!
		postArticle(writeView)
	}
	return (
		<ListGroupItem> <Well>
		<form> <FormGroup controlId="writeArticleForm">
		  <ControlLabel> Upload a file! </ControlLabel>
		  <FormControl type="file" />

		  <ControlLabel> Upload article text! </ControlLabel>
		  <FormControl
		   type="text" placeholder={ "Write article here..." }
		   onChange={ _onChange }
		   />

		  <Button bsSize="small" onClick={ _postArticle }> 
		  {"Post Article!"}
		  </Button>

		  <Button bsSize="small" type="reset" >
		  { "Clear Article!" }
		  </Button>
		</FormGroup> </form>
		</Well> </ListGroupItem>
	)
}

WriteArticleBox.propTypes = {
}

export default connect(
	(state) => {
		return {
			temporaryArticle: state.temporaryArticles
		}
	},
 	(dispatch) => {
 		return {
 			postArticle: (articleText) => {
 				console.log(articleText);
 				return null;
 			}
 		}
 	}
)(WriteArticleBox)
