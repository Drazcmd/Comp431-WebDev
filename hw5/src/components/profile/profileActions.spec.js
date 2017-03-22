import { expect } from 'chai'
import mockery from 'mockery'
import fetch, { mock } from 'mock-fetch'

import { multiUpdateGenerator } from './profileActions'

const url = 'https://webdev-dummy.herokuapp.com'
let Action, actions
beforeEach(() => {
    if (mockery.enable) {
        mockery.enable({warnOnUnregistered: false, useCleanCache:true})
        mockery.registerMock('node-fetch', fetch)
        require('node-fetch')
    }
    Action = require('./../../actions').default
    actions = require('./../../actions')
})

afterEach(() => {
    if (mockery.enable) {
        mockery.deregisterMock('node-fetch')
        mockery.disable()
    }
})

it('should update the profile data all at once', (done) => {
    const fieldsToTest = ['headline', 'email', 'zipcode']

    // for the result from the mocked AJAX call
    const username = 'cmd11test'
    const headline = 'A new headline!'
    const email = 'bob@bobmail.com'
    const zipcode = '30333'
    const fieldMapping = {
        'username': username,
        'headline': headline,
        'email': email 
    }
    //TODO - might be able to build from the mapping?
    const newDataPieces = [ 
        {'username': username, 'headline': headline},
        {'username': username, 'email' : email},
        {'username': username, 'zipcode' : zipcode}
    ]

    /**
    See piazza @138
    'This is the "interesting" bit. This is also a "mock" of dispatch.
    */
    const testFieldsUpdated = function(action) {
        const field = Obj.keys(action.newData)[0]
        const expectedNewData = {
            field: fieldMapping.field
        }
        expect(action).to.eql({
            expectedNewData, type: actions.UPDATE_PROFILE_DATA
        })
        fieldsToTest.remove(field)
        switch(action.field) {
            case 'headline':
                expect(action.newData.field).to.be(headline);
                break;
            case 'email':
                expect(action.newData.field).to.be(email);
                break;
            case 'zipcode':
                expect(action.newData.field).to.be(zipcode);
                break;
        }
        expect(fieldsToTest).to.have.length(0)
      done()
    }

    /** 
    'This just handles complex actions that call complex actions (that take
    dispatch as an argument). The real dispatch does something similar to this'
    */
    const updateDispatch = function(complexAction) { 
        return complexAction(testFieldsUpdated)
    }

    //Now mock the call:
    newDataPieces.forEach((dataPiece, index) => {
        const field = Object.keys(dataPiece).filter((key) => {
            return key != 'username'
        })[0]
        const fieldVal = fieldMapping[field]
        //mock up the responses to the 3 PUT fetch calls we intercept
        mock(`${url}/${fieldVal}`, {
            method: 'PUT',
            headers: {'Content-Type':'application/json'},
            json: { username, fieldVal } 
        })
    })

    //call our complex action with our mock of dispatch, which
    //will test our stuff using testFieldUpdate
    multiUpdateGenerator(newDataPieces)(updateDispatch)
    done()
})
