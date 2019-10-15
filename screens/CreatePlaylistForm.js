import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { getTokens, makeNewPlaylist } from '../api/spotify';
import { createRoom } from '../firebase/index';
import { Feather } from '@expo/vector-icons';

export default function CreatePlaylistForm(props) {
  const [roomData, setRoomData] = useState({
    title: '',
    hostName: '',
    passcode: null
  });
  console.log(props.navigation.state.params);
  const handleSubmit = async formData => {
    try {
      const spotifyTokens = await getTokens();
      formData.accessToken = spotifyTokens.access_token;
      formData.refreshToken = spotifyTokens.refresh_token;
      formData.expiresIn = spotifyTokens.expires_in;
      //create room in firebase with Data, add playlist id
      //make playlist on spotify
      formData.playlistID = await makeNewPlaylist(
        formData.accessToken,
        formData.title
      );
      let result = await createRoom(formData);
      props.navigation.state.params.setDocId(result);
      props.navigation.state.params.setUserName(formData.hostName);
      if (formData.accessToken) {
        props.navigation.navigate('PlaylistRoom', {
          docId: result,
          hostName: roomData.hostName
        });
      }
      setRoomData({ title: '', hostName: '', passcode: null });
    } catch (err) {
      console.log(err);
    }
  };

  CreatePlaylistForm.navigationOptions = {
    headerStyle: {
      backgroundColor: '#423959',
      borderBottomWidth: 0
    },
    headerLeft: (
      <TouchableOpacity
        onPress={() => {
          props.navigation.navigate('Home');
        }}
      >
        <Feather name="chevron-left" size={32} color="white" />
      </TouchableOpacity>
    )
  };
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.header}>Create Playlist</Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Playlist Title"
          maxLength={100}
          value={roomData.title}
          onChangeText={text => setRoomData({ ...roomData, title: text })}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Your Name"
          maxLength={50}
          value={roomData.hostName}
          onChangeText={text => setRoomData({ ...roomData, hostName: text })}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Your Playlist Passcode"
          maxLength={50}
          value={roomData.passcode}
          onChangeText={text => setRoomData({ ...roomData, passcode: text })}
        />
        <TouchableOpacity
          style={styles.saveButton}
          onPress={() => handleSubmit(roomData)}
        >
          <Text style={styles.saveButtonText}>Create</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    flexDirection: 'column',
    backgroundColor: '#423959',
    alignItems: 'center'
  },
  header: {
    fontSize: 30,
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'white',
    marginTop: 80
  },
  inputContainer: {
    paddingTop: 15,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  textInput: {
    borderColor: '#fff',
    backgroundColor: '#E9DBFF',
    borderRadius: 30,
    borderWidth: 1,
    width: 250,
    fontSize: 18,
    height: 45,
    textAlign: 'center',
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center'
    // shadowColor: '#999',
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.5,
    // shadowRadius: 2,
    // elevation: 1
  },
  saveButton: {
    backgroundColor: '#FF5857',
    padding: 15,
    borderRadius: 25,
    width: 200
    // shadowColor: '#999',
    // shadowOffset: { width: 1, height: 2 },
    // shadowOpacity: 0.5,
    // shadowRadius: 2
  },
  saveButtonText: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold'
  }
});
