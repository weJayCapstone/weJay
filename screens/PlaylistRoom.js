import React, { useState, useEffect } from "react";
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
import { Feather } from '@expo/vector-icons';
import db, { refreshRoomToken, getCurrentSongData } from '../firebase/index';
import SingleSong from './SingleSong';
import { connect } from 'react-redux';

function PlaylistRoom(props) {
  const docId = props.docId;
  const userName = props.userName;
  let title;
  if(props.roomData){
      title = props.roomData.title;
  }
  let [songs, setSongs] = useState([]);
  let [songData, setSongData] = useState({});
  useEffect(() => {
    let roomRef = db.collection("Rooms").doc(docId);
    roomRef.onSnapshot(snapshot => {
      if (snapshot.data().currentSong) {
        setSongData(snapshot.data().currentSong);
      }
    });
    let unsub = roomRef
      .collection("Playlist")
      .orderBy("timeAdded")
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
    return ()=> unsub();
  }, [docId]);

return (
      <>
        <ScrollView style={styles.background}>
          <ImageBackground
            source={require("../gradient3.png")}
            style={{
              height: 200,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center"
            }}
            resizeMode="stretch"
          >
            <Text
              style={{
                fontSize: 30,
                fontWeight: "bold",
                color: "white",
                alignSelf: "center",
                alignContent: "center",
                paddingTop: 35,
                opacity: 0.7
              }}
              ellipsizeMode="tail"
              numberOfLines={2}
            >
              Welcome, DJ {userName}
            </Text>

            {/* <MarqueeText
              style={{
                fontSize: 16,
                color: 'white',
                alignSelf: 'center',
                paddingTop: 15,
                maxWidth: 200
              }}
              duration={5000}
              marqueeOnStart
              loop={true}
              marqueeDelay={1000}
              marqueeResetDelay={1000}
            >
              Now Playing: {songData.name}
            </MarqueeText> */}
            <Text
              style={{
                fontSize: 16,
                color: "white",
                alignSelf: "center",
                paddingTop: 15,
                maxWidth: 300,
                opacity: 0.7
              }}
              ellipsizeMode="tail"
              numberOfLines={1}
            >
              Now Playing {songData.name}
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: "white",
                alignSelf: "center",
                paddingTop: 25,
                opacity: 0.7
              }}
            >
              Add a Song to {title} Below
            </Text>
          </ImageBackground>
          {songs !== [] ? (
              <SafeAreaView >
                <FlatList
                data={songs}
                renderItem={({ item }) => (
                    <SingleSong song={item}/>
                )}
                keyExtractor={item => item.id}
                />
            </SafeAreaView>
          ) : (
            <Text>Search To Add Songs to Your Playlist!</Text>
          )}
        </ScrollView>
        <View style={styles.buttonBackground}>
          <TouchableOpacity
            onPress={() =>
              props.navigation.navigate("SearchScreen", { docId, userName })
            }
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
    }
}

export default connect(mapStateToProps)(PlaylistRoom);

const styles = StyleSheet.create({
  background: {
    backgroundColor: "#423959"
  },
  songContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap"
  },
  containerStyle: {
    display: "flex",
    flexDirection: "row"
  },
  headerContainer: {
    display: "flex",
    flexDirection: "row"
  },
  feather: { marginLeft: "auto" },
  nowPlayingText: {
    color: "#FF5857",
    fontSize: 18,
    paddingRight: 3,
    paddingTop: 5
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  button: {
    padding: 15,
    backgroundColor: "#423959",
    borderRadius: 25,
    width: 200,
    marginBottom: 25,
    marginTop: 20,
    margin: "auto",
    alignSelf: "center"
  },
  buttonText: {
    color: "white",
    fontSize: 20,
    textAlign: "center",
    fontWeight:'bold'
  },
  buttonBackground: {
    backgroundColor: "#FF5857",
    paddingBottom: 10,
    paddingTop: 10,
  },
  vote: {
    color: "#000"
  },
  voteHighlight: {
    color: "#FF5857"
  },
  musicnote: {
    paddingRight: 10
  }
});
