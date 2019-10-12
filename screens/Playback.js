import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  ImageBackground
} from 'react-native';
import { Card, Image, ListItem } from 'react-native-elements';
import { Feather } from '@expo/vector-icons';
import Modal from 'react-native-modal';
import PlaybackClass from './PlaybackClass';
import { currentTrack } from '../api/spotify';
import db, { getRoomData, refreshRoomToken, getCurrentSongData } from '../firebase/index';
import Dimensions from 'Dimensions';

const {width, height} = Dimensions.get('window');

export default function Playback(props) {
  const hostName = props.navigation.state.params.hostName;
  const docId = props.navigation.state.params.docId;
  const [songData, setSongData] = useState({});
  const [isPlaying, setPlaying] = useState(false)

  async function getCurrentSongPlaying(id) {
    try {
      await refreshRoomToken(id);
      //let roomData = await getRoomData(id);
      const songPlaying = await getCurrentSongData(id);
      const result = songDataParser(songPlaying.item);
      setSongData(result);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {

    if (isPlaying){

      getCurrentSongPlaying(docId);

    }

  }, []);

  function songDataParser(data) {
    let result = {
      name: data.name,
      id: data.id,
      href: data.href,
      uri: data.uri,
      artist: data.artists[0].name,
      imageUrl: data.album.images[0].url,
      albumName: data.album.name
    };
    return result;
  }

  const [isVisible, setIsVisible] = useState(true);

  function closeModal() {
    setIsVisible(!isVisible);
    props.navigation.navigate('PlaylistRoom');
  }

  // const { width, height } = Dimensions.get('window');

  return (
    <Modal isVisible={isVisible}>
      <StatusBar hidden />
      <ImageBackground
        source={require('../weJayGradient.png')}
        style={{ width: 400, height: 700, alignSelf: 'center' }}
      >
        <View style={styles.container}>
          <TouchableOpacity onPress={() => closeModal()}>
            <Feather name="chevron-down" size={50} color="black" />
          </TouchableOpacity>
          {songData.imageUrl ? <Image
            style={styles.image}
            resizeMode="cover"
            source={{
              uri: songData.imageUrl
            }}
          /> : null}
          <View style={styles.textContainer}>
            <Text
              ellipsizeMode="tail"
              numberOfLines={1}
              style={styles.songName}
            >
              {songData.name}
            </Text>
            <Text
              ellipsizeMode="tail"
              numberOfLines={1}
              style={styles.songArtist}
            >
              {songData.artist}
            </Text>
          </View>
          <View style={{ top: 75 }}>
            <PlaybackClass docId={docId} setPlaying={setPlaying} hostName={hostName} />
          </View>
        </View>
      </ImageBackground>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'flex-start',
    flexDirection: 'column',
    alignItems: 'center',
    height: 700,
    width: 400,
    alignSelf: 'center'
  },
  image: {
    width: 300,
    height: 300,
    marginTop: 40
  },
  songName: {
    fontWeight: 'bold',
    fontSize: 25,
    paddingBottom: 15,
    alignSelf: 'center'
  },
  songArtist: {
    fontSize: 20,
    alignSelf: 'center'
  },
  textContainer: {
    width: 300
  }
});
