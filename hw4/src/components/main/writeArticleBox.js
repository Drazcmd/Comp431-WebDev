import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { Button, Well, ListGroupItem } from 'react-bootstrap';
import { FormGroup, FormControl, ControlLabel } from 'react-bootstrap'
import { addArticle, clearWriteView } from '../../actions'
 
export const WriteArticleBox = ({
	writeView, temporaryArticles, postArticle, clearArticle
}) => {
	return (
		<ListGroupItem> <Well>
		<FormGroup>
		  <ControlLabel />
		  <FormControl type="text" placeholder= { writeView } />
		</FormGroup>

		<Button bsSize="small" onClick = { postArticle }> 
		  {"Post Article!"}
		</Button>

		<Button bsSize="small" onClick = { clearArticle }>
		  { "Clear Article!" }
		</Button>
		</Well> </ListGroupItem>
	)
}

WriteArticleBox.propTypes = {
	writeView: PropTypes.string.is.Required
}

export default connect(
	(state) => ({
		writeView: state.writeArticleView,
		//These will get cleared wheneer we naviage away
		//(Non-persistant)
		temporaryArticle: state.temporaryArticles
	}),

	(dispatch) => {
		postArticle: () => ({dispatch(addArticle)}),
		clearArticle: () => ({
			dispatch(clearWriteView())
		})
    }
		//Currently buttons do nothing!
		//Not clear submitted temporary ones - clear the writing view
)(WriteArticleBox)
