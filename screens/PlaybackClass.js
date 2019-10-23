import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import {
  playSong,
  nextSong,
  pauseSong,
  resumeSong
} from '../playback/playbackControls';
import { Feather } from '@expo/vector-icons';
import { connect } from 'react-redux';
import { setPlaying } from '../redux/store';

class PlaylistClass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      paused: false,
      playButton: !this.props.isPlaying
    };
  }

  handlePause() {
    this.setState({ paused: true });
    pauseSong(this.props.docId);
  }

  handleResume() {
    this.setState({ paused: false });
    resumeSong(this.props.docId);
  }

  hidePlayButton() {
    playSong(this.props.docId);
    this.props.setPlaying(true);
    this.setState({ playButton: false });
  }

  render() {
    const hostName = this.props.roomData.hostName;
    const userName = this.props.userName;
    if (userName === hostName) {
      //set current song here in db make a new song queue with shifted array
      return (
        <View style={styles.icons}>
          <TouchableOpacity onPress={() => this.hidePlayButton()}>
            <View>
              {this.state.playButton ? (
                <Feather name="play" size={80} color="#423959" />
              ) : null}
            </View>
          </TouchableOpacity>

          {!this.state.paused ? (
            <TouchableOpacity onPress={() => this.handlePause()}>
              <View style={styles.pause}>
                <Feather name="pause" size={80} color="#423959" />
              </View>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={() => this.handleResume()}>
              <View style={styles.pause}>
                <Feather name="play" size={80} color="#423959" />
              </View>
            </TouchableOpacity>
          )}

          <TouchableOpacity onPress={() => nextSong(this.props.docId)}>
            <View>
              <Feather name="skip-forward" size={80} color="#423959" />
            </View>
          </TouchableOpacity>
        </View>
      );
    } else {
      return (
        <View style={styles.guest}>
          <Feather name="speaker" size={25} color="#423959" />
          <Text style={styles.nowPlaying}>Now Playing</Text>
        </View>
      );
    }
  }
}
const mapStateToProps = state => {
  return {
    docId: state.docId,
    roomData: state.roomData,
    userName: state.userName,
    isPlaying: state.isPlaying
  };
};
const mapDispatchToProps = dispatch => {
  return {
    setPlaying: bool => dispatch(setPlaying(bool))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlaylistClass);

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
    color: '#423959',
    paddingLeft: 5,
    fontWeight: 'bold'
  }
});
