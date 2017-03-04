import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { Button, Well, ListGroupItem } from 'react-bootstrap';
import { FormGroup, FormControl, ControlLabel } from 'react-bootstrap'

export const newFollowers = ({ }) => {
	let writeView = ""
	function _onChange(e) {
		writeView=e.target.value;
	}	
	/*
	function _postArticle(e){
		//accessing e.target.value here wouldn't work!
		postArticle(writeView)
	}
	*/
	return (
		<ListGroupItem> <Well>
		<form> <FormGroup controlId="writeArticleForm">
		  <ControlLabel> Add new followee! </ControlLabel>

		  <FormControl
		   type="text" placeholder={ "Write name here..." }
		   onChange={ _onChange }
		   />
		  <Button bsSize="small" onClick={ ()=>{console.log("sup")}}> 
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

/*
	return {
		newFollowee(inputText) => {
			console.log(inputText);
			return null;
		}
	}
 */
export default connect(
    (state) => ({}), 
 	(dispatch) => ({})
)(newFollowers)