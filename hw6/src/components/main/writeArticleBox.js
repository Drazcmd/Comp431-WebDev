import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { Button, Well, ListGroupItem } from 'react-bootstrap';
import { Col, FormGroup, FormControl, ControlLabel } from 'react-bootstrap'
import { addArticle, updateShownArticles, VisModes } from '../../actions'

export const WriteArticleBox = ({
    profileName, nextArticleID, postArticle, filterArticles
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
        //Non-text stuff will all be set by server for us
        postArticle({
            //accessing e.target.value here wouldn't work!
            text: writeView, 
            author: profileName,
        })
    }
    return (
        <Col> <ListGroupItem> <Well bsSize="small">
        <form> <FormGroup controlId="writeArticleForm">
          <ControlLabel> Upload an image: </ControlLabel>
          <FormControl type="file" />
          <br />
          <ControlLabel> Write an article: </ControlLabel>
          <FormControl
           type="text" placeholder={ "Write article here..." }
           onChange={ _onChange }
           />

          <br />

          <Button bsStyle="success"
           type="reset" onClick={ _postArticle } >
            {"Post text as article!"}
          </Button>
          <Button type="reset" >
            { "Clear text" }
          </Button>
        </FormGroup> </form>
        </Well> </ListGroupItem> </Col>
    )
}

WriteArticleBox.propTypes = {
}

export default connect(
    (state) => {
        return {
            nextArticleID: state.articles.length,
            profileName: state.profileData.name
        }
    },
    (dispatch) => {
        return {
            //postArticle will eventually return an article REFRESH action
            postArticle: (article) => addArticle(article).then(
                returnedAction => {
                    dispatch(returnedAction)    
                }
            ),
            filterArticles: (mode, filterStr) => updateShownArticles(
                mode, filterStr
            ).then(returnedAction => {
                dispatch(returnedAction)
            })
        }
    }
)(WriteArticleBox)
