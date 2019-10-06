import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import {getTokens, logIn} from '../api/spotify'
import {createRoom} from '../firebase/index'

export default function CreatePlaylistForm() {
    const [roomData, setRoomData] = useState({
        title: '',
        hostName: '',
        passcode: null,
    });
    getTokens(); //this is to test the process.env variable getTokens would be in handlesubmit you can comment this out
    const handleSubmit = async (formData) => {
        //this needs success checks
        try{
            //for debugging purposes I commented out the next 6 lines
            //const spotifyTokens = await getTokens();
            //console.log(spotifyTokens)
            //formData.accessToken = spotifyTokens.access_token;
            //formData.refreshToken = spotifyTokens.refresh_token;
            //formData.expiresIn = spotifyTokens.expires_in;
            createRoom(formData);
            // if(spotifyResponse.type === 'success'){
            //     formData.accessToken = spotifyResponse.code;
            //     formData.refreshToken = spotifyResponse.url; // not sure if this the refresh token
            //     createRoom(formData);
            // }
            //after room is created redirect host to playlist screen
        }catch(err){
            console.log(err)
        }
    }
    return (
      <View style={styles.conatiner}>
        <View>
          <Text style={styles.header}>Create Your Playlist</Text>
        </View>
        <ScrollView>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.textInput}
              placeholder="Playlist Title"
              maxLength={100}
              value={roomData.title}
              onChangeText = {text => setRoomData({...roomData, title: text})}
            />
            <TextInput
              style={styles.textInput}
              placeholder="Your Name"
              maxLength={50}
              onChangeText = {text => setRoomData({...roomData, hostName: text})}
            />
            <TextInput
              style={styles.textInput}
              placeholder="Your Playlist Passcode"
              maxLength={4}
              onChangeText = {text => setRoomData({...roomData, passcode: text})}
            />
          </View>
          <TouchableOpacity 
            style={styles.saveButton}
            onPress= {()=>handleSubmit(roomData)}
          >
            <Text style={styles.saveButtonText}>Create Playlist</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5FCFF'
  },
  header: {
    fontSize: 25,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  inputContainer: {
    paddingTop: 15
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
