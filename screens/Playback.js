import React, { useState, useEffect } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image
} from 'react-native';
import db, { getRoomData } from '../firebase/index'
import { play, next, pause, currentTrack, getPlaylistTracks } from '../api/spotify'

export default function Playback(props){
  

//roomData.playlistID will only show up when song is added

  let [currentSong, setCurrentSong] = useState({})
  let [songs, setSongs] = useState([])

    useEffect(() => {

        const fetchRoomData = async () => {
            let roomData = await getRoomData(props.docId)
            let playing = await currentTrack(roomData)
            setCurrentSong(playing)
        }

        // const fetchSongs = async () => {
            // let roomData = await getRoomData(props.docId)
            // let tracks = await getPlaylistTracks(roomData)
        //     let tracksArr = []

        //     if (tracks.length){
        //         tracks.items.forEach(function(el){
        //             tracksArr.push(el.track.uri)
        //         })
        //     }

        //     console.log('this is tracksArr', tracks)
        //     setSongs(tracks)
        // }

        fetchRoomData()
        //fetchSongs()
        console.log('state songs: ', songs)

  }, [])

    const fetchSongs = async () => {
        let roomData = await getRoomData(props.docId)
        let tracks = await getPlaylistTracks(roomData)
        let tracksArr = []

        if (tracks.length){
            tracks.items.forEach(function(el){
                tracksArr.push(el.track.uri)
            })
        }

        console.log('this is tracksArr', tracksArr)
        setSongs(tracksArr)
    }

  async function playSong (){

    await fetchSongs();

    console.log('state songs in play song, ', songs)
    let song = songs[0]
    console.log('this is song in playsong', song)
    let roomData = await getRoomData(props.docId)

    await play(roomData, song)

  }

  async function nextSong (){

    let roomData = await getRoomData(props.docId)
    console.log('you are in nextSong function')
    await next(roomData)
    let playing = await currentTrack(roomData)
    setCurrentSong(playing)
  }

  async function pauseSong (){
    let roomData = await getRoomData(props.docId)
    console.log('you are in pause function')
    await pause(roomData)
  }


    return (
    <View style={{display: 'flex', justifyContent: 'center', alignItems: 'center', bottom: 100}}>
      <TouchableOpacity onPress={() => playSong()}>
        <View>
            <Text>Play</Text>
        </View>
      </TouchableOpacity>

        <TouchableOpacity onPress={() => pauseSong()}>
            <View>
                <Text>Pause</Text>
            </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => nextSong()}>
            <View>
                <Text>Skip</Text>
            </View>
        </TouchableOpacity>
    </View>
    )

}

