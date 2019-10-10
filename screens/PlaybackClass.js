import React, { Component } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image
} from 'react-native';
import db, { getRoomData, refreshRoomToken } from '../firebase/index'
import { play, next, pause, currentTrack, getPlaylistTracks, shiftPlaylist, resume } from '../api/spotify'

export default class PlaybackClass extends Component {

    constructor(props){
        super(props)

        this.state = {
            currentSong: {},
            songs: [],
            paused: false
        }
        this.playSong = this.playSong.bind(this)
        this.nextSong = this.nextSong.bind(this)
        this.pauseSong = this.pauseSong.bind(this)
        this.fetchSongs = this.fetchSongs.bind(this)
        this.setCurrentSong = this.setCurrentSong.bind(this)
        this.resumeSong = this.resumeSong.bind(this)
    }

    fetchSongs = async () => {
        
        let roomData = await getRoomData(this.props.docId)
        let tracks = await getPlaylistTracks(roomData)

        this.setState({songs: tracks})

    }

    setCurrentSong = async () => {

        let roomData = await getRoomData(this.props.docId)
        let playing = await currentTrack(roomData)
        this.setState({currentSong: playing})
        console.log('state current time in', this.state.currentSong.progress_ms)

    }


    playSong = async () => {

        await this.fetchSongs();
    
        console.log('state songs in play song')
        let song = this.state.songs[0]
        console.log('this is song in playsong', song)
        try{
            let roomData = await refreshRoomToken(this.props.docId)
            console.log(roomData);
            await play(roomData, song);
        }catch(err){
            console.log(err);
        }
    }

    nextSong = async () => {

        let roomData = await getRoomData(this.props.docId)
        let currentSong = await this.state.songs[0]

        await shiftPlaylist(roomData, currentSong)

        await this.playSong()

    }

    pauseSong = async () => {
        let roomData = await getRoomData(this.props.docId)
        await this.setCurrentSong()
        this.setState({paused: true})
        await pause(roomData)
    }

    resumeSong = async () => {

        let song = this.state.songs[0]
        let roomData = await getRoomData(this.props.docId)
        let progress = this.state.currentSong.progress_ms

        await resume(roomData, song, progress)

        this.setState({paused: false})
    }


    render(){

        console.log('this is state', this.state.songs)

        return (
        <View style={{display: 'flex', justifyContent: 'center', alignItems: 'center', bottom: 100}}>
            <TouchableOpacity onPress={() => this.playSong()}>
                <View>
                    <Text>Play</Text>
                </View>
            </TouchableOpacity>


            {!this.state.paused ?
            <TouchableOpacity onPress={() => this.pauseSong()}>
                <View>
                    <Text>Pause</Text>
                </View>
            </TouchableOpacity> :

            <TouchableOpacity onPress={() => this.resumeSong()}>
            <View>
                <Text>Resume</Text>
            </View>
            </TouchableOpacity>
            }


            <TouchableOpacity onPress={() => this.nextSong()}>
                <View>
                    <Text>Skip</Text>
                </View>
            </TouchableOpacity>
            
        </View>

        )
    }
}
