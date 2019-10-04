import * as firebase from 'firebase';
import firestore from 'firebase/firestore'
// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDRE85AhiqgPdSW_aY7OhGf3Ev3F9uTTq4",
    authDomain: "wejay-254716.firebaseapp.com",
    projectId: "wejay-254716",
  };
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
export default db;


//create room
export async function createRoom(roomData) {
        try{
            const newRoom = await db.collection('Rooms').add(roomData);
            //add gives the room a unique ID on firebase
            console.log(`${roomData.roomName} was created!`)
            //TestRoom gets overwritten, have to check if name exists first or use add() instead
        }catch(err){
            console.log(err)
        }
}
//get room
async function getRoom(passcode) {
    try{
       let roomRef = db.collection('Rooms');
       //query room via passcode
       let query = await roomRef.where('passcode','==', passcode).get();
       if(query.empty){
           console.log("room doesn't exist or invalid password");
       }else {
           console.log(query.data());
       }
    }catch(err){
        console.log(err)
    }
}


//get token
async function fetchToken(){
    try{
        let roomsRef =  db.collection('Rooms').doc(roomName);
        let result = await roomsRef.get();
        if(!result.exists) console.log('no document!')
        else {
            let thing = result.data();
            return thing["Spotify Token"];
        }
    }catch(err){
        console.log(err)
    }
}
//add songs

export async function addSong(passcode, songData) {
    //this version adds duplicates because of add
    try{
        let roomRef = db.collection('Rooms');
       //query room via passcode
        let query = await roomRef.where('passcode','==', passcode).get();
        query.collection('Playlist').add(songData)
        //const playlist = db.collection('Rooms').doc(roomName).collection('Playlist');
        await playlist.add({song})
        console.log('song was added!')
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
            songArr.push(song)
        })
    }catch(err){
        console.log(err)
    }
}


//join playlist route given passcode, roomname,username