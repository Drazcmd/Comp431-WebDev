import { expect } from 'chai'
import mockery from 'mockery'
import fetch, { mock } from 'mock-fetch'
describe("Test AuthActions", () => {
const url = 'https://webdev-dummy.herokuapp.com'

/*
CODE ALMOST ENTIRELY COPIED FROM THAT PROVIDED ON THE 
ASSIGNMENT POSTING! 
See https://www.clear.rice.edu/comp431/#/assignments
*/
let actions, authActions, resource
beforeEach(() => {
    if (mockery.enable) {
    	mockery.enable({warnOnUnregistered: false, useCleanCache:true})
    	mockery.registerMock('node-fetch', fetch)
    	require('node-fetch')
    }
    actions = require('./../../actions')
    authActions = require('./authActions')
    resource = require('./../../serverRequest')
})

afterEach(() => {
    if (mockery.enable) {
	   mockery.deregisterMock('node-fetch')
	   mockery.disable()
    }
})
//These two are both in relation to registering new users
it ('should display error if input registration data is invalid)', (done) => {
	//TODO - choose something which will have invalid field or two
	const mockInvalidUserInfo = {
		"firstName":"",
		"lastName":"",
		"username": "bobbyMcbobface",
		"password":"BobDaBuilda"
	}
    const expectedAction = { 
        type: actions.ActionTypes.UPDATE_ERROR_MESSAGE
    } 
    const updateFailureAction = authActions.delegateRegistration(mockInvalidUserInfo)
    expect(updateFailureAction).to.be.ok
    expect(updateFailureAction.type).to.eql(expectedAction.type)
    done()
})
it ('should update success message (for displaying success message to user)', (done) => {
    const mockValidUserInfo = {
        "firstName":"Bob",
        "lastName":"Mcbobface",
        "username": "bobbyMcbobface",
        "password":"BobDaBuilda"
    }
    const expectedAction = { 
        type: actions.ActionTypes.REGISTRATION_SUCCESS,
        newUser: "bobbyMcbobface"
    } 
    const updateSuccessAction = authActions.delegateRegistration(mockValidUserInfo)
    expect(expectedAction).to.eql(expectedAction)
    done()
})
//These three are both in relation to user login/logout
const username = "bobbyMcbobface"
const password = "BobDaBuilda"
it ('should log in a user', (done) => {
    //TODO - Not implemented yet
    done()
})
it ('should not login an invalid user', (done) => {
    mock(`${url}/login`, {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        status: 402
    })
    const expectedAction = { 
        type: actions.ActionTypes.UPDATE_ERROR_MESSAGE,
        message: '"Error" when logging in'
    } 
    actions.login(username, password)
    .then((returnedAction) => {
        expect(returnedAction).to.be.ok
        expect(returnedAction.type).to.be.ok
        expect(returnedAction.type).to.eql('UPDATE_ERROR_MESSAGE')
        done()
    }).catch(error => {
        done(error)
    })
})
it ('should log out a user', (done) => {
    mock(`${url}/logout`, {
        method: 'PUT',
        headers: {'Content-Type':'application/json'}
    })
    actions.logout().then((returnedAction) => {
        expect(returnedAction).to.be.ok
        expect(returnedAction.type)
        expect(returnedAction.type).to.eql(actions.ActionTypes.LOCATION_CHANGE)
        expect(returnedAction.newLocation).to.be.ok
        expect(returnedAction.newLocation).to.eql('LANDING_PAGE')
        done()
    }).catch((error) => {
        done(error)
    })
})
})
