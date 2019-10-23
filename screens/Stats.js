import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  FlatList,
  SafeAreaView
} from 'react-native';
import { Divider } from 'react-native-elements';
import { getFinalPlaylist } from '../firebase/index';
import { connect } from 'react-redux';
import { Feather } from '@expo/vector-icons';

function Stats(props) {
  const [playlist, setPlaylist] = useState([]);

  useEffect(() => {
    getPlaylist()
      .then(result => setPlaylist(result))
      .catch(err => console.log(err));
    console.log('plyalist 1', playlist);
  }, []);

  const getPlaylist = async () => {
    try {
      let result = await getFinalPlaylist(props.docId);
      console.log('in comp did mount', result);
      return result;
    } catch (err) {
      console.log(err);
    }
  };

  const getDJs = playlistArr => {
    let results = {};
    playlistArr.forEach(song => (results[song.currentSong.addedBy] = ''));
    return Object.keys(results);
  };
  const getPlaylistDuration = playlistArr => {
    let totalDuration = playlistArr.reduce((sum, song) => {
      return sum + song.currentSong.duration;
    }, 0);
    return Math.floor(totalDuration / 60000) + ' minutes';
  };
  const getLeastPopularSong = playlistArr => {
    let downVoteObj = {};
    let downVoteResults = playlistArr.map(song => {
      let count = 0;
      for (let key in song.currentSong.users) {
        if (song.currentSong.users[key] === 'down') {
          count++;
        }
      }
      downVoteObj[count] = song.currentSong;
      return count;
    });
    downVoteResults.sort();
    console.log(
      'least popular song',
      downVoteObj[downVoteResults[downVoteResults.length - 1]].name
    );
    return downVoteObj[downVoteResults[downVoteResults.length - 1]].name;
  };
  const getMostPopularSong = playlistArr => {
    console.log(playlistArr);
    let obj = {};
    let results = playlistArr.map(song => {
      let count = 0;
      for (let key in song.currentSong.users) {
        if (song.currentSong.users[key] === 'up') {
          count++;
        }
      }
      obj[count] = song.currentSong;
      return count;
    });
    results.sort();
    //most upvoted song, obj properties are getting overwritten
    console.log('most upvoted song', obj);
    let songName = obj[results[results.length - 1]].name;
    return songName;
  };
  const getBestDJ = playlistArr => {
    let obj = {};
    let results = playlistArr.map(song => {
      let count = 0;
      for (let key in song.currentSong.users) {
        if (song.currentSong.users[key] === 'up') {
          count++;
        }
      }
      obj[count] = song.currentSong;
      return count;
    });
    results.sort();
    //most upvoted song, obj properties are getting overwritten
    let user = obj[results[results.length - 1]].addedBy;
    console.log('best DJ', user);
    return user;
  };

  return (
    <ScrollView style={{ display: 'flex', backgroundColor: '#423959' }}>
      <View>
        <Text style={styles.headerText}>Your Playlist Stats</Text>
        <Text
          ellipsizeMode="tail"
          numberOfLines={2}
          style={{
            color: 'white',
            alignSelf: 'center',
            fontSize: 40,
            fontWeight: 'bold',
            paddingTop: 20
          }}
        >
          {props.roomData.title}
        </Text>
        <Divider
          style={{ backgroundColor: '#FF5857', height: 3, marginTop: 30 }}
        />
        {playlist.length > 0 ? (
          <View style={{ display: 'flex' }}>
            <View
              style={{
                alignContent: 'center',
                justifyContent: 'center',
                flexDirection: 'row'
              }}
            >
              <Text style={styles.titles}>Playlist Duration</Text>
              <Feather
                name="clock"
                size={40}
                color="#FF5857"
                style={{
                  paddingLeft: 10,
                  paddingTop: 15
                }}
              />
            </View>
            <Text style={styles.data}>{getPlaylistDuration(playlist)}</Text>
            <Divider
              style={{ backgroundColor: '#FF5857', height: 3, marginTop: 10 }}
            />

            <View
              style={{
                alignContent: 'center',
                justifyContent: 'center',
                flexDirection: 'row'
              }}
            >
              <Text style={styles.titles}>Most Popular Song</Text>
              <Feather
                name="heart"
                size={40}
                color="#FF5857"
                style={{
                  paddingLeft: 10,
                  paddingTop: 15
                }}
              />
            </View>
            <Text style={styles.data}>{getMostPopularSong(playlist)}</Text>

            <Divider
              style={{ backgroundColor: '#FF5857', height: 3, marginTop: 10 }}
            />
            <View
              style={{
                alignContent: 'center',
                justifyContent: 'center',
                flexDirection: 'row'
              }}
            >
              <Text style={styles.titles}>DJ of the Playlist</Text>
              <Feather
                name="award"
                size={40}
                color="#FF5857"
                style={{
                  paddingLeft: 10,
                  paddingTop: 15
                }}
              />
            </View>
            <Text style={styles.data}>{getBestDJ(playlist)}</Text>

            <Divider
              style={{ backgroundColor: '#FF5857', height: 3, marginTop: 10 }}
            />
            <View
              style={{
                alignContent: 'center',
                justifyContent: 'center',
                flexDirection: 'row'
              }}
            >
              <Text style={styles.titles}>Your DJs</Text>
              <Feather
                name="user"
                size={40}
                color="#FF5857"
                style={{
                  paddingLeft: 10,
                  paddingTop: 15
                }}
              />
            </View>
            <SafeAreaView>
              <FlatList
                data={getDJs(playlist)}
                keyExtractor={item => item}
                renderItem={({ item }) => (
                  <Text style={styles.data}>{item}</Text>
                )}
              />
            </SafeAreaView>

            <Divider
              style={{ backgroundColor: '#FF5857', height: 3, marginTop: 10 }}
            />
            <View
              style={{
                alignContent: 'center',
                justifyContent: 'center',
                flexDirection: 'row'
              }}
            >
              <Text style={styles.titles}>Least Popular Song</Text>
              <Feather
                name="thumbs-down"
                size={40}
                color="#FF5857"
                style={{
                  paddingLeft: 10,
                  paddingTop: 15
                }}
              />
            </View>
            <Text
              style={{
                color: '#E9DBFF',
                fontSize: 20,
                paddingTop: 10,
                alignSelf: 'center',
                fontWeight: 'bold',
                marginBottom: 10
              }}
            >
              {getLeastPopularSong(playlist)}
            </Text>
          </View>
        ) : null}
      </View>
    </ScrollView>
  );
}
const mapStateToProps = state => {
  return {
    docId: state.docId,
    roomData: state.roomData
  };
};

const styles = StyleSheet.create({
  headerText: {
    fontSize: 30,
    alignSelf: 'center',
    color: '#E9DBFF',
    fontWeight: 'bold'
  },
  titles: {
    color: 'white',
    fontSize: 32,
    fontWeight: 'bold',
    paddingTop: 20,
    paddingLeft: 10
  },
  data: {
    color: '#E9DBFF',
    fontSize: 25,
    paddingTop: 10,
    alignSelf: 'center',
    fontWeight: 'bold'
  }
});

export default connect(mapStateToProps)(Stats);
