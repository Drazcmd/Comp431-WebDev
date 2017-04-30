import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { Col, Button, Well, ListGroupItem } from 'react-bootstrap';
import { FormGroup, FormControl, ControlLabel } from 'react-bootstrap'
import { addArticle, updateShownArticles, VisModes } from '../../actions'

export const filterArticlesBox = ({filterStr, filterArticles }) => {
    /*
    Not actual state - none of these get stored anywhere
    or do anything until the user actually clicks the 'filter'
    butt, at which point these are used. Think of this as a
    method of keeping the onscreen stuff the user is typing in
    available at a moment's glance. Temporary data, in other words -
    not state
    */
    let writeView = filterStr
    function _onChangeText(e) {
        writeView=e.target.value;
    }   
    function _updateShownArticles(filterMode){
        filterArticles(filterMode, writeView)
    }
    const _NoFilter = () => {_updateShownArticles(VisModes.NO_FILTER)}
    const _ByAuthor = () => {_updateShownArticles(VisModes.FIL_AUTH)}
    const _ByText = () => _updateShownArticles(VisModes.FIL_TEXT)

    return (
        <ListGroupItem> <Well bsSize="small">
        <form> <FormGroup controlId="writeArticleForm">
          <ControlLabel> 
          Filter articles here (currently filter string is '{writeView}'):
          </ControlLabel>
          <FormControl
           type="text" placeholder={ "Write filter string here..." }
           onChange={ _onChangeText }
           />

          <br />
          <Button onClick={ _NoFilter} >
            {"Remove any filter"}
          </Button>

          <Button bsStyle="success" onClick={ _ByText }>
            {"Filter By Text"}
          </Button>

          <Button bsStyle="success" onClick={ _ByAuthor } >
            {"Filter By Author!"}
          </Button>
        </FormGroup> </form>
        </Well> </ListGroupItem>
    )
}

filterArticlesBox.propTypes = {
}

export default connect(
    (state) => ({
        filterStr: state.filterStr
    }),
    (dispatch) => {
        return {
            filterArticles: (mode, newFilterStr) => {
                updateShownArticles(mode, newFilterStr)
                .then(returnedAction => {
                    dispatch(returnedAction)
                })

            }
        }
    }
)(filterArticlesBox)
