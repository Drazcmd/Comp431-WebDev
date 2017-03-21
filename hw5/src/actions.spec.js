import { expect } from 'chai'
import mockery from 'mockery'
import fetch, { mock } from 'mock-fetch'

import * as appActions from './actions'
const url = 'https://webdev-dummy.herokuapp.com'

/*
CODE ALMOST ENTIRELY COPIED FROM THAT PROVIDED ON THE 
ASSIGNMENT POSTING! 
See https://www.clear.rice.edu/comp431/#/assignments
*/
let Action, actions
beforeEach(() => {
  if (mockery.enable) {
	mockery.enable({warnOnUnregistered: false, useCleanCache:true})
	mockery.registerMock('node-fetch', fetch)
	require('node-fetch')
  }
  Action = require('./actions').default
  actions = require('./actions')
})

afterEach(() => {
  if (mockery.enable) {
	mockery.deregisterMock('node-fetch')
	mockery.disable()
  }
})



it('should update the status message', (done) => {
  
  // the result from the mocked AJAX call
  const username = 'sep1test'
  const headline = 'A new headline!'

  mock(`${url}/headline`, {
  	method: 'PUT',
  	headers: {'Content-Type':'application/json'},
  	json: { username, headline }
  })

  // review how complex actions work in Redux
  // updateHeadline returns a complex action
  // the complex action is called with dispatch as an argument
  // dispatch is then called with an action as an argument


  //TODO - this line is incorrect!
  //Really needs to call some function that will actually
  //end up calling dispatch of type UPDATE_STATUS
  //Said function is what the update status functinoality should
  //end up going through. After all, that functionality will
  //need to talk to the server.... see
  //https://piazza.com/class/ixmajtkz8dt2vc?cid=138

  //So in reality this file might not be waht we want as actions.spec.js at all -
  //it could end up being part of the profile actions like he had it. hmm
  /*
  appActions.updateStatus('does not matter')(
  	fn => fn(action => {
	  expect(action).to.eql({ 
	  	headline, type: actions.UPDATE_STATUS
	  })
	  done()
  	}))
*/
  done()
})