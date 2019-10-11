import React, { useState, useEffect } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  Image
} from 'react-native';
import { Card, Tile } from 'react-native-elements';
import { Feather } from '@expo/vector-icons';
import db from '../firebase/index';
import SingleSong from './SingleSong';

import { getRoom } from '../firebase/index';

export default function PlaylistRoom(props) {
  const docId = props.navigation.state.params.docId;
  console.log('params', props.navigation.state.params);
  const userName = props.navigation.state.params.userName;

  let [songs, setSongs] = useState([]);
  let [loading, setLoading] = useState(true);
  //   let [downvote, setDownvote] = useState(false);
  useEffect(() => {
    let roomRef = db.collection('Rooms').doc(docId);
    roomRef
      .collection('Playlist')
      .orderBy('timeAdded')
      // .orderBy('votes', 'desc')
      .onSnapshot(snapshot => {
        const songArr = snapshot.docs.map(doc => doc.data());
        console.log('im in the snapshot');
        snapshot.forEach(doc =>
          roomRef
            .collection('Playlist')
            .doc(doc.id)
            .set(
              {
                users: {
                  [userName]: null
                }
              },
              { merge: true }
            ));
        setLoading(false);
        setSongs(songArr);
      });
  }, [docId]);

  PlaylistRoom.navigationOptions = {
    headerRight: (
      <TouchableOpacity
        onPress={() => {
          props.navigation.navigate('Playback', { docId });
        }}
      >
        <Feather
          name="music"
          size={30}
          color="#4392F1"
          style={styles.musicnote}
        />
      </TouchableOpacity>
    ),
    headerLeft: (
      <TouchableOpacity
        onPress={() => {
          props.navigation.navigate('Home');
        }}
      >
        <Feather name="chevron-left" size={32} color="#4392F1" />
      </TouchableOpacity>
    )
  };

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
            renderItem={({ item }) => (
              <SingleSong song={item} docId={docId} userName={userName} />
            )}
            keyExtractor={item => item.id}
          />
        ) : null}
      </ScrollView>
      <View style={styles.buttonBackground}>
        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            props.navigation.navigate('SearchScreen', { docId, userName })
          }
        >
          <Text style={styles.buttonText}>Add A Song</Text>
        </TouchableOpacity>
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
    color: '#FF5857'
  },
  musicnote: {
    paddingRight: 10
  }
});
