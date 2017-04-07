import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { Button, Well, ListGroupItem, Panel } from 'react-bootstrap'
import { FormGroup, FormControl, ControlLabel } from 'react-bootstrap'
import ContentEditable from 'react-contenteditable';
import CommentsList from './commentsList'
import { editArticle, putComment } from './../../actions'

//This is probably the largest component I have, code wise. However, although
//there's lots of stuff going on, this stuff is simple. It's not complex or fat!
export const ArticleCard = ({
    articleJSON, editable, postComment, sendArticleEdit 
}) => {
    //article's field are _id, text, img, author, date, comments
    //(This stuff is just to deal with react-bootstrap form weirdness)
    let newComment;
    let articleText = articleJSON.text;
    const trackTextEdit = ((e) => articleText = e.target.value)
    const _postComment = () => {
        const commentText = newComment.value ? newComment.value : ""
        postComment(articleJSON._id, commentText)
    }
    const editArticle = (() => {sendArticleEdit(articleJSON._id, articleText)})

    //Not of this is buisness logic - just making stuff nicer looking
    const articleImage = articleJSON.img 
        ? ( <img src={articleJSON.img}/> ) 
        : (<div />);
    const editInstructions = editable 
        ? 'The post text is being shown below (click and type to edit it):'
        : 'The post text is being shown below (it CANNOT be edited):'

    //Note that there are lots of components actually created/defined in here 
    //because it's the best way to make the inner panels look exactly how I want
    return (
        <ListGroupItem> <Well>
        <Panel bsStyle='info' 
        header={'Post Header (cannot be hidden or edited)'}
        >
            <div> {articleImage} </div>
            <div> 
                Author: {articleJSON.author}. 
                Written at {articleJSON.date} 
            </div>
            <div> Image url (if any): { articleJSON.img }</div>
        </Panel>

        <Panel collapsible defaultExpanded bsStyle='primary'
            header={'Post Text (Click me to show/hide)'}
        > 
            { editInstructions }
            <br /> <br />
            <ContentEditable 
                html={articleText} disabled={!editable} onChange={trackTextEdit}
                disabled={!editable}
            />
            <br />
            <Button bsSize="small" onClick = { editArticle } 
                disabled={!editable}
            >
            { "Edit Article" }
            </Button>
        </Panel>

        <CommentsList 
            comments={articleJSON.comments} articleId={articleJSON._id}
        />

        <FormGroup>
            <ControlLabel />
            <FormControl type="text" placeholder="Enter Comment Here"
                inputRef={(_newComment) => {newComment = _newComment}} />
        </FormGroup>

        <Button bsSize="small" onClick = { _postComment }> 
        { "Post Comment" }  
        </Button>
        </Well> </ListGroupItem>
    )
}

ArticleCard.propTypes = {
}

export default connect(
    (state, ownProps) => {
        return { 
            articleJSON: ownProps.articleJSON,
            editable: ownProps.editable
        } 
    },
    (dispatch) => {
        return {
            postComment: (articleId, comment) => {
                //commentID=-1 means post a new comment
                //otherwise the PUT would edit a comment
                const commentId = -1 
                putComment(articleId, comment, commentId)
                .then((returnedAction) => {
                    //(probably a refresh updateArticles action)
                    dispatch(returnedAction)
                })
            },
            sendArticleEdit: (articleId, newArticleText) => {
                editArticle(articleId, newArticleText)
                .then((returnedAction) => {
                    dispatch(returnedAction)
                })
            }
        }
    }
)(ArticleCard)
