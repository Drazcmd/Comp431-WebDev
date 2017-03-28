import { expect } from 'chai'
import mockery from 'mockery'
import { ActionTypes, VisModes } from './../../actions'
import { displayedArticles } from './feedFilters'
describe("test3", () => {
//This is hardcoded data only to be used for mocking actions
const testArticles = [
    {"_id":333, "text":"TESTING abcdef",
    "date":"2015-06-10T19:26:31.978Z","img":null,
    "comments":[],"author":"cesetest"},
    {"_id":445, "text":"TESTbobby",
    "date":"2015-02-10T19:26:31.978Z","img":null,
    "comments":[],"author":"saaa"},
    {"_id":444,"text":"TESTTTTbobby",
    "date":"2015-08-10T19:26:31.978Z","img":null,
    "comments":[],"author":"saaa"}
]
beforeEach(() => {
    if (mockery.enable) {
        mockery.enable({warnOnUnregistered: false, useCleanCache:true})
    }
})
afterEach(() => {
    if (mockery.enable) {
        mockery.disable()
    }
})
it('should filter displayed articles by the search keyword', (done) => {
	expect(displayedArticles(
		testArticles, 
		VisModes.FIL_AUTH, "aaa"
	)).to.eql([
	    {"_id":444,"text":"TESTTTTbobby",
	    "date":"2015-08-10T19:26:31.978Z","img":null,
	    "comments":[],"author":"saaa"},
	    {"_id":445, "text":"TESTbobby",
	    "date":"2015-02-10T19:26:31.978Z","img":null,
	    "comments":[],"author":"saaa"}
	])
	done()
})
})
