import React, { useState, useEffect } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  ImageBackground,
  SafeAreaView
} from 'react-native';
import { connect } from 'react-redux';
import { Feather } from '@expo/vector-icons';
import db from '../firebase/index';
import SingleSong from './SingleSong';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp
} from 'react-native-responsive-screen';

function PlaylistRoom(props) {
  const docId = props.docId;
  const userName = props.userName;
  const roomData = props.roomData || {};

  let title;
  if (props.roomData) {
    title = props.roomData.title;
  }
  let [songs, setSongs] = useState([]);
  let [songData, setSongData] = useState({});
  useEffect(() => {
    let roomRef = db.collection('Rooms').doc(docId);
    let unsubFromSong = roomRef.onSnapshot(snapshot => {
      if (snapshot.data().currentSong) {
        setSongData(snapshot.data().currentSong);
      }
    });
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
    return () => {
      unsubFromSong();
      unsub();
    };
  }, [docId]);

  const goToStats = () => {
    props.navigation.navigate('Stats');
  };

  return (
    <>
      <ScrollView style={styles.background}>
        <ImageBackground
          source={require('../weJayGradient.png')}
          style={{
            height: hp('28%'),
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center'
          }}
          resizeMode="stretch"
        >
          <Text
            style={{
              fontSize: hp('4.2%'),
              fontWeight: 'bold',
              color: 'white',
              alignSelf: 'center',
              alignContent: 'center'
            }}
            ellipsizeMode="tail"
            numberOfLines={2}
          >
            {title}
          </Text>

          {songData.id ? (
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignContent: 'flex-end',
                justifyContent: 'center'
              }}
            >
              <Feather
                name="speaker"
                size={18}
                color="white"
                style={{ alignSelf: 'center', paddingTop: 15 }}
              />
              <Text
                style={{
                  fontSize: 16,
                  color: 'white',
                  paddingTop: 15,
                  maxWidth: 300,
                  alignSelf: 'flex-start'
                }}
                ellipsizeMode="tail"
                numberOfLines={1}
              >
                Now Playing: {songData.name}
              </Text>
            </View>
          ) : null}
          <Text
            style={{
              fontSize: hp('2.2%'),
              color: 'white',
              alignSelf: 'center',
              paddingTop: 15,
              maxWidth: 300
            }}
          >
            Welcome, DJ {userName}
          </Text>
        </ImageBackground>
        {songs !== [] ? (
          <SafeAreaView>
            <FlatList
              data={songs}
              renderItem={({ item }) => <SingleSong song={item} />}
              keyExtractor={item => item.id}
            />
          </SafeAreaView>
        ) : (
          <Text>Search To Add Songs to Your Playlist!</Text>
        )}
        {userName === roomData.hostName ? (
          <TouchableOpacity
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignContent: 'flex-end',
              justifyContent: 'center'
            }}
            onPress={() => goToStats()}
          >
            <Text
              style={{
                color: '#fff',
                alignSelf: 'center',
                fontSize: 20,
                paddingRight: 5,
                paddingTop: 30
              }}
            >
              PLAYLIST STATS
            </Text>
            <Feather
              name="bar-chart-2"
              size={20}
              color="#fff"
              style={{ alignSelf: 'center', paddingTop: 30 }}
            />
          </TouchableOpacity>
        ) : null}
      </ScrollView>
      <View style={styles.buttonBackground}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => props.navigation.navigate('SearchScreen')}
        >
          <Text style={styles.buttonText}>Add A Song</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

const mapStateToProps = state => {
  return {
    docId: state.docId,
    roomData: state.roomData,
    userName: state.userName
  };
};
export default connect(mapStateToProps)(PlaylistRoom);

const styles = StyleSheet.create({
  background: {
    backgroundColor: '#FF5857'
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
    color: 'white',
    fontSize: 18,
    paddingRight: 3,
    paddingTop: 5
  },
  button: {
    padding: hp('2.1%'),
    backgroundColor: '#423959',
    borderRadius: 25,
    width: hp('24%'),
    marginBottom: hp('3%'),
    marginTop: hp('2%'),
    margin: 'auto',
    alignSelf: 'center'
  },
  buttonText: {
    color: 'white',
    fontSize: hp('2.8%'),
    textAlign: 'center'
  },
  buttonBackground: {
    backgroundColor: '#FF5857'
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
