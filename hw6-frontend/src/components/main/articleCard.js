import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { Button, Well, ListGroupItem, Panel } from 'react-bootstrap'
import { FormGroup, FormControl, ControlLabel } from 'react-bootstrap'
import { CommentsList } from './commentsList'
import { addComment } from './../../actions'
export const ArticleCard = ({id, text, image, author,
    timestamp, comments, postComment, editArticle
}) => {
    const articleImage = image ? ( <img src={image}/> ) : (<div />);
    let newComment;
    const _postComment = () => {
        //new comments must have id -1 in the payload to the server
        const commentId = -1 
        postComment(id, newComment.value ? newComment.value : "", commentId)
    }
    return (
        <ListGroupItem> <Well>

        <Panel bsStyle='info' header={'Post Header (cannot be hidden or edited)'}>
        <div> Image (if any): </div>
        <div> {articleImage} </div>
        <div> Author: {author}. Written at {timestamp} </div>
        <div> Image url (if any): { image }</div>
        </Panel>

        <Panel collapsible defaultExpanded bsStyle='primary'
        header={'Post Text (Click me to show/hide)'}> 
        {'The post text is being shown below (click and type to edit it):'} 
        <div /> <div /> 
        {text}
        </Panel>

        <CommentsList comments={comments} />

        <FormGroup>
            <ControlLabel />
            <FormControl type="text" placeholder="Enter Comment Here"
                inputRef={(_newComment) => {newComment = _newComment}} />
        </FormGroup>

        <Button bsSize="small" onClick = { _postComment }> 
        { "Post Comment" }  
        </Button>
        <Button bsSize="small" onClick = { editArticle }> 
        { "Edit Article" }
        </Button>
        </Well> </ListGroupItem>
    )
}

ArticleCard.propTypes = {
    author: PropTypes.string.isRequired
}

export default connect(
    (state, ownProps) => {
        console.log('article json:', ownProps.articleJSON)
        return { 
            //image link might be null
            id: ownProps.articleJSON._id,
            text: ownProps.articleJSON.text,
            image: ownProps.articleJSON.img,
            author: ownProps.articleJSON.author,
            timestamp: ownProps.articleJSON.date,
            comments: ownProps.articleJSON.comments
        } 
    },
    (dispatch) => {
        return {
            //Currently button does nothing!
            postComment: (articleId, comment, commentId) => {
                //commentID=-1 means post a new comment
                //otherwise the PUT would edit a comment
                return addComment(articleId, comment, commentId)
                .then((returnedAction) => {
                    //(probably a refresh updateArticles action)
                    dispatch(returnedAction)
                })
            },
            editArticle: () => ({})
        }
    }
)(ArticleCard)
