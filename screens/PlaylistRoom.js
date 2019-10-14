import React, { useState, useEffect } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  ImageBackground
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import db, { refreshRoomToken, getCurrentSongData } from '../firebase/index';
import SingleSong from './SingleSong';

export default function PlaylistRoom(props) {
  const docId = props.navigation.state.params.docId;
  const userName = props.navigation.state.params.userName;
  const hostName = props.navigation.state.params.hostName;
  const title = props.navigation.state.params.title;

  let [songs, setSongs] = useState([]);
  useEffect(() => {
    let roomRef = db.collection('Rooms').doc(docId);
    let unsub = roomRef
      .collection('Playlist')
      .orderBy('timeAdded')
      .onSnapshot(snapshot => {
        const songArr = snapshot.docs.map(doc => doc.data());
        //sort by votes
        songArr.sort((a, b) => {
          const votesA = a.votes;
          const votesB = b.votes;

          let comparison = 0;
          if (votesA > votesB) {
            comparison = -1;
          } else if (votesA < votesB) {
            comparison = 1;
          }
          return comparison;
        });
        roomRef.update({ queue: songArr });
        setSongs(songArr);
      });
    return unsub;
  }, [docId]);

  PlaylistRoom.navigationOptions = {
    headerRight: (
      <TouchableOpacity
        onPress={() => {
          props.navigation.navigate('Playback', { docId, hostName });
        }}
      >
        <View style={styles.headerContainer}>
          <Text style={styles.nowPlayingText}>Now Playing</Text>
          <Feather
            name="music"
            size={30}
            color="#4392F1"
            style={styles.musicnote}
          />
        </View>
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

  if (hostName) {
    return (
      <>
        <ScrollView>
          <ImageBackground
            source={require('../weJayGradient.png')}
            style={{ height: 200, display: 'flex', flexDirection: 'column' }}
          >
            <Text
              style={{
                fontSize: 30,
                fontWeight: 'bold',
                color: 'white',
                alignSelf: 'center',
                alignContent: 'center',
                paddingTop: 55
              }}
              ellipsizeMode="tail"
              numberOfLines={2}
            >
              Welcome, DJ {hostName}
            </Text>
            {/* <Text
              style={{
                fontSize: 20,
                color: "white",
                alignSelf: "center",
                paddingTop: 10
              }}
            >
              Now Playing: {songData.Title}
            </Text> */}
            <Text
              style={{
                fontSize: 20,
                color: 'white',
                alignSelf: 'center',
                paddingTop: 30
              }}
            >
              Add a Song to {title} Below
            </Text>
          </ImageBackground>
          {songs ? (
            <FlatList
              data={songs}
              renderItem={({ item }) => (
                <SingleSong song={item} docId={docId} userName={userName} />
              )}
              keyExtractor={item => item.id}
            />
          ) : (
            <Text>Search To Add Songs to Your Playlist!</Text>
          )}
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
  } else {
    return (
      <>
        <ScrollView>
          <ImageBackground
            source={require('../weJayGradient.png')}
            style={{ height: 200, display: 'flex', flexDirection: 'column' }}
          >
            <Text
              style={{
                fontSize: 30,
                fontWeight: 'bold',
                color: 'white',
                alignSelf: 'center',
                alignContent: 'center',
                paddingTop: 55
              }}
              ellipsizeMode="tail"
              numberOfLines={2}
            >
              Welcome, DJ {userName}
            </Text>
            {/* <Text
              style={{
                fontSize: 20,
                color: "white",
                alignSelf: "center",
                paddingTop: 10
              }}
            >
              Now Playing: {songData.Title}
            </Text> */}
            <Text
              style={{
                fontSize: 20,
                color: 'white',
                alignSelf: 'center',
                paddingTop: 30
              }}
            >
              Add a Song to {title} Below
            </Text>
          </ImageBackground>
          {songs ? (
            <FlatList
              data={songs}
              renderItem={({ item }) => (
                <SingleSong song={item} docId={docId} userName={userName} />
              )}
              keyExtractor={item => item.id}
            />
          ) : (
            <Text>Search To Add Songs to Your Playlist!</Text>
          )}
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
  headerContainer: {
    display: 'flex',
    flexDirection: 'row'
  },
  feather: { marginLeft: 'auto' },
  nowPlayingText: {
    color: '#4392F1',
    fontSize: 18,
    paddingRight: 3,
    paddingTop: 5
  },
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
