import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  ImageBackground
} from 'react-native';
import { Image } from 'react-native-elements';
import { Feather } from '@expo/vector-icons';
import Modal from 'react-native-modal';
import PlaybackClass from './PlaybackClass';
import db, {
  getRoomData,
  refreshRoomToken,
  getCurrentSongData
} from '../firebase/index';

export default function Playback(props) {
  const hostName = props.navigation.state.params.hostName;
  const docId = props.navigation.state.params.docId;
  const [songData, setSongData] = useState({});
  const [isPlaying, setPlaying] = useState(false);

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
    let roomRef = db.collection('Rooms').doc(docId);
    let unsub = roomRef.onSnapshot(snapshot => {
      if (snapshot.data().currentSong) {
        setSongData(snapshot.data().currentSong);
      }
    });
    // if (isPlaying){

    //   getCurrentSongPlaying(docId);

    // }
    //this might fix the memory leak errors:
    return () => unsub();
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

  return (
    <Modal isVisible={isVisible}>
      <StatusBar hidden />
      <ImageBackground
        source={require('../gradient3.png')}
        style={{
          width: 400,
          height: 700,
          alignSelf: 'center',
          display: 'flex'
        }}
      >
        <View style={styles.container}>
          <TouchableOpacity onPress={() => closeModal()}>
            <Feather name="chevron-down" size={50} color="white" />
          </TouchableOpacity>
          {songData.imageUrl ? (
            <Image
              style={styles.image}
              resizeMode="cover"
              source={{
                uri: songData.imageUrl
              }}
            />
          ) : (
            <Image
              style={styles.wejayLogo}
              resizeMode="cover"
              source={require('../weJay.png')}
            />
          )}
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
            <Text
              ellipsizeMode="tail"
              numberOfLines={1}
              style={styles.songAlbum}
            >
              {songData.albumName}
            </Text>
          </View>
          <View style={{ top: 75 }}>
            <PlaybackClass
              docId={docId}
              setPlaying={setPlaying}
              hostName={hostName}
            />
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
  wejayLogo: {
    width: 300,
    height: 300,
    paddingTop: 100
  },
  songName: {
    fontWeight: 'bold',
    fontSize: 25,
    paddingBottom: 15,
    alignSelf: 'center',
    color: 'white'
  },
  songArtist: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'white'
  },
  songAlbum: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'white'
  },
  textContainer: {
    width: 300
  }
});
