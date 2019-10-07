import React, { useState, useEffect } from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Alert
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';
import db from '../firebase/index';
import axios from 'axios';
import { addSong, createRoom, enterRoom } from '../firebase/index';
import { getSpotifyPlaylist } from '../spotifyUtils/index';
//user will have access to room name some how, for now we will try to access our newRoom
let currentToken =
  'BQBjBWbSLcJjEKuWehF1JhHLLBSXLmJ_oWE88zXEEUZvJe7eKblMP9SKBmuEcEYqVNG2QElXr08IE4mO3H7j5nws5qqx4hIymBB-BsV5Oru7YkZ4ImhiRcS5l59Zy2y-CO8qK6Vu7F12X3Uk13HbALd9IJRO2KrDZi6RzSDHE9l4-Hlo40uLVjYxd2PVun3lRmrt1d4hOTzmbQUG6TBQ';
const roomName = 'newRoom';

export default function TestRoom(props) {
  const [authData, setAuthData] = useState({});
  const [room, setRoom] = useState({});
  const passcode = '1234'
  const hostName = 'Panda'
  //use effect used to update room
//   useEffect(() => {
//       getRoom(passcode, hostName)
//       .then(result => setRoom(result))
//       .catch(err => console.log(err))
//   }, []);
  return (
    <ScrollView>
        <View style={styles.conatiner}>
        <View>
          <Text style={styles.header}>Add Freebird to your playlist</Text>
        </View>
      </View>
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
  },
  textInput: {
    borderColor: '#CCCCCC',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    height: 50,
    fontSize: 25
  },
  saveButton: {
    borderWidth: 1,
    borderColor: '#007BFF',
    backgroundColor: '#007BFF',
    padding: 15,
    margin: 5
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 20,
    textAlign: 'center'
  }
});
