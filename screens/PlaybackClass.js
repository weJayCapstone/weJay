import React, { Component } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image
} from 'react-native';
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
import { Feather } from '@expo/vector-icons';

export default class PlaylistClass extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentSong: {},
      songs: [],
      paused: false,
      playButton: true
    };
    this.playSong = this.playSong.bind(this);
    this.nextSong = this.nextSong.bind(this);
    this.pauseSong = this.pauseSong.bind(this);
    this.fetchSongs = this.fetchSongs.bind(this);
    this.setCurrentSong = this.setCurrentSong.bind(this);
    this.resumeSong = this.resumeSong.bind(this);
    this.playbackTimer = this.playbackTimer.bind(this)
  }

//   fetchSongs = async () => {
//     let roomData = await getRoomData(this.props.docId);
//     let tracks = await getPlaylistTracks(roomData);

//     this.setState({ songs: tracks });
//   };

//   setCurrentSong = async () => {
//     let roomData = await getRoomData(this.props.docId);
//     let playing = await currentTrack(roomData);
//     this.setState({ currentSong: playing });
//     console.log('state current time in', this.state.currentSong.progress_ms);
//   };

//   playSong = async () => {
//     await this.fetchSongs();

//     console.log('state songs in play song, ', this.state.songs);
//     let song = this.state.songs[0];
//     console.log('this is song in playsong', song);
//     let roomData = await getRoomData(this.props.docId);

//     await play(roomData, song);
//   };

//   nextSong = async () => {
//     let roomData = await getRoomData(this.props.docId);
//     let currentSong = await this.state.songs[0];

//     await shiftPlaylist(roomData, currentSong);

//     await this.playSong();
//   };

//   pauseSong = async () => {
//     let roomData = await getRoomData(this.props.docId);
//     await this.setCurrentSong();
//     this.setState({ paused: true });
//     await pause(roomData);
//   };

//   resumeSong = async () => {
//     let song = this.state.songs[0];
//     let roomData = await getRoomData(this.props.docId);
//     let progress = this.state.currentSong.progress_ms;

//     await resume(roomData, song, progress);

//     this.setState({ paused: false });
//   };

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

  //ADDED THIS TO HIDE PLAY BUTTON AFTER INITIAL PRESS TO START MUSIC
  hidePlayButton() {
    this.playSong();
    this.setState({ playButton: false });
  }

  render() {
    // console.log('this is state', this.state.songs);

    return (
      <View style={styles.icons}>
        <TouchableOpacity onPress={() => this.hidePlayButton()}>
          <View>
            {this.state.playButton ? (
              <Feather name="play" size={50} color="#FF5857" />
            ) : null}
          </View>
        </TouchableOpacity>

        {!this.state.paused ? (
          <TouchableOpacity onPress={() => this.pauseSong()}>
            <View style={styles.pause}>
              <Feather name="pause" size={50} color="#FF5857" />
            </View>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => this.resumeSong()}>
            <View style={styles.pause}>
              <Feather name="play" size={50} color="#FF5857" />
            </View>
          </TouchableOpacity>
        )}

        <TouchableOpacity onPress={() => this.nextSong()}>
          <View>
            <Feather name="skip-forward" size={50} color="#FF5857" />
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  icons: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  pause: {
    paddingLeft: 25,
    paddingRight: 25
  }
});
