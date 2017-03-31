import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { Button, Well, ListGroupItem } from 'react-bootstrap';

export const CommentsHolder = ({comments}) => {
    //comments have an author, commentId, date, and text fields
    return (
        <Well> 
        {"Comments: "}
        {
            comments.map((comment) => (
                <div key={comment.commentId}> {comment.author}: "{comment.text}" (at {comment.date}) </div>
            ))
        }
        </Well> 
    )
}

CommentsHolder.propTypes = {
}

export default connect(
    (state, ownProps) => {
        return { 
            //image link might be null
            comments: ownProps.comments
        } 
    },
    (dispatch) => {
        return {}
    }
)(CommentsHolder)
