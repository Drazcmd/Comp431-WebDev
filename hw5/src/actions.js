import { resource } from './serverRequests/serverRequest'
import { 
    getMainData, getProfileData, updateFields
} from './serverRequests/dataFetching'

export const MAIN_PAGE = 'MAIN_PAGE'
export const PROFILE_PAGE = 'PROFILE_PAGE'
export const LANDING_PAGE = 'LANDING_PAGE'
export const ERROR = 'ERROR'

export const VisModes = {
    REFRESH : 'REFRESH',
    FIL_AUTH : 'FILTER_BY_AUTHOR',
    FIL_TEXT : 'FILTER_BY_TEXT',
    NO_FILTER : 'NO_FILTER'
}

export const ActionTypes = {
    LOCATION_CHANGE: 'LOCATION_CHANGE',
    ADD_ARTICLE: 'ADD_ARTICLE',
    UPDATE_STATUS: 'UPDATE_STATUS',
    UPDATE_PROFILE_DATA: 'UPDATE_PROFILE_DATA',
    DOWNLOAD_PROFILE_DATA: 'DOWNLOAD_PROFILE_DATA',
    UPDATE_SHOWN_ARTICLES: 'UPDATE_SHOWN_ARTICLES',
    UPDATE_FOLLOWEES: "UPDATE_FOLLOWEES",
    LOGOUT: "LOGOUT",
    LOGIN: "LOGIN",
    UPDATE_ERROR_MESSAGE: 'UPDATE_ERROR_MESSAGE'
}

/* 
As a reminder to help explain what on earth all this is for,
"Actions are payloads of information that send data from
your application to your store. They are the only source of information for
the store. You send them to the store using store.dispatch().
...
Actions are plain JavaScript objects. Actions must have a type property that
indicates the type of action being performed.
...
Action creators are exactly that—functions that create actions. It's easy to
conflate the terms “action” and “action creator,” so do your best to use the
proper term.
In Redux action creators simply return an action:
*/

const createLocAction = ((newLocation, fetchedData) => {
    //Might not be fetching data if going to landing, therefore it needs 
    //to work if only passed newLocation as an input arg
    return fetchedData ? {
        ...fetchedData,
        type: ActionTypes.LOCATION_CHANGE,
        newLocation: newLocation
    } : {
        type: ActionTypes.LOCATION_CHANGE,
        newLocation: newLocation
    }
})
export const updateLocation = (newLocation) => {
    if (newLocation === MAIN_PAGE) {
        //We need to update two things: the articles and the followee data
        //However, to do the latter, we first need the names of our folowees
        return resource('GET', 'following')
        .then(r => {
            //(the way following works is that it only returns the
            //usernames, not any of the other data (avatar/headline))
            const followeesNames = r.following
            //Now we can actually fetch all our main data
            return getMainData(followeesNames)
        }).then(fetchedData => {
            return createLocAction(newLocation, fetchedData)
        }).catch(error => {
            console.log(error)
            return dispError(error)
        })
    } else if (newLocation === PROFILE_PAGE) {
        //profile data is comparatively much much simpler to fetch
        return getProfileData().then(fetchedData => {
            return createLocAction(newLocation, fetchedData)
        }).catch(error => {
            console.log(error)
            return dispError(error)
        })
    } else if (newLocation === LANDING_PAGE) {
        //should have already logged out before this part!
        return createLocAction(newLocation)
    } else {
        return dispError("Invalid place to navigate to")
    }
}
export const addArticle = (newArticle) => {
    const payload = {
        text: newArticle.text
    }
    return resource('POST', 'article', payload)
    .then(r => {
        return updateShownArticles(VisModes.REFRESH)
    }).catch(error => {
        console.log(error)
        return dispError(error)
    })
}
export const updateStatus = (newStatus) => {
    return { type: ActionTypes.UPDATE_STATUS, newStatus }
}
export const updateProfileData = (fieldValueObjs) => {
    console.log(fieldValueObjs)
    //Delegate to dataFetching.js for the (currently 2) PUT requests
    //Each tuple is of form {fieldToUpdate: valueToBeUpdatedTo}
    return updateFields(fieldValueObjs).then(newProfileData => {
        //And now we update state based off what the server sends back
        //(note that fetchResponses comes from a Promise.all())
        return {
            type: ActionTypes.UPDATE_PROFILE_DATA, 
            newProfileData: newProfileData
        }
    }).catch(error => {
        console.log(error)
        return dispError(error)
    })
}
export const updateShownArticles = (
    visibilityMode, filterStr, optionallyArticles
) => {
    //No matter what operation we're updaitng for, 
    //even if it's just to sort, we might as well refresh the feed
    console.log("optional articles???", optionallyArticles) 
    return resource('GET', 'articles/')
    .then(r => {
        const articles = r.articles
        return {
            type: ActionTypes.UPDATE_SHOWN_ARTICLES,
            visibilityMode, filterStr, articles
        }
    }).catch(error => {
        console.log(error)
        return dispError(error)
    })
}

/**
Followee operations basically require an entire refresh of the data
that is displayed on the main page (articles and followees)
Technically there is some repeated code between these, but
given the way that it's part of the promise chain at best we
wouldn't really be able to re-use more than a line or two. Plus
in the future we don't neccessarily want changing functionality
of one remove to affect add and vice-versa
*/
export const removeFollowee = (name) => {
    return resource('GET', `headlines/${name}`)
    .then(r => {
        return resource('DELETE', `following/${name}`)
    }).then(r => {
        const resultingFollowees = r.following
        return getMainData(resultingFollowees)
    }).then(fetchedData => {
        //the component's responsible for dispatching another
        //update articles action after this action
        return {
            type: ActionTypes.UPDATE_FOLLOWEES,
            resultingFollowees: fetchedData.followees
        }
    }).catch(error => {
        console.log(error)
        return dispError(error)
    })
}
export const addFollowee = (name) => {
    return resource('GET', `headlines/${name}`)
    .then(r => {
        return resource('PUT', `following/${name}`) 
    })
    .then(r => {
        const resultingFollowees = r.following
        return getMainData(resultingFollowees)
    }).then(fetchedData => {
        //see above note regarding updating articles
        return {
            type: ActionTypes.UPDATE_FOLLOWEES,
            resultingFollowees: fetchedData.followees
        }
    }).catch(error => {
        console.log(error)
        return dispError(error)
    })
}
/* 
Input ought to look something like:
{
    'username' : 'cmd11test',
    'headline' : 'TESTING'
}
*/
export const downloadProfileData = (field, user) => {
    return {type: ActionTypes.DOWNLOAD_DATA, field, user}
}
//Although possibly successful, it's not actually implemented on
//the server's side - so it'll always display an error msg
export const notifyRegSuccess = (newUser) => {
    const firstHalf = `Your registration inputs were valid, but the `
    const secondHalf = `server's registration feature isn't working yet`
    const msg = firstHalf + secondHalf
    return {type: ActionTypes.UPDATE_ERROR_MESSAGE, message:msg}
}
export const logout = () => {
    //TODO - clear stuff?
    console.log("gotta clear stuff still")
    return resource('PUT', 'logout')
    .then(r => {
        return updateLocation(LANDING_PAGE)
    }).catch(r => {
        console.log('caught something...')
        return updateLocation(LANDING_PAGE)
    })
}

const requestProfile = (username) => {
    const profileData = resource('GET', 'headlines/')
    .then(jsonData => {
        console.log(jsonData) 
    })
    console.log(profileData)
    return profileData

}

export const login = (username, password) => {
    return resource('POST', 'login', { username, password })
    .then(r => resource('GET', 'headlines/'))
    .then(r => {
      const user = r.headlines[0]
      const message = `you are logged in as ${user.username} "${user.headline}"`
      return updateLocation(MAIN_PAGE)
    })
    .catch(r => {
        const message = `"${r.message || 'Error'}" when logging in`
        console.log("caught something!!")
        //return dispError(message)
        return updateLocation(MAIN_PAGE)

    })
}

export const dispError = (message) => {
    return {type: ActionTypes.UPDATE_ERROR_MESSAGE, message:message}
}
