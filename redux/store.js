import {createStore, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'

//action const
const SET_DOCID ='SET_DOCID';
const SET_USERNAME ='SET_USERNAME';
const SET_SONGDOCID = 'SET_SONGDOCID';


//action creators 
export const setDocId = (docId) => {
    return {
        type: SET_DOCID,
        docId
    }
}

const reducer = (state ={} , action) => {
    switch (action.type) {
        case SET_DOCID:
          return {...state, docId: action.docId}
        case SET_USERNAME:
          return {...state, userName: action.userName}
        case SET_SONGDOCID:
          return {...state, songDocId: action.songDocId}
        default:
          return state;
      }
  }
  const middleware = applyMiddleware(createLogger({collapsed: true}));

  const store = createStore(reducer, middleware)
  
  export default store;