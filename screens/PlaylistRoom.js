import React, { useState, useEffect } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image
} from 'react-native';
import { Card, Tile } from 'react-native-elements';
import { Feather } from '@expo/vector-icons';
import { play, next, pause } from '../api/spotify'
import db, { getRoomData } from '../firebase/index'
import Playback from './Playback'
import PlaybackClass from './PlaybackClass'

export default function PlaylistRoom(props) {
  const docId = props.navigation.state.params.docId;
  let [songs, setSongs] = useState([]);
  useEffect(() => {
    let roomRef = db.collection('Rooms').doc(docId);
    console.log('playlist title', props);
    roomRef.collection('Playlist').onSnapshot(snapshot => {
      const items = snapshot.docs.map(doc => doc.data());
      setSongs(items);
    });
  }, []);

  async function playSong(songID){

    console.log('play id', songID)

    let roomData = await getRoomData(docId)

    await play(roomData, songID)

  }

  async function nextSong(){

    let roomData = await getRoomData(docId)
    console.log('you are in nextSong function')
    await next(roomData)

  }

  async function pauseSong(){
    let roomData = await getRoomData(docId)
    console.log('you are in pause function')
    await pause(roomData)
  }

  return (
    <>
      <ScrollView>
        <Tile
          imageSrc={require('../weJayGradient.png')}
          title="Welcome, DJ"
          featured
          caption="Add a Song Below"
          height={200}
        />
        {songs &&
          songs.map(song => (
            <View key={song.id} style={styles.background}>
              <Card style={styles.containerStyle}>
                <View style={styles.songContainer}>
                  <Image
                    style={{ width: 80, height: 80 }}
                    resizeMode="cover"
                    source={{
                      uri: song.imageUrl
                    }}
                  />
                  <View style={{ paddingLeft: 10 }}>
                    <Text
                      ellipsizeMode="tail"
                      numberOfLines={1}
                      style={{
                        paddingTop: 25,
                        fontWeight: 'bold',
                        fontSize: 14,
                        width: 150
                      }}
                    >
                      {song.name}
                    </Text>
                    <Text
                      ellipsizeMode="tail"
                      numberOfLines={1}
                      style={{ fontSize: 12, width: 150 }}
                    >
                      {song.artist}
                    </Text>
                    <Text
                      ellipsizeMode="tail"
                      numberOfLines={1}
                      style={{ fontSize: 12, width: 150 }}
                    >
                      {song.albumName}
                    </Text>
                  </View>
                  <View style={styles.feather}>
                    <Feather name="chevron-up" size={30} color="black" />
                    <Text
                      style={{
                        fontWeight: 'bold',
                        marginLeft: 'auto',
                        paddingRight: 10
                      }}
                    >
                      votes
                    </Text>
                    <Feather name="chevron-down" size={30} color="black" />
                  </View>
                </View>
              </Card>
            </View>
          ))}
      </ScrollView>
      <View style={styles.buttonBackground}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => props.navigation.navigate('SearchScreen', { docId })}
        >
          <Text style={styles.buttonText}>Add A Song</Text>
        </TouchableOpacity>
      </View>
      <View>
        <PlaybackClass docId={docId} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: '#F4F8FF'
  },
  songContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  containerStyle: {
    display: 'flex',
    flexDirection: 'row'
  },
  feather: { marginLeft: 'auto' },
  button: {
    padding: 15,
    backgroundColor: '#FF5857',
    borderRadius: 25,
    width: 200,
    marginBottom: 25,
    marginTop: 20,
    margin: 'auto',
    shadowColor: '#999',
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    alignSelf: 'center'
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 20,
    textAlign: 'center'
  }
  // buttonBackground: {
  //   backgroundColor: '#C9DDFF'
  // }
});
