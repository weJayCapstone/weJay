import React, { useState, useEffect } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  ImageBackground
} from "react-native";
import { Feather } from "@expo/vector-icons";
import MarqueeText from "react-native-marquee";
import db, { refreshRoomToken, getCurrentSongData } from "../firebase/index";
import SingleSong from "./SingleSong";

export default function PlaylistRoom(props) {
  const docId = props.navigation.state.params.docId;
  const userName = props.navigation.state.params.userName;
  const hostName = props.navigation.state.params.hostName;
  const title = props.navigation.state.params.title;
  const [songData, setSongData] = useState({});
  async function getCurrentSongPlaying(id) {
    try {
      await refreshRoomToken(id);
      //let roomData = await getRoomData(id);
      const songPlaying = await getCurrentSongData(id);
      const result = songDataParser(songPlaying.item);
      setSongData(result);
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    let roomRef = db.collection("Rooms").doc(docId);
    let unsub = roomRef.onSnapshot(snapshot => {
      if (snapshot.data().currentSong) {
        setSongData(snapshot.data().currentSong);
      }
    });
    // if (isPlaying){

    //   getCurrentSongPlaying(docId);

    // }
    //this might fix the memory leak errors:
    return () => unsub();
  }, []);

  function songDataParser(data) {
    let result = {
      name: data.name,
      id: data.id,
      href: data.href,
      uri: data.uri,
      artist: data.artists[0].name,
      imageUrl: data.album.images[0].url,
      albumName: data.album.name
    };
    return result;
  }

  let [songs, setSongs] = useState([]);
  useEffect(() => {
    let roomRef = db.collection("Rooms").doc(docId);
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
    return unsub;
  }, [docId]);

  PlaylistRoom.navigationOptions = {
    headerStyle: {
      backgroundColor: "#423959",
      borderBottomWidth: 0
    },
    headerRight: (
      <TouchableOpacity
        onPress={() => {
          props.navigation.navigate("Playback", { docId, hostName });
        }}
      >
        <View style={styles.headerContainer}>
          <Text style={styles.nowPlayingText}>Now Playing</Text>
          <Feather
            name="music"
            size={30}
            color="#FF5857"
            style={styles.musicnote}
          />
        </View>
      </TouchableOpacity>
    ),
    headerLeft: (
      <TouchableOpacity
        onPress={() => {
          props.navigation.navigate("Home");
        }}
      >
        <Feather name="chevron-left" size={32} color="#FF5857" />
      </TouchableOpacity>
    )
  };

  if (hostName) {
    return (
      <>
        <ScrollView>
          <ImageBackground
            source={require("../gradient3.png")}
            style={{ height: 200, display: "flex", flexDirection: "column" }}
            resizeMode="stretch"
          >
            <Text
              style={{
                fontSize: 30,
                fontWeight: "bold",
                color: "white",
                alignSelf: "center",
                alignContent: "center",
                opacity: 0.7
              }}
              ellipsizeMode="tail"
              numberOfLines={2}
            >
              Welcome, DJ {hostName}
            </Text>
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
              props.navigation.navigate("SearchScreen", { docId, userName })
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
              props.navigation.navigate("SearchScreen", { docId, userName })
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
    textAlign: "center"
  },
  buttonBackground: {
    backgroundColor: "#FF5857"
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
