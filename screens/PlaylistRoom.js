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

const dummySongs = [
  {
    id: 1,
    songTitle: 'Bye Bye Bye',
    artist: 'NSYNC'
  },
  {
    id: 2,
    songTitle: 'Africa',
    artist: 'Toto'
  },
  {
    id: 3,
    songTitle: 'Ay Vamos',
    artist: 'J Balvin'
  }
];

export default function JoinRoom() {
  let [songs, setSongs] = useState(dummySongs);

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
        >
          teamFresh Jams
        </Text>
        {dummySongs.map(song => (
          <View key={song.id} style={styles.songContainer}>
            <Text style={{ color: '#ffffff' }}>{song.songTitle}</Text>
            <Text style={{ color: '#ffffff' }}>{song.artist}</Text>
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
