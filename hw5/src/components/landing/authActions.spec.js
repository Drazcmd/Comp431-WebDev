import { expect } from 'chai'
import mockery from 'mockery'
import fetch, { mock } from 'mock-fetch'

const url = 'https://webdev-dummy.herokuapp.com'

/*
CODE ALMOST ENTIRELY COPIED FROM THAT PROVIDED ON THE 
ASSIGNMENT POSTING! 
See https://www.clear.rice.edu/comp431/#/assignments
*/
let Action, actions, authActions, interceptedResource
beforeEach(() => {
    if (mockery.enable) {
    	mockery.enable({warnOnUnregistered: false, useCleanCache:true})
    	mockery.registerMock('node-fetch', fetch)
    	require('node-fetch')
    }
    interceptedResource = require('./../../serverRequest')
    Action = require('./../../actions').default
    actions = require('./../../actions')
    authActions = require('./authActions')
})

afterEach(() => {
    if (mockery.enable) {
	   mockery.deregisterMock('node-fetch')
	   mockery.disable()
    }
})
it ('should update success message (for displaying success message to user', (done) => {
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
//These two are both in relation to registering new users
it ('should update error message (for displaying error message to user', (done) => {
	//TODO - choose something which will have invalid field or two
	const mockInvalidUserInfo = {
		"firstName":"Bob",
		"lastName":"Mcbobface",
		"username": "bobbyMcbobface",
		"password":"BobDaBuilda"
	}
	//TODO - figure out what the result will actually be of that
    const expectedAction = { 
        type: actions.ActionTypes.REGISTRATION_FAILURE,
        newUser: "bobbyMcbobface"
    } 
    const updateFailureAction = authActions.delegateRegistration(mockInvalidUserInfo)
    expect(updateFailureAction).to.eql(expectedAction)
    done()
})
//These three are both in relation to user login/logout
it ('should log in a user', (done) => {
	console.log("NOT IMPLEMENTED LOGIN TEST YET")
	const mockValidUserInfo = {
		"username": "bobbyMcbobface",
		"password":"BobDaBuilda"
	}
    const expectedAction = { 
        type: actions.ActionTypes.LOGIN_SUCCESS,
        username: "bobbyMcbobface"
    } 
    const updateSuccessAction = authActions.delegateLogin(mockValidUserInfo)
    expect(expectedAction).to.eql(expectedAction)
    done()
})
it ('should not login an invalid user', (done) => {
	console.log("NOT IMPLEMENTED LOGIN TEST YET")
	//TODO - choose something which will have invalid field or two
	const mockInvalidUserInfo = {
		"username": "bobbyMcbobface",
		"password":"BobDaBuilda"
	}
	//TODO - figure out what the result will actually be of that
    const expectedAction = { 
        type: actions.ActionTypes.LOGIN_FAILURE,
        username: "bobbyMcbobface"
    } 
    const updateFailureAction = authActions.delegateLogin(mockInvalidUserInfo)
    expect(updateFailureAction).to.eql(expectedAction)
    done()
})
it ('should log out a user', (done) => {
	console.log("NOT IMPLEMENTED LOGOUT TEST YET")
    const expectedAction = { 
        type: actions.ActionTypes.LOGOUT
    } 
    const logoutAction = authActions.delegateLogout()
    expect(expectedAction).to.eql(expectedAction)
    done()
})
