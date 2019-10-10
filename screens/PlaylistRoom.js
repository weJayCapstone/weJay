import React, { useState, useEffect } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image
} from 'react-native';
import { Card } from 'react-native-elements';
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
    roomRef
        .collection('Playlist')
        .onSnapshot((snapshot)=> {
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
    <ScrollView>
      {songs &&
        songs.map(song => (
          <View key={song.id} >
            {/* <TouchableOpacity onPress={() => playSong(song.id)}> */}
            <TouchableOpacity>
            <Card style={styles.card} >
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
                    style={{
                      paddingTop: 25,
                      fontWeight: 'bold',
                      fontSize: 14
                    }}
                    numberOfLines={1}
                    ellipsizeMode="tail"
                  >
                    {song.name}
                  </Text>
                  <Text style={{ fontSize: 12 }}>{song.artist}</Text>
                  <Text
                    numberOfLines={1}
                    ellipsizeMode="tail"
                    style={{ fontSize: 12 }}
                  >
                    {song.albumName}
                  </Text>
                </View>
                <View style={{ marginLeft: 'auto' }}>
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
            </TouchableOpacity>
          </View>
        ))}

      <TouchableOpacity
        style={styles.button}
        onPress={() => props.navigation.navigate('SearchScreen', { docId })}
      >
        <Text>Add A Song</Text>
      </TouchableOpacity>

      {/* <TouchableOpacity
        style={styles.button}
        onPress={() => nextSong()}
      >
        <Text>Next</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => pauseSong()}
      >
        <Text>Pause</Text>
      </TouchableOpacity> */}
      <PlaybackClass docId={docId} />

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  songContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  card: {},
  button: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 25,
    width: 150,
    marginBottom: 100,
    marginTop: 25,
    marginLeft: 10,
    textAlign: 'center'
  }
});
