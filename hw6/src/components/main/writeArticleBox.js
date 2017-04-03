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
    let articleText, articleImage;
    const _postArticle = () => {
        //TODO - check that other stuff will all be set by server for us
        postArticle({
            text: articleText.value, 
            img: articleImage.value,
            author: profileName,
        })
    }
    return (
        <Col> <ListGroupItem> <Well bsSize="small">
        <form> <FormGroup controlId="writeArticleForm">
            <ControlLabel> Give your article an image: </ControlLabel>
            <FormControl 
                type="file"
                inputRef={_articleImage => {articleImage = _articleImage}} 
            />
            <br />

            <ControlLabel> Write an article: </ControlLabel>
            <FormControl
                type="text" placeholder={ "Write article here..." }
                inputRef={_articleText => {articleText = _articleText}} 
            />
            <Button type="reset" bsStyle="success" onClick={ _postArticle } >
                {"Post article!"}
            </Button>
            <Button type="reset" >
                { "Clear article" }
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
                    console.log("article posting isn't done yet! gotta deal with the image now, as well as eroring if trying to send article without image!")
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
