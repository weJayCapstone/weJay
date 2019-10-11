import React, { useState, useEffect } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  FlatList
} from 'react-native';
import { Card, Tile } from 'react-native-elements';
import { Feather } from '@expo/vector-icons';
import db, { getRoomData, subToPlaylist, getPlaylist } from '../firebase/index'
import PlaybackClass from './PlaybackClass'
import SingleSong from './SingleSong'

export default function PlaylistRoom(props) {
  const docId = props.navigation.state.params.docId;
  const userName = props.navigation.state.params.userName;
  let [songs, setSongs] = useState([]);
  useEffect(() => {
    let roomRef = db.collection('Rooms').doc(docId);
    let unsub = roomRef
        .collection('Playlist')
        .orderBy('timeAdded')
        .onSnapshot((snapshot) => {
            const songArr = snapshot.docs.map(doc => doc.data());
            //sort by votes
            songArr.sort((a,b)=> {
                const votesA = a.votes;
                const votesB = b.votes;
                
                let comparison = 0;
                if (votesA > votesB) {
                  comparison = -1;
                } else if (votesA < votesB) {
                  comparison = 1;
                }
                return comparison;
              })
            setSongs(songArr);
        });
    return unsub;
  }, [docId]);
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
          {songs ? (
          <FlatList
            data={songs}
            renderItem={({ item }) => <SingleSong song={item} docId={docId} userName ={userName} />}
            keyExtractor={item => item.id}
          />
          ) : <Text>Search To Add Songs to Your Playlist!</Text> }
        </ScrollView>
      <View style={styles.buttonBackground}>
        <TouchableOpacity
        style={styles.button}
        onPress={() => props.navigation.navigate('SearchScreen', { docId, userName })}
      >
        <Text style={styles.buttonText}>Add A Song</Text>
        </TouchableOpacity>
      </View>
      <View style={{top: 75}}>
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
  },
  vote: {
      color: '#000'
  },
  voteHighlight: {
      color:'#FF5857'
  }
  // buttonBackground: {
  //   backgroundColor: '#C9DDFF'
  // }
});
