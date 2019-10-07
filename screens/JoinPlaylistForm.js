import React,  {useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Alert
} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { enterRoom } from '../firebase/index';

export default function JoinPlayListForm (props){
    const [authData, setAuthData] = useState({});
    const [room, setRoom] = useState({});
    //use effect used to update room, need this code for later
  //   useEffect(() => {
  //       getRoom(passcode, hostName)
  //       .then(result => setRoom(result))
  //       .catch(err => console.log(err))
  //   }, []);
    const handleSubmit = async() => {
      try{
          let result = await enterRoom(authData.passcode, authData.title, authData.userName)
          if(result === 'Invalid credentials'){
              Alert.alert(
                  'Alert Title',
                  result + ' try again',
                  {cancelable: false},
                );
          }else {
              //needs to navigate to the specific playlist room
              props.navigation.navigate('PlaylistRoom');
          }
      }catch(err){
          console.log(err);
      }
    }
    return (
      <ScrollView>
          <View style={styles.conatiner}>
          <View>
            <Text style={styles.header}>Join A Playlist</Text>
          </View>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.textInput}
                placeholder="Playlist Title"
                maxLength={100}
                onChangeText = {text => setAuthData({...authData, title: text})}
              />
              <TextInput
                style={styles.textInput}
                placeholder="Your Name"
                maxLength={50}
                onChangeText = {text => setAuthData({...authData, userName: text})}
              />
              <TextInput
                style={styles.textInput}
                placeholder="Playlist Passcode"
                maxLength={4}
                onChangeText = {text => setAuthData({...authData, passcode: text})}
              />
            </View>
            <TouchableOpacity
              style={styles.saveButton}
              onPress={() => handleSubmit()}
            >
              <Text style={styles.saveButtonText}>Enter</Text>
            </TouchableOpacity>
        </View>
      </ScrollView>
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
