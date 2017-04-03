import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { Well, Grid, Row, Col } from 'react-bootstrap'
import { Button, FormGroup, FormControl, ControlLabel } from 'react-bootstrap'
import { updateStatus } from '../../actions'
//This component is the picture, status, and name of the 
//currently logged in user that appears on the main page
export const MiniProfile = ({ 
    profileName, profileStatus, profileImgSrc, updateStatus
}) => {
    const profileImgWidth="200"
    const profileImgHeight="133"
    let newStatus;
    const _updateStatus = () => {
        updateStatus(newStatus ? newStatus.value : "")
    }
    return (
        <Well>
        <Col>
            <img height={ profileImgHeight }
            width={ profileImgWidth } src={ profileImgSrc } />
        </Col>
        <Col>
            <span> <h2>
                { profileName }, your current status is: '{ profileStatus }' 
            </h2> </span>

            <form> <FormGroup controlId="writeStatusForm">
                <ControlLabel> Update your status? </ControlLabel>
                <FormControl
                    type="text" placeholder={ "Write status here.." }
                    inputRef={(_newStatus) => {newStatus = _newStatus}} />
                <br />

                <Button bsStyle="success" type="reset" 
                    onClick={ _updateStatus } >
                    {"Update Status"}
                </Button>
                <Button type="reset" > { "Clear text" } </Button>
            </FormGroup> </form>
        </Col>
        </Well>
    )
}

MiniProfile.propTypes = {
}

export default connect(
    (state) => ({ 
        profileName: state.profileData.name,
        profileStatus: state.profileData.status,
        profileImgSrc: state.profileData.img
    }),
    (dispatch) => {
        return {
            updateStatus: ((newStatus) => {
                updateStatus(newStatus).then(returnedAction => {
                    dispatch(returnedAction)
                })
            })
        }
    }
)(MiniProfile)