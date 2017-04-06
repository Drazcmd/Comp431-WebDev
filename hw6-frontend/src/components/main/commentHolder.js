import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import { updateComment } from './../../actions';
import ContentEditable from 'react-contenteditable';

export const CommentHolder = ({comment, editable, sendCommentEdit}) => {
    //comments have text, commentId, date, author
    console.log('here is the comment:', comment)
    let _commentText = comment.text;
    const trackComment = ((e) => {_commentText = e.target.value});
    const _sendCommentEdit = (() => {sendCommentEdit(_commentText)});
    return (
        <div>
            <ContentEditable 
            html={_commentText} disabled={!editable} onChange={trackComment}
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
            sendCommentEdit: (commentId, commentText) => {
                dispatch(updateComment(commentId, commentText))
            }
        }
    }
)(CommentHolder)

