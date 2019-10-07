import React, { useState, useEffect } from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';
import db from '../firebase/index';
import axios from 'axios';
import { addSong, createRoom, getRoom } from '../firebase/index';
import { getSpotifyPlaylist } from '../spotifyUtils/index';
//user will have access to room name some how, for now we will try to access our newRoom
let currentToken =
  'BQBjBWbSLcJjEKuWehF1JhHLLBSXLmJ_oWE88zXEEUZvJe7eKblMP9SKBmuEcEYqVNG2QElXr08IE4mO3H7j5nws5qqx4hIymBB-BsV5Oru7YkZ4ImhiRcS5l59Zy2y-CO8qK6Vu7F12X3Uk13HbALd9IJRO2KrDZi6RzSDHE9l4-Hlo40uLVjYxd2PVun3lRmrt1d4hOTzmbQUG6TBQ';
const roomName = 'newRoom';

export default function TestRoom() {
  const [room, setRoom] = useState({});
  const passcode = '1234'
  const hostName = 'Panda'
  //use effect used to update room
  useEffect(() => {
      getRoom(passcode, hostName)
      .then(result => setRoom(result))
      .catch(err => console.log(err))
  }, []);
  return (
    <ScrollView>
      <LinearGradient
        colors={['#000000', '#666666', '#AAAAAA']}
        style={styles.container}
      >
        <Text
          style={{
            backgroundColor: 'transparent',
            fontSize: 20,
            alignContent: 'center',
            marginBottom: 10,
            fontWeight: 'bold',
            color: '#fff'
          }}
        >
          {`Welcome to ${room.title} hosted by ${room.hostName}`}
        </Text>
      </LinearGradient>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection:"column",
    padding: 15
  },
  songContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10
  }
});
