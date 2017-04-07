import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import { putComment } from './../../actions';
import ContentEditable from 'react-contenteditable';

export const CommentHolder = ({
    comment, editable, articleId, sendCommentEdit
}) => {
    //comments have text, commentId, date, author
    console.log('here is the comment:', comment)
    let commentText = comment.text;
    const trackComment = ((e) => {commentText = e.target.value});
    const _sendCommentEdit = (() => {
        sendCommentEdit(articleId, commentText, comment.commentId)
    });
    return (
        <div>
            <ContentEditable 
            html={commentText} disabled={!editable} onChange={trackComment}
            />

            <Button 
            bsSize={"xsmall"} disabled={!editable} onClick={_sendCommentEdit}
            >
                {'Update comment'} 
            </Button>

            {' (Written by '}{comment.author} {' on '} {comment.date} {')'}
            <br /> <br />
        </div>
    )
}

CommentHolder.propTypes = {
}

export default connect(
    (state, ownProps) => {
        return {
            comment: ownProps.comment,
            editable: ownProps.editable
        }
    },(dispatch) => {
        return {
            sendCommentEdit: (articleId, commentText, commentId) => {
                putComment(articleId, commentText, commentId)
                .then((returnedAction) => {
                    dispatch(returnedAction)
                })
            }
        }
    }
)(CommentHolder)

