import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { Button, FormGroup, FormControl, 
    ControlLabel, Well } from 'react-bootstrap'
import { updateAvatar, dispError } from '../../actions'

export const ProfileImgSection = ({ profileImgSrc, setAvatar}) => {
    const profileImgWidth="500"
    const profileImgHeight="300"
    let newAvatar;
    const _setAvatar = () => {
        if (newAvatar) {
            //doing newAvatar.value instead would return a fake path string
            //(Won't crash if no file inputted, will just pass along a null)
            setAvatar(newAvatar.files[0])
        }
    }
    return (
        <Well>
        <img height={ profileImgHeight }
        width={ profileImgWidth } src={ profileImgSrc} />
        <form> <FormGroup controlId="pictureUpdateForm">
            <ControlLabel> Upload a new profile image: </ControlLabel>
            <FormControl 
                type="file"
                inputRef={_newAvatar => {newAvatar = _newAvatar}} 
            />
            <Button onClick = {_setAvatar}>
                { "Upload new avatar" }
            </Button>
        </FormGroup> </form>
        </Well>
    )
}

ProfileImgSection.propTypes = {
}

export default connect(
    (state) => ({ 
        profileImgSrc: state.profileData.img
    }), (dispatch) => {
        return {
            setAvatar: (newAvatar) => {
                if (newAvatar) {
                    updateAvatar(newAvatar)
                    .then(returnedEvent => {
                        dispatch(returnedEvent)
                    })
                } else {
                    dispatch(dispError("Select a valid image file to upload!"))
                }
            }
        }
    }
)(ProfileImgSection)