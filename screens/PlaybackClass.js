import React, { Component } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image
} from 'react-native';
import { playSong, nextSong, pauseSong, resumeSong } from '../playback/playbackControls'

import { Feather } from '@expo/vector-icons';


export default class PlaylistClass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      paused: false,
      playButton: true
    };
  }


  //ADDED THIS TO HIDE PLAY BUTTON AFTER INITIAL PRESS TO START MUSIC
  hidePlayButton() {
    playSong(this.props.docId);
    this.setState({ playButton: false });
  }

  render() {
    // console.log('this is state', this.state.songs);

    if (this.props.hostName) {
    //set current song here in db make a new song queue with shifted array
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
            <TouchableOpacity onPress={() => pauseSong(this.props.docId)}>
              <View style={styles.pause}>
                <Feather name="pause" size={50} color="#FF5857" />
              </View>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={() => resumeSong(this.props.docId)}>
              <View style={styles.pause}>
                <Feather name="play" size={50} color="#FF5857" />
              </View>
            </TouchableOpacity>
          )}

          <TouchableOpacity onPress={() => nextSong(this.props.docId)}>
            <View>
              <Feather name="skip-forward" size={50} color="#FF5857" />
            </View>
          </TouchableOpacity>
        </View>
      );
    } else {
      return (
        <View style={styles.guest}>
          <Feather name="speaker" size={20} color="#FF5857" />
          <Text style={styles.nowPlaying}>Currently Playing</Text>
        </View>
      );
    }
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
  },
  guest: {
    flexDirection: 'row'
  },
  nowPlaying: {
    fontSize: 20,
    color: '#FF5857',
    paddingLeft: 3
  }
});
