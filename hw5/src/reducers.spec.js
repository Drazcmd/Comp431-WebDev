import { expect } from 'chai'
import mockery from 'mockery'
import { ActionTypes, VisModes } from './actions'

//This is hardcoded data only to be used for mocking actions
const testArticles = require('./testData/articles.json')
const testFollowees = require('./testData/followees.json')
const testProfileData = require('./testData/profile.json')

//Note - shouldn't be doing any fetch's here!
let reducer
let mockUninitializedState
beforeEach(() => {
    if (mockery.enable) {
        mockery.enable({warnOnUnregistered: false, useCleanCache:true})
        reducer = require('./reducers')
        mockUninitializedState = {
            location: 'LANDING_PAGE',
            articles: [],
            visibleArticles: [],
            visibilityMode: VisModes.NO_FILTER,
            filterStr: "",  
            profileData: {
                "name":"Anon", 
                "email":"missingEmail@missing.com", 
                "zip":"00000",
                "img": "http://www.clker.com/cliparts/n/T/5/z/f/Y/image-missing-md.png ",
                "status":"missing status"
            },
            followees: [],
            globalErrorMessage: ""
        }
    }
})

afterEach(() => {
    if (mockery.enable) {
        mockery.disable()
    }
})

it('should initialize state', (done) => {
    const mockAction = {
        type: ActionTypes.LOCATION_CHANGE,
        location: 'MAIN_PAGE',
        articles: testArticles,
        profileData: testProfileData,
        followees: testFollowees
    }
    const returnedState = reducer.Reducer(mockUninitializedState, mockAction)
    expect(returnedState.location).to.eql('MAIN_PAGE')
    expect(returnedState.articles).to.eql(testArticles)
    expect(returnedState.followees).to.eql(testFollowees)
    expect(returnedState.profileData).to.eql(testProfileData)
    done()
})
it('should state success (for displaying success message to user)', (done) => {
    expect(1).to.eql(2)
    done()
})
it('should state error (for displaying error message to user)', (done) => {
    const errorMessage = "Testing error functionality"
    const mockAction = {
        type: ActionTypes.UPDATE_ERROR_MESSAGE,
        message: errorMessage
    }
    const returnedState = reducer.Reducer(mockUninitializedState, mockAction)
    expect(returnedState.globalErrorMessage).to.eql(errorMessage)
    done()
})

it('should set the articles', (done) => {
    const newArticles = {"articles":[
        {"_id":3833265,"text":"TESTING 456",
        "date":"2015-06-10T19:26:31.978Z","img":null,
        "comments":[],"author":"cesetest"},
        {"_id":3833260,"text":"TESTING 123",
        "date":"2015-01-10T19:26:31.978Z","img":null,
        "comments":[],"author":"adftest"}
    ]}
    const mockAction = {
        //Refresh should not change filter str or visiblity mode
        type: ActionTypes.UPDATE_SHOWN_ARTICLES,
        articles: newArticles,
        visibilityMode: VisModes.REFRESH,
        filterStr: "asdjfb"
    }
    const returnedState = reducer.Reducer(mockUninitializedState, mockAction)
    expect(returnedState.articles).to.eql(newArticles)
    expect(returnedState.visibilityMode).to.eql(VisModes.NO_FILTER)
    expect(returnedState.filterStr).to.eql("")
    done()
})
it('should set the search keyword', (done) => {
    const mockAction = {
        type: ActionTypes.UPDATE_SHOWN_ARTICLES,
        visibilityMode: VisModes.FIL_TEXT,
        filterStr: "123"
    }
    const returnedState = reducer.Reducer(mockUninitializedState, mockAction)
    expect(returnedState.articles).to.eql([])
    expect(returnedState.visibilityMode).to.eql(VisModes.FIL_TEXT)
    expect(returnedState.filterStr).to.eql("123")
    done()
})

it('should be able to set the search keyword while updating articles',
(done) => {
    const newArticles = {"articles":[
        {"_id":333, "text":"TESTING abcdef",
        "date":"2015-06-10T19:26:31.978Z","img":null,
        "comments":[],"author":"cesetest"},
        {"_id":444,"text":"TESTbobby",
        "date":"2015-01-10T19:26:31.978Z","img":null,
        "comments":[],"author":"adftest"}
    ]}
    const mockAction = {
        type: ActionTypes.UPDATE_SHOWN_ARTICLES,
        visibilityMode: VisModes.FIL_AUTH,
        filterStr: "bobby",
        articles: newArticles
    }
    const returnedState = reducer.Reducer(mockUninitializedState, mockAction)
    expect(returnedState.articles).to.eql(newArticles)
    expect(returnedState.visibilityMode).to.eql(VisModes.FIL_AUTH)
    expect(returnedState.filterStr).to.eql("bobby")
    done()
})
it('should filter displayed articles by the search keyword', (done) => {
    expect(1).to.eql(2)
    done()
})
