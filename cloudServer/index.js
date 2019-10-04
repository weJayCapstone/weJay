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


//add playlist of songs
export async function createRoom(roomName, passcode, hostid, token) {
        try{
            const newRoom = await db.collection('Rooms').doc(roomName).set({passcode, hostid, token});
            // let setRoom = rooms.doc('newRoom').set({
            //     RoomId: 2, 
            //     "Spotify Token": "BQC3TfzpQWaoL6tWosdouXmJkbrpi7Vd1WHyDlwAnzQzmhYLPlE9pCAWLzvyyJayTCJnDScXCCXs8m35HBk9DHVuK5Cg2TaxvRuPt_4RNj9QDZMwSetIqlDbviW1uSFnffOnlmAwzSCk3uP-fOurAiuyI9yU4lZW76wa5ENPEZk7xbVVvqeadNIly1irTKfxc9fT5yFiqP8zLhRS2nJs",
            //     UserId:1 
            //   });
           if(newRoom.exists){
               console.log(`${roomName} was created!`, newRoom.data())
           }else{
               console.log('not made?')
           }
        }catch(err){
            console.log(err)
        }
}
//get room
async function getRoom(roomName) {
    try{
        let roomRef = db.collection('Rooms').doc(roomName);
            let getDoc = await roomRef.get()
            if (!getDoc.exists) {
                console.log('No such document!');
            } else {
                console.log('Document data:', doc.data());
            }
    }catch(err){
        console.log(err)
    }
}


//get token
async function fetchDB(){
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

export async function addSong(song, roomName) {
    try{
        const playlist = db.collection('Rooms').doc(roomName).collection('Playlist');
        await playlist.add({song})
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

//create room and playlist
export async function createRoom(data){
    try{

    }catch(err){

    }
}

//join playlist route given passcode, roomname,username