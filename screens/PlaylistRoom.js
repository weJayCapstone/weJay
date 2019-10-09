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
import db from '../firebase/index';

export default function PlaylistRoom(props) {
  const docId = props.navigation.state.params.docId;
  const userName = props.navigation.state.params.userName;
  let [songs, setSongs] = useState([]);
  let [loading, setLoading] = useState(true);
//   let [downvote, setDownvote] = useState(false);
  useEffect(() => {
    let roomRef = db.collection('Rooms').doc(docId);
    roomRef
        .collection('Playlist')
        .onSnapshot((snapshot)=> {
            const songArr =[];
            snapshot.forEach(doc => {
                songArr.push(doc.data())
            });
            setLoading(false);
            setSongs(songArr);
        });
  }, [docId]);
  return (
    <ScrollView>
      {(songs) &&
        songs.map(song => {
        return(
          <View key={song.id}>
            <Card style={styles.card}>
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
                    <TouchableOpacity
                        // onPress= {() => setUpvote(true)}
                       
                    >
                        <Feather  style ={song.users[(userName.toLowerCase())] === 'up'? styles.voteHighlight: styles.vote } name="chevron-up" size={30} color="black" />
                    </TouchableOpacity>
                  <Text
                    style={{
                      fontWeight: 'bold',
                      marginLeft: 'auto',
                      paddingRight: 10
                    }}
                  >
                    {song.votes}
                  </Text>
                  <TouchableOpacity
                    // onPress={setDownvote(true)}
                  >
                    <Feather name="chevron-down" size={30} color="black" />
                  </TouchableOpacity>
                </View>
              </View>
            </Card>

          </View>)
      })}

      <TouchableOpacity
        style={styles.button}
        onPress={() => props.navigation.navigate('SearchScreen', { docId })}
      >
        <Text>Add A Song</Text>
      </TouchableOpacity>
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
  },
  vote: {
      color: '#000'
  },
  voteHighlight: {
      color:'#FF5857'
  }
});
