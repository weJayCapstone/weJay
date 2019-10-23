import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  ImageBackground,
  ScrollView
} from 'react-native';
import { Image } from 'react-native-elements';
import { Feather } from '@expo/vector-icons';
import Modal from 'react-native-modal';
import PlaybackClass from './PlaybackClass';
import db from '../firebase/index';
import { connect } from 'react-redux';
import TextTicker from 'react-native-text-ticker';

function Playback(props) {
  const docId = props.docId;
  const [songData, setSongData] = useState({});
  const [isPlaying, setPlaying] = useState(false);

  useEffect(() => {
    let roomRef = db.collection('Rooms').doc(docId);
    let unsub = roomRef.onSnapshot(snapshot => {
      if (snapshot.data().currentSong) {
        setSongData(snapshot.data().currentSong);
      }
    });
    return () => unsub();
  }, []);

  const [isVisible, setIsVisible] = useState(true);

  function closeModal() {
    setIsVisible(!isVisible);
    props.navigation.navigate('PlaylistRoom');
  }

  return (
    <ScrollView style={{ backgroundColor: '#423959' }}>
      <Modal isVisible={isVisible}>
        <StatusBar hidden />
        <ImageBackground
          source={require('../weJayGradient.png')}
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
              {/* <Text
              ellipsizeMode="tail"
              numberOfLines={1}
              style={styles.songName}
            >
              {songData.name}
            </Text> */}
              <View style={{ display: 'flex', alignItems: 'center' }}>
                <TextTicker
                  style={{
                    display: 'flex',
                    fontSize: 20,
                    color: 'white',
                    paddingTop: 15
                  }}
                  duration={15000}
                  loop
                  repeatSpacer={30}
                  marqueeDelay={1000}
                >
                  {songData.name}
                </TextTicker>
              </View>
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
            <View style={{ top: 40 }}>
              <PlaybackClass setPlaying={setPlaying} />
            </View>
          </View>
        </ImageBackground>
      </Modal>
    </ScrollView>
  );
}
const mapStateToProps = state => {
  return {
    docId: state.docId
  };
};
export default connect(mapStateToProps)(Playback);

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
    width: 350,
    height: 350, //may need to fix this for my screen
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
