import { expect } from 'chai'
import mockery from 'mockery'
import fetch, { mock } from 'mock-fetch'

import { multiUpdateGenerator, multiDownloadGenerator} from './profileActions'

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

// mainly for mocking the ajax call
const username = 'cmd11test'
const headline = 'A new headline!'
const email = 'bob@bobmail.com'
const zipcode = '30333'
const fieldMapping = {
    'username': username,
    'headline': headline,
    'email': email 
}
/*
Could be built automatically from the fieldMapping dict, but I'd
rather have it explicitly visible to make reading this 
easier
*/
const newDataPieces = [ 
    {'username': username, 'headline': headline},
    {'username': username, 'email' : email},
    {'username': username, 'zipcode' : zipcode}
]

it('should update all the profile data piece by piece', (done) => {
    const fieldsToTest = ['headline', 'email', 'zipcode']

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
    //Ensure each one had a dispatch
    expect(fieldsToTest).to.have.length(0)
    done()
})

it('should download all the profile data piece by piece', (done) => {
    const fieldsToTest = ['headline', 'email', 'zipcode']
    const testFieldsDownloaded = function(action) {
        const field = Obj.keys(action.newData)[0]
        expect(action.type).to.eql(actions.DOWNLOAD_PROFILE_DATA)
        fieldsToTest.remove(field)
        done()
    }
    
    const downloadDispatch = function(complexAction) { 
        return complexAction(testFieldsDownloaded)
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
    multiDownloadGenerator(newDataPieces)(updateDispatch)
    //Ensure each one had a dispatch
    expect(fieldsToTest).to.have.length(0)
    done()
})
