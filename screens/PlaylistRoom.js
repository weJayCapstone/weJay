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
import { createRoom, getPlaylist } from '../firebase/index';

//will need to make a request to the db to get playlist and songs

// Object {
//   "accessToken": "BQA_fH3_l6bjX_Q6XpuTeI4ZQvEE31-2rVJA4RIi-0JgdBpNbtrITyxjEkws1sWjYKxVNLYQLi20qQZ97hHuW42Buor7s3_Qb__xf1W_V4F3Jv6VZKouoKuzYxmWauNeASlC6mpvw2qpUctgvxBsiYnG4COpqge0RXzGWHtE2153xJ6J32vW6SlHaeGfASnZ1a0-eIzK",
//   "expiresIn": 3600,
//   "hostName": "Nat ",
//   "passcode": "1234",
//   "playlistID": "2PxePaUEY3U9bjqa4pSPmJ",
//   "refreshToken": "AQAdVa6EEVh935eX7oVPoXT0-VH3aNndZYEU-VOQQcjS-C8YtytBDpvXq_HZSt3nH0wT0_tXVMi0CceeFwuR--fcfYc4C2R1W2ivQZ5exEgIazGZSTXzAcycQu2_DmE3a-mujQ",
//   "title": "Test 5",
//  }

export default function JoinRoom(props) {
  console.log(props);
  let [songs, setSongs] = useState();

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
        {songs.map(song => (
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
