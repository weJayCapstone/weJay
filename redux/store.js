import {createStore, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import { getRoomData } from '../firebase/index';

//action const
const SET_DOCID ='SET_DOCID';
const SET_USERNAME ='SET_USERNAME';
const SET_HOSTNAME = 'SET_HOSTNAME';
const SET_ROOMDATA = 'SET_ROOMDATA';


//action creators 
export const setDocId = (docId) => {
    return {
        type: SET_DOCID,
        docId
    }
}
export const setRoomData = (roomData) => {
    return {
        type: SET_ROOMDATA,
        roomData
    }
}

export const setUserName = (userName) => {
    return {
        type: SET_USERNAME,
        userName
    }
}
export const setHostName = (hostName) => {
    return {
        type: SET_HOSTNAME,
        hostName
    }
}
//thunks
export const fetchRoomDataThunk = docId => {
    return async dispatch => {
        try{
            let roomData = await getRoomData(docId);
            dispatch(setRoomData(roomData));
        }catch(err){
            console.log(err)
        }
    }
}

const reducer = (state ={} , action) => {
    switch (action.type) {
        case SET_DOCID:
          return {...state, docId: action.docId}
        case SET_USERNAME:
          return {...state, userName: action.userName}
        case SET_ROOMDATA:
          return {...state, roomData: action.roomData}
        default:
          return state;
      }
  }
  const middleware = applyMiddleware(thunkMiddleware,createLogger({collapsed: true}));

  const store = createStore(reducer, middleware)
  
  export default store;