import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import { updateComment } from './../../actions';
import ContentEditable from 'react-contenteditable';

export const CommentHolder = ({comment, loggedInUser, editComment}) => {
    console.log('I am a comment!', comment, loggedInUser, editComment);
    //comments have an author, commentId, date, and text fields
    let commentText = comment.text;
    console.log('sup')
    const trackComment = ((e) => {commentText = e.target.value});
    console.log('yo')
    const _editComment = (() => editComment(comment.commentId, commentText));
    console.log('haha')
    const notEditable = comment.author === loggedInUser
    console.log('ok')
    return (
        <div>
            <ContentEditable html={comment.text} disabled={notEditable}
            onChange={trackComment} />

            <Button bsSize={"xsmall"} disabled={notEditable}
            onClick={_editComment} >
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
    ((state, ownProps) => {
        console.log('ownprops',ownProps)
        console.log('state',state)
        return {
            comment: ownProps.comment,
            loggedInUser: state.profileData.name
        }
    }),
    ((dispatch) => {
        return {
            editComment: ((commentId, commentText) => {
                dispatch(updateComment(commentId, commentText))
            })
        }
    })
)(CommentHolder)

