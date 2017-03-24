import { expect } from 'chai'
import mockery from 'mockery'
import { ActionTypes } from './actions'
//Note - shouldn't be doing any fetch's here!
let reducer
beforeEach(() => {
    if (mockery.enable) {
        mockery.enable({warnOnUnregistered: false, useCleanCache:true})
        reducer = require('./reducers')
    }
})

afterEach(() => {
    if (mockery.enable) {
        mockery.disable()
    }
})

it('should confirm navigation worked', (done) => {
    const mockAction = {
        type: ActionTypes.LOCATION_CHANGE,
        location: 'MAIN_PAGE'
    }
    const mockState = {
        location: 'LANDING_PAGE'
    }
    const returnedState = reducer.Reducer(mockState, mockAction)
    expect(returnedState).to.eql({location: 'MAIN_PAGE'})
    done()
})
it('should initialize state', (done) => {
    expect(1).to.eql(2)
    done()
})
it('should state success (for displaying success message to user)', (done) => {
    expect(1).to.eql(2)
    done()
})
it('should state error (for displaying error message to user)', (done) => {
    expect(1).to.eql(2)
    done()
})
it('should set the articles', (done) => {
    expect(1).to.eql(2)
    done()
})
it('should set the search keyword', (done) => {
    expect(1).to.eql(2)
    done()
})
it('should filter displayed articles by the search keyword', (done) => {
    expect(1).to.eql(2)
    done()
})
