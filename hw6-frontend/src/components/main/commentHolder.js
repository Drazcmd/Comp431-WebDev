import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import { updateComment } from './../../actions';
import ContentEditable from 'react-contenteditable';

export const CommentHolder = ({
    commentText, commentId, commentDate, 
    commentAuthor, editable, 
    editComment, testData
}) => {
    console.log("props showing up correctly:",
        commentText, commentId, commentDate,
        commentAuthor, editable, 
        "state and dispatched stuff not coming correctly:",
        editComment, testData)


    //comments have an author, commentId, date, and text fields
    let _commentText = commentText;
    const trackComment = ((e) => {_commentText = e.target.value});
    const _editComment = (() => {editComment(_commentText)});
    return (
        <div>
            <ContentEditable html={_commentText} disabled={!editable}
            onChange={trackComment} />

            <Button bsSize={"xsmall"} disabled={!editable}
            onClick={_editComment} >
                {'Update comment'} 
             </Button>

            {' (Written by '}{commentAuthor} {' on '} {commentDate} {')'}
            <br /> <br />
        </div>
    )
}

CommentHolder.propTypes = {
    commentText: PropTypes.string.isRequired
}

export default connect(
    (state, ownProps) => {
        return {
            commentText: ownProps.commentText,
            commentId: ownProps.commentId,
            commentDate: ownProps.commentDate,
            commentAuthor: ownProps.commentAauthor,
            editable: ownProps.editable,
            testData: state.profileData
        }
    },(dispatch) => {
        return {
            editComment: (commentId, commentText) => {
                dispatch(updateComment(commentId, commentText))
            }
        }
    }
)(CommentHolder)

