import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { getTokens, makeNewPlaylist } from '../api/spotify';
import { createRoom } from '../firebase/index';
import { setDocId, fetchRoomDataThunk, setUserName } from '../redux/store';
import { connect } from 'react-redux';
import { Feather } from '@expo/vector-icons';

function CreatePlaylistForm(props) {
  const [roomData, setRoomData] = useState({
    title: '',
    hostName: '',
    passcode: null
  });
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
      //redux store updates
      props.setStoreDocId(result);
      props.setStoreRoomData(result);
      props.setUserName(formData.hostName);
      //navigation params
      //adds host name to App.js level:
      //props.navigation.state.params.setHostName(formData.hostName);
      if (formData.accessToken) {
        props.navigation.navigate('PlaylistRoom');
      }
      setRoomData({ title: '', hostName: '', passcode: null });
    } catch (err) {
      console.log(err);
    }
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
const mapDispatchToProps = dispatch => {
  return {
    setStoreDocId: result => dispatch(setDocId(result)),
    setStoreRoomData: docId => dispatch(fetchRoomDataThunk(docId)),
    setUserName: userName => dispatch(setUserName(userName))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(CreatePlaylistForm);

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
  },
  saveButton: {
    backgroundColor: '#FF5857',
    padding: 15,
    borderRadius: 25,
    width: 200
  },
  saveButtonText: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold'
  }
});
