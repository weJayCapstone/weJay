import { getRoomData, refreshRoomToken, setCurrentSong, getCurrentSongData, pauseCurrentSong } from '../firebase/index'
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

  const playbackTimer = (songTime, docId) => {

      timeout = setTimeout(function(){
          //const firestoreArray = get songs from firestore
              nextSong(docId)
  
      }, songTime)
  
  }

export const playSong = async (docId) => {

    try {
        let roomData = await refreshRoomToken(docId)
        
        //remove first item from the sorted songs array in firestore
        //set the removed item as currentSong in firestore
        //let song = await getCurrentSong from firestore
        let song = await setCurrentSong(roomData, docId)


        //call spotify api to play song
        await play(roomData, song);
        
        playbackTimer(song.duration, docId)

    } catch (err){
        console.log(err);
    }
}

export const nextSong = async (docId) => {


    await playSong(docId)

}

export const pauseSong = async (docId) => {
    let roomData = await getRoomData(docId)

    let playing = await currentTrack(roomData)

    let progress = playing.progress_ms

    await pauseCurrentSong(docId, progress)
    //need to reset firestore currentsong with the variable above so that the progress_ms property is updated

    //this kills the timer
    clearTimeout(timeout)

    //need roomData to send access token to spotify api
    await pause(roomData)
}

export const resumeSong = async (docId) => {
    
    let roomData = await getRoomData(docId)
    let song = getCurrentSongData()
    
    let progress = song.progress
    let remainingTime = song.duration - progress

    await resume(roomData, song, progress)
    playbackTimer(remainingTime)
}