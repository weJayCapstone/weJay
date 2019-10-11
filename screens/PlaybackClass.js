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
            paused: false,
            playing: null
        }
        this.playSong = this.playSong.bind(this)
        this.nextSong = this.nextSong.bind(this)
        this.pauseSong = this.pauseSong.bind(this)
        this.fetchSongs = this.fetchSongs.bind(this)
        this.setCurrentSong = this.setCurrentSong.bind(this)
        this.resumeSong = this.resumeSong.bind(this)
        this.playbackTimer = this.playbackTimer.bind(this)
    }

    componentDidUpdate(){

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
    }

    playbackTimer = (songTime) => {

        console.log('this is songTime', songTime)
        console.log('this is this.state.songs.length', this.state.songs.length)

        setTimeout(function(){
            if (this.state.songs.length > 1){
                console.log('this is inside the timeout')
                this.nextSong()
            }
        }.bind(this), songTime)

    }

    playSong = async () => {

        try {
            let roomData = await refreshRoomToken(this.props.docId)
            console.log('songs before fetch', this.state.songs)
            await this.fetchSongs();
            console.log('songs after fetch', this.state.songs)
            let song = this.state.songs[0]
            console.log(roomData);
            await play(roomData, song);

            await this.setCurrentSong()
            const songLength = this.state.currentSong.item.duration_ms
            this.playbackTimer(songLength)

            console.log('does this work in play song? ', this.state.songs)

        } catch (err){
            console.log(err);
        }
    }

    nextSong = async () => {

        let roomData = await getRoomData(this.props.docId)
        let currentSong = this.state.currentSong.item.uri

        await shiftPlaylist(roomData, currentSong)

        await this.playSong()

    }

    pauseSong = async () => {
        let roomData = await getRoomData(this.props.docId)
        await this.setCurrentSong()
        this.setState({paused: true})
        this.setState({songs: []})
        this.playbackTimer()
        await pause(roomData)
    }

    resumeSong = async () => {
        await this.fetchSongs()
        //let song = this.state.songs[0]
        let song = this.state.currentSong.item.uri
        console.log('this is song in resume', song)
        let roomData = await getRoomData(this.props.docId)
        let progress = this.state.currentSong.progress_ms

        let remainingTime = this.state.currentSong.item.duration_ms - progress

        await resume(roomData, song, progress)
        this.playbackTimer(remainingTime)

        this.setState({paused: false})
    }


    render(){
        return (
        <View style={{display: 'flex', justifyContent: 'center',alignItems: 'center', bottom: 100, flexDirection: 'row'}}>
            <TouchableOpacity onPress={() => this.playSong()}>
                <View style={{margin: 5}}>
                    <Text>Play</Text>
                </View>
            </TouchableOpacity>


            {!this.state.paused ?
            <TouchableOpacity onPress={() => this.pauseSong()}>
                <View style={{margin: 5}}>
                    <Text>Pause</Text>
                </View>
            </TouchableOpacity> :

            <TouchableOpacity onPress={() => this.resumeSong()}>
            <View style={{margin: 5}}>
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
