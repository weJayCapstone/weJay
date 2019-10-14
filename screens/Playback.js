import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  ImageBackground,
  Dimensions
} from 'react-native';
import { Image } from 'react-native-elements';
import { Feather } from '@expo/vector-icons';
import Modal from 'react-native-modal';
import PlaybackClass from './PlaybackClass';
import db from '../firebase/index';
import { connect } from 'react-redux';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

function Playback(props) {
  //const hostName = props.navigation.state.params.hostName;
  const docId = props.docId;
  const [songData, setSongData] = useState({});
  const [isPlaying, setPlaying] = useState(false);

//   async function getCurrentSongPlaying(id) {
//     try {
//       await refreshRoomToken(id);
//       //let roomData = await getRoomData(id);
//       const songPlaying = await getCurrentSongData(id);
//       const result = songDataParser(songPlaying.item);
//       setSongData(result);
//     } catch (err) {
//       console.log(err);
//     }
//   }
  useEffect(() => {
    let roomRef = db.collection('Rooms').doc(docId);
    let unsub = roomRef
        .onSnapshot(snapshot => {
           if(snapshot.data().currentSong){
               setSongData(snapshot.data().currentSong)
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
    <Modal isVisible={isVisible}>
      <StatusBar hidden />
      <ImageBackground
        source={require('../weJayGradient.png')}
        style={{ width: width, height: height, alignSelf: 'center', display: 'flex' }}
      >
        <View style={styles.container}>
          <TouchableOpacity onPress={() => closeModal()}>
            <Feather name="chevron-down" size={50} color="black" />
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
              source={require('../weJay2.png')}
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
          </View>
          <View style={{ top: 75 }}>
            <PlaybackClass
              setPlaying={setPlaying}
            />
          </View>
        </View>
      </ImageBackground>
    </Modal>
  );
}
const mapStateToProps = state => {
    return {
        docId: state.docId
    }
}
export default connect(mapStateToProps)(Playback);

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'flex-start',
    flexDirection: 'column',
    alignItems: 'center',
    height: height,
    width: width,
    alignSelf: 'center'
  },
  image: {
    width: .5* width,
    height: .3 * height,
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
