import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Alert
} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { enterRoom, getPlaylist } from '../firebase/index';

export default function JoinPlayListForm(props) {
  const [authData, setAuthData] = useState({});
  const handleSubmit = async () => {
    try {
      let result = await enterRoom(
        authData.passcode,
        authData.title,
        authData.userName
      );
      if (result === 'Invalid credentials') {
        Alert.alert('Alert Title', result + ' try again', {
          cancelable: false
        });
      } else {
          props.navigation.state.params.setDocId(result);
          props.navigation.state.params.setUserName(authData.userName);
          props.navigation.navigate('PlaylistRoom', { docId: result, userName: authData.userName });
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.header}>Join Playlist</Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Playlist Title"
          maxLength={100}
          onChangeText={text => setAuthData({ ...authData, title: text })}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Your Name"
          maxLength={50}
          onChangeText={text => setAuthData({ ...authData, userName: text })}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Playlist Passcode"
          maxLength={4}
          onChangeText={text => setAuthData({ ...authData, passcode: text })}
        />
        <TouchableOpacity
          style={styles.saveButton}
          onPress={() => handleSubmit()}
        >
          <Text style={styles.saveButtonText}>Enter</Text>
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
    backgroundColor: '#F4F8FF',
    alignItems: 'center'
  },
  header: {
    fontSize: 30,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#FF5857',
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
    backgroundColor: '#fff',
    borderRadius: 30,
    borderWidth: 1,
    width: 250,
    fontSize: 18,
    height: 45,
    textAlign: 'center',
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#999',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 1
  },
  saveButton: {
    backgroundColor: '#FF5857',
    padding: 15,
    borderRadius: 25,
    width: 200,
    shadowColor: '#999',
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 20,
    textAlign: 'center'
  }
});
