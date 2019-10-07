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

  let [songs, setSongs] = useState([]);

  useEffect(() => {
    getPlaylist('Test-Room')
      .then(data => setSongs(data))
      .catch(err => console.log(err));
  }, []);

  console.log(songs);

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
          <View key={song.title} style={styles.songContainer}>
            <Text style={{ color: '#ffffff' }}>{song.title}</Text>
            <Text style={{ color: '#ffffff' }}>{song.title}</Text>
            <TouchableOpacity style={{ justifyContent: 'flex-end' }}>
              <Feather name="chevron-up" size={20} color="white" />
              <Feather name="chevron-down" size={20} color="white" />
            </TouchableOpacity>
          </View>
        ))}
      </LinearGradient>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
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
