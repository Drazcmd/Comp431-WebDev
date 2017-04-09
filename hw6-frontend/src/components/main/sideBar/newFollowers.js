import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { Button, Well, ListGroupItem } from 'react-bootstrap';
import { FormGroup, FormControl, ControlLabel } from 'react-bootstrap'
import { addFollowee, updateShownArticles, VisModes } from '../../../actions'

export const newFollowers = ({ loggedInUser, addFollowee }) => {
    let writeView = ""
    function _onChange(e) {
        writeView=e.target.value;
    }   
    function _addFollowee(e){
        //accessing e.target.value here wouldn't work!
        addFollowee(writeView, loggedInUser)
    }
    return (
        <ListGroupItem> <Well>
        <form> <FormGroup controlId="writeArticleForm">
            <ControlLabel> Add new followee! </ControlLabel>

            <FormControl
            type="text" placeholder={ "Write name here..." }
            onChange={ _onChange } name={"addFollowee"}
            />
            <Button bsSize="small" onClick={ _addFollowee }
            name={"addFolloweeBtn"}
            > 
            {"Add new followee"}
            </Button>

            <Button bsSize="small" type="reset" >
            { "Clear above text" }
            </Button>
        </FormGroup> </form>
        </Well> </ListGroupItem>
    )
}

newFollowers.propTypes = {
}

export default connect(
    (state) => ({
        loggedInUser: state.profileData.name
    }), 
    (dispatch) => {
        return {
            addFollowee: (name) => {
                addFollowee(name).then((returnedAction) => {
                    dispatch(returnedAction)
                    //we also need to refresh the articles so that
                    //any belonging to the folowee are removed
                    return updateShownArticles(VisModes.REFRESH)
                }).then((articleRefreshAction) => {
                    dispatch(articleRefreshAction)
                })
            }
        }
    }
)(newFollowers)