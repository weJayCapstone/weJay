import * as firebase from 'firebase';
import firestore from 'firebase/firestore';
import {refreshTokens} from '../api/spotify'
// Initialize Firebase
const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: 'wejay-254716',
  };
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
export default db;


//create room
export async function createRoom(roomData) {
        try{
            const newRoom = await db.collection('Rooms').add(roomData);
            //add gives the room a unique ID on firebase
            console.log(`${roomData.title} was created!`)
            //TestRoom gets overwritten, have to check if name exists first or use add() instead
        }catch(err){
            console.log(err)
        }
}
//get room with password and hostName
export async function enterRoom(passcode, roomName, userName) {
    let result = {};
    try{
       let roomRef = db.collection('Rooms');
       //query room via passcode
       let query = await roomRef.where('passcode','==', passcode).where('title','==', roomName).get();
       if(query.empty){
           console.log("room doesn't exist or invalid password");
           return 'Invalid credentials';
       }else {
           query.forEach(doc => {
               roomRef.doc(doc.id).update({userName})
               result = doc.data();
            });
           console.log('You are in the room!');
       }
       return result;
    }catch(err){
        console.log(err)
    }
}

//getRoom data
export const getRoomData = async (docId) => {
    let roomRef = db.collection('Rooms').doc(docId);
    try{
        let result = await roomRef.get();
        return result.data();
    }catch(err){
        console.log(err)
    }
}
//get token
export async function refreshRoomToken(docId){
    try{
        let currentRoomData = await getRoomData(docId);
        let result = await refreshTokens(currentRoomData.refreshToken);
        currentRoomData.accessToken = result.access_token;
        currentRoomData.expiresIn = result.expires_in;
        //update room data
        let roomRef = db.collection('Rooms').doc(docId);
        roomRef.update(currentRoomData)
        return currentRoomData;
    }catch(err){
        console.log(err)
    }
}
//add songs

export async function addSongToDB(roomId, songData) {
    //this version adds duplicates because of add
    try{
       //query room via passcode
        const playlist = db.collection('Rooms').doc(roomId).collection('Playlist');
        await playlist.add({songData})
        console.log('song was added!')
        //return newPlaylist?
    }catch(err){
        console.log(err)
    }
}

//get playlist return array of song objects (ideally?)
export async function getPlaylist(roomName){
    let songArr = [];
    try{
        const playlist = db.collection('Rooms').doc(roomName).collection('Playlist');
        let allSongs = await playlist.get();
        allSongs.forEach(song => {
            songArr.push(song.data())
        })
        
    }catch(err){
        console.log(err)
    }
}


//join playlist route given passcode, roomname,username