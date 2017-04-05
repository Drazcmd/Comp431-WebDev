import React from 'react'
import { render } from 'react-dom'

import { Provider } from 'react-redux'
import createLogger from 'redux-logger'
import { createStore, applyMiddleware } from 'redux'

import Reducer from './reducers'
import AppRoot from './approot'


//Creates a Redux store that holds the complete state tree of your app.
//There should only be a single store in your app. 
//const store = createStore(Reducer)
const logger = createLogger()
const store = createStore(Reducer, applyMiddleware(logger))
//'When rendering, we will wrap our root component inside a <Provider>
//to make the store available to all components in the component "tree"'
render(
    <Provider store={store}>
        <AppRoot />
    </Provider>,
    document.getElementById('app')
)
