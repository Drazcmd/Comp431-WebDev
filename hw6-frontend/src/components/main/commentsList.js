import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { Button, Well, Accordion, Panel } from 'react-bootstrap';
import { CommentHolder } from './commentHolder'
export const CommentsList = ({comments}) => {
    //comments have an commentId field, in addition to others
    return (
        <Panel collapsible defaultExpanded bsStyle='default'
        header={'Comments (Click me to show/hide)'} >
        {'Any comments are being shown below (click and type to edit them):'}
        <br /> <br />
        {comments.map((comment) => (
            <CommentHolder comment={comment} key={comment.commentId}/>
        ))}
        </Panel>
    )
}

CommentsList.propTypes = {
}

export default connect(
    (state, ownProps) => {
        return { 
            comments: ownProps.comments
        } 
    },
    (dispatch) => {
        return {}
    }
)(CommentsList)
