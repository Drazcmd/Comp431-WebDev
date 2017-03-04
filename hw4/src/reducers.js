import { ActionTypes } from './actions'
const initialItems = require('./data/articles.json')

const Reducer = (state = {
    location: 'LANDING_PAGE',
    articles: initialItems.articles,
    // the one with id=5159532 shouldn't show up!
    visibleArticleIDs: [
        3833265, 2858421, 3675962, 5423165,
        4242601, 2683634, 3744656, 3124181
    ],
    writeArticleView: 'Write an article here',
    temporaryArticles: '',
    personalStatus: 'Feeling Good!!',
    //TODO - refactor these to json file
    profileImg: 'http://www.metalsucks.net/wp-content/uploads/2017/01/obama-smiling.jpg',
    trumpImg: "http://static6.businessinsider.com/image/55918b77ecad04a3465a0a63/nbc-fires-donald-trump-after-he-calls-mexicans-rapists-and-drug-runners.jpg",
    billImg: "http://media.vanityfair.com/photos/5707c9081b83b2c22f99f140/master/pass/t-bill-clinton-the-comeback-id-july-2008.jpg",
    hillImg: "https://img.buzzfeed.com/buzzfeed-static/static/2016-08/11/15/asset/buzzfeed-prod-fastlane01/sub-buzz-2984-1470945284-1.png?resize=625:352"
}, action) => {
    switch (action.type) {
        case ActionTypes.LOCATION_CHANGE:
            console.log("Location change action's reducer")
            return { ...state, location: action.location}

        case ActionTypes.HIDE_ARTICLE:
            console.log("hiding an article", action.articleID)
            return { ...state, visibleArticleIDs: 
                visibleArticleIDs.filter(
                    id => id != action.articleID
                )
            }

        case ActionTypes.SHOW_ARTICLE:
            console.log("Showing an article")
            return 

        case ActionTypes.ADD_ARTICLE:
            console.log("Add (non-persitantly) an article")
            return {
                ...state, writeArticleView: "",
                temporaryArticles: state.writeArticleView
            }

        case ActionTypes.CLEAR_WRITE_VIEW:
            //Note - clears the writing area, not the temp articel
            return {
                ...state, writeArticleView: ""
            }
        /* 
        Replace with this to start making added articles persit 
        case ActionTypes.SUBMIT_ARTICLE:
            console.log("actually adding an article")
            //Concat doesn't mutate, it's functional :)
            return {
                ...state,
                articles: articles.Concat(action.article),
                visibleArticleIDs: visibleArticleIDs.Concat(
                    action.article._id
                ),
                writeArticleView
            }
        */


        default:
            console.log("action:", action.Type)
            return state
    }
}

export default Reducer