import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { Button, Well, Accordion, Panel } from 'react-bootstrap'
import { CommentHolder } from './commentHolder'
export const CommentsList = ({comments, userId, testState}) => {
    console.log('dumb test:', userId, testState)
    //comments have an commentId field, in addition to others
    const mapCommentToHTML = ((comment, index) => {
        return (
            <CommentHolder commentText={comment.text}
            commentId={comment.commentId} commentAuthor={comment.author}
            commentDate={comment.date} key={index} 
            editable={userId === comment.author}
            />
        )
    });
    return (
        <Panel 
        collapsible defaultExpanded bsStyle={'default'}
        header={'Comments (Click me to show/hide)'}
        >
            {'Any comments are being shown below (click and type to edit them):'}
            <br /> <br />
            {comments.map(mapCommentToHTML)}
        </Panel>
    )
}

CommentsList.propTypes = {
}




export default connect(
    (state, ownProps) => {
        return { 
            comments: ownProps.comments,
            userId: state.profileData.name,
            testState: state
        } 
    },
    (dispatch) => {
        return {}
    }
)(CommentsList)
