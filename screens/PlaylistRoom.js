import React, { useState, useEffect } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';
import { getPlaylist, getRoom } from '../firebase/index';

export default function PlaylistRoom(props) {
  let playlist = {};
  const docId = props.navigation.state.params.docId;
  let [songs, setSongs] = useState([]);

  useEffect(() => {
    getPlaylist(docId)
      .then(data => setSongs(data))
      .catch(err => console.log(err));
  }, []);
  return (
    <ScrollView>
      <LinearGradient
        colors={['#000000', '#666666', '#AAAAAA']}
        style={{ padding: 15, borderRadius: 5 }}
      >
        <Text
          style={{
            backgroundColor: 'transparent',
            fontSize: 20,
            alignContent: 'center',
            marginBottom: 10,
            fontWeight: 'bold',
            color: '#fff',
            textAlign: 'center'
          }}
        />
        {songs.map(song => (
          <View key={song.id} style={styles.songContainer}>
            <Text style={{ color: '#ffffff' }}>{song.name}</Text>
            <Text style={{ color: '#ffffff' }}>{song.artist}</Text>
            <Text style={{ color: '#ffffff' }}>{song.albumName}</Text>
            <TouchableOpacity style={{ justifyContent: 'flex-end' }}>
              <Feather name="chevron-up" size={20} color="white" />
              <Feather name="chevron-down" size={20} color="white" />
            </TouchableOpacity>
          </View>
        ))
      }
      </LinearGradient>
      <TouchableOpacity
        style= {styles.button}
        onPress={() => props.navigation.navigate('SearchScreen', {docId})}
      >
          <Text>Add A Song</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
   button: {
    padding: 10, 
    borderWidth: 1, 
    borderColor: '#000',
    borderRadius: 25,
    width: 150
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  songContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10
  }
});
