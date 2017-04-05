import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { Button, Well, ListGroupItem } from 'react-bootstrap';
import { FormGroup, FormControl, ControlLabel } from 'react-bootstrap'
import { CommentsHolder } from './commentsHolder'
import { addComment } from './../../actions'
export const ArticleCard = ({id, text, image, author,
    timestamp, comments, postComment, editArticle
}) => {
    const articleImage = image ? ( <img src={image}/> ) : (<div />);
    let newComment
    const _postComment = () => {
        //new comments must have id -1 in the payload to the server
        const commentId = -1 
        postComment(id, newComment.value ? newComment.value : "", commentId)
    }
    return (
        <ListGroupItem> <Well>
        {articleImage}
        <div> Author: {author}. Written at {timestamp} </div>
        Image: { image }
        <Well>Post Text: { text } </Well>
        <div> <CommentsHolder comments={comments}/> </div>

        <FormGroup>
            <ControlLabel />
            <FormControl type="text" placeholder="Enter Comment Here"
                inputRef={(_newComment) => {newComment = _newComment}} />
        </FormGroup>

        <Button bsSize="small" onClick = { _postComment }> { "Post Comment" }  </Button>
        <Button bsSize="small" onClick = { editArticle }> { "Edit Article" }  </Button>
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
