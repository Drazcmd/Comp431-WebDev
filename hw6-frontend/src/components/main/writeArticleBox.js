import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { Button, Well, ListGroupItem } from 'react-bootstrap';
import { Col, FormGroup, FormControl, ControlLabel } from 'react-bootstrap'
import { addArticle, updateShownArticles, VisModes } from '../../actions'

export const WriteArticleBox = ({
    profileName, nextArticleID, postArticle, filterArticles
}) => {
    //TODO - check that stuff other than text/img will be set by server for us
    let articleText, articleImage;
    const _postArticle = () => {
        //doing articleImage.value instead would return a fake path string
        //(Won't crash if no file inputted, will just pass along a null)
        postArticle({
            text: articleText.value, 
            img: articleImage.files[0],
            author: profileName
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
            postArticle: (article) => {
                console.log(article)
                addArticle(article).then((returnedAction) => {
                    console.log('about to dispatch, for this article: ', article)
                    console.log('this event: ', returnedAction)
                    dispatch(returnedAction)
                });
            },
            filterArticles: (mode, filterStr) => updateShownArticles(
                mode, filterStr
            ).then(returnedAction => {
                dispatch(returnedAction)
            })
        }
    }
)(WriteArticleBox)
