import db, { getRoomData, refreshRoomToken } from '../firebase/index';

import {
    play,
    next,
    pause,
    currentTrack,
    getPlaylistTracks,
    shiftPlaylist,
    resume
  } from '../api/spotify';

  let timeout;

  const playbackTimer = (songTime) => {
  
      timeout = setTimeout(function(){
          //const firestoreArray = get songs from firestore
          if (firestoreArray.length > 1){
              nextSong()
          }
  
      }, songTime)
  
  }

export const playSong = async (docId) => {

    try {
        let roomData = await refreshRoomToken(docId)
        
        //remove first item from the sorted songs array in firestore
        //set the removed item as currentSong in firestore
        //let song = await getCurrentSong from firestore

        //call spotify api to play song
        await play(roomData, song);

        
        //const songLength = currentSong.length from firesotre
        playbackTimer(songLength)

    } catch (err){
        console.log(err);
    }
}

export const nextSong = async () => {


    await playSong()

}

export const pauseSong = async (docId) => {
    let roomData = await getRoomData(docId)

    let playing = await currentTrack(roomData)
    //need to reset firestore currentsong with the variable above so that the progress_ms property is updated

    //this kills the timer
    clearTimeout(timeout)

    //need roomData to send access token to spotify api
    await pause(roomData)
}

export const resumeSong = async (docId) => {
    
    let roomData = await getRoomData(docId)
    //let song = currentSong in firestore.uri
    
    //let progress = firestore Currentsong.progress_ms

    //let remainingTime = firestore currentSong.item.duration_ms - progress

    await resume(roomData, song, progress)
    playbackTimer(remainingTime)
}
