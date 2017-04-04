import { expect } from 'chai'
import mockery from 'mockery'
import { ActionTypes, VisModes } from './actions'
import { displayedArticles } from './components/main/feedFilters'
//reducer doesn't ever fetch so this should be safe
import { Reducer, defaultState } from './reducers'
//This is hardcoded data only to be used for mocking actions
const testArticles = require('./testData/articles.json')
const testFollowees = require('./testData/followees.json')
const testProfileData = require('./testData/profile.json')

describe('Test Reducers', () => {

//Note - shouldn't be doing any fetch's here!
let actions, mockUninitializedState
beforeEach(() => {
    if (mockery.enable) {
        mockery.enable({warnOnUnregistered: false, useCleanCache:true})
        mockUninitializedState = defaultState
        actions = require('./actions')
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
        newLocation: 'MAIN_PAGE',
        articles: testArticles,
        profileData: testProfileData,
        followees: testFollowees
    }
    //since I internally call stuff differently
    const expectedProfileData = {
        email: testProfileData.email,
        img: testProfileData.img,
        name: testProfileData.name,
        status: testProfileData.status,
        zip: testProfileData.zipcode
    }
    const returnedState = Reducer(mockUninitializedState, mockAction)
    expect(returnedState.location).to.eql('MAIN_PAGE')
    expect(returnedState.articles).to.eql(testArticles)
    expect(returnedState.followees).to.eql(testFollowees)
    expect(returnedState.profileData).to.eql(expectedProfileData)
    done()
})
it('should state success (for displaying success message to user)', (done) => {
    //I assume this has to do with the registration 'success but unimplemented' error message
    const firstHalf = `Your registration inputs were valid, but the `
    const secondHalf = `server's registration feature isn't working yet`
    const successErrorMsg = firstHalf + secondHalf
    const expectedAction = {type: ActionTypes.UPDATE_ERROR_MESSAGE, message:successErrorMsg}
    const mockAction = actions.notifyRegSuccess("bobby")
    const returnedState = Reducer(mockUninitializedState, mockAction)
    expect(returnedState.globalErrorMessage).to.eql(successErrorMsg)
    done()
})
it('should state error (for displaying error message to user)', (done) => {
    const errorMessage = "Testing error functionality"
    const mockAction = {
        type: ActionTypes.UPDATE_ERROR_MESSAGE,
        message: errorMessage
    }
    const returnedState = Reducer(mockUninitializedState, mockAction)
    expect(returnedState.globalErrorMessage).to.eql(errorMessage)
    done()
})

it('should set the articles', (done) => {
    const newArticles = [
        {"_id":3833265,"text":"TESTING 456",
        "date":"2015-06-10T19:26:31.978Z","img":null,
        "comments":[],"author":"cesetest"},
        {"_id":3833260,"text":"TESTING 123",
        "date":"2015-01-10T19:26:31.978Z","img":null,
        "comments":[],"author":"adftest"}
    ]
    const mockAction = {
        //Refresh should not change filter str or visiblity mode
        type: ActionTypes.UPDATE_SHOWN_ARTICLES,
        articles: newArticles,
        visibilityMode: VisModes.REFRESH,
        filterStr: "asdjfb"
    }
    const returnedState = Reducer(mockUninitializedState, mockAction)
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
    const returnedState = Reducer(mockUninitializedState, mockAction)
    expect(returnedState.articles).to.eql([])
    expect(returnedState.visibilityMode).to.eql(VisModes.FIL_TEXT)
    expect(returnedState.filterStr).to.eql("123")
    done()
})
it('should clear state on change to landing (i.e. logout)', (done) => {
    const mockInitializedState = {
        location: 'MAIN_PAGE',
        articles: [],
        visibleArticles: [],
        visibilityMode: VisModes.FIL_AUTH,
        filterStr: "abcd",  
        profileData: {
            "name":"SUP", 
            "email":"mil@mis.c", 
            "zip":"00010",
            "img": "http://www.clker.com/cliparts/n/T/5/z/f/Y/image-missing-md.png ",
            "status":"I did something!"
        },
        followees: [],
        globalErrorMessage: "YEP, you had an error"
    }
    const mockAction = {
        type: ActionTypes.LOCATION_CHANGE,
        newLocation: 'LANDING_PAGE'
    }
    const returnedState = Reducer(mockInitializedState, mockAction)
    //Note the difference (hard to spot) - INitialized going to UNinitialized
    expect(returnedState).to.eql(mockUninitializedState)
    done()
})

it('should be able to set the search keyword while updating articles',
(done) => {
    const newArticles = [
        {"_id":333, "text":"TESTING abcdef",
        "date":"2015-06-10T19:26:31.978Z","img":null,
        "comments":[],"author":"cesetest"},
        {"_id":444,"text":"TESTbobby",
        "date":"2015-01-10T19:26:31.978Z","img":null,
        "comments":[],"author":"adftest"}
    ]
    const mockAction = {
        type: ActionTypes.UPDATE_SHOWN_ARTICLES,
        visibilityMode: VisModes.FIL_AUTH,
        filterStr: "bobby",
        articles: newArticles
    }
    const returnedState = Reducer(mockUninitializedState, mockAction)
    expect(returnedState.articles).to.eql(newArticles)
    expect(returnedState.visibilityMode).to.eql(VisModes.FIL_AUTH)
    expect(returnedState.filterStr).to.eql("bobby")
    done()
})

/* 
The filter logic, which is not being tested explicitly here, is done on the
fly from functions outside the component this idea was suggested to me by Dr.
Pollack when talking about hw4. If it were here, the 'it' would be 'should
filter displayed articles by the search keyword'
*/

})
