import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { Button, Well, ListGroupItem } from 'react-bootstrap';
import { FormGroup, FormControl, ControlLabel } from 'react-bootstrap'
import { CommentsHolder } from './commentsHolder'
export const ArticleCard = ({text, image, author,
    timestamp, comments, postComment, editArticle
}) => {
    const articleImage = image ? ( <img src={image}/> ) : (<div />);
    return (
        <ListGroupItem> <Well>
        <div> Author: {author}. Written at {timestamp} </div>
        Image: { image }
        <Well>Post Text: { text } </Well>
        <div> <CommentsHolder comments={comments}/> </div>

        <FormGroup>
            <ControlLabel />
            <FormControl type="text"placeholder="Enter Comment Here"/>
        </FormGroup>

        <Button bsSize="small" onClick = { postComment }> { "Post Comment" }  </Button>
        <Button bsSize="small" onClick = { editArticle }> { "Edit Article" }  </Button>
        </Well> </ListGroupItem>
    )
}

ArticleCard.propTypes = {
    author: PropTypes.string.isRequired
}

export default connect(
    (state, ownProps) => {
        return { 
            //image link might be null
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
            postComment: () => ({}),
            editArticle: () => ({})
        }
    }
)(ArticleCard)
