import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { Button, Well, ListGroupItem } from 'react-bootstrap';
import { FormGroup, FormControl, ControlLabel } from 'react-bootstrap'
import { addArticle, clearWriteView } from '../../actions'
export const WriteArticleBox = ({
	writeArticleView, temporaryArticles, postArticle
}) => {
	return (
		<ListGroupItem> <Well>
		<form> <FormGroup controlId="writeArticleForm">
		  <ControlLabel> Upload a file! </ControlLabel>
		  <FormControl type="file" />

		  <ControlLabel> Upload article text! </ControlLabel>
		  <FormControl
		   type="text" placeholder={ writeArticleView } 
		   onSubmit={ postArticle }
		   />

		  <Button bsSize="small" type="submit" > 
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
	writeArticleView: PropTypes.string.isRequired
}

export default connect(
	(state) => {
		return {
			writeArticleView: state.writeArticleView,
			//These will get cleared wheneer we naviage away
			//(Non-persistant)
			temporaryArticle: state.temporaryArticles
		}
	},
 	(dispatch) => {
 		//dispatch(addArticle) and
 		//dispatch(clearArticleView) aren't working :(
 		return {
 			postArticle: (articleText) => {
 				console.log(articleText);
 				return null;
 			}
 		}
 	}
)(WriteArticleBox)
