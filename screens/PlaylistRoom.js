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
import { getPlaylist } from '../firebase/index';

export default function PlaylistRoom(props) {
  const docId = props.navigation.state.params.docId;
  let [songs, setSongs] = useState([]);

  useEffect(() => {
    getPlaylist(docId)
      .then(data => setSongs(data))
      .catch(err => console.log(err));
  }, []);

  return (
    <ScrollView>
      {songs &&
        songs.map(song => (
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
  }
});
