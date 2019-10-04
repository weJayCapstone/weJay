import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import {FormLabel, FormInput, FormValidationMessage} from 'react-native-elements';
import {getTokens} from '../api/spotify'

export default function CreatePlaylistForm() {
    //const [roomData, setRoomData] = useState({});
    getTokens();
    return (
      <View style={styles.conatiner}>
        <View>
          <Text style={styles.header}>Create Your Playlist</Text>
        </View>
        <ScrollView>
          <View style={styles.inputContainer}>
            <FormLabel>
                Playlist Title
            </FormLabel>
            <FormInput
              style={styles.textInput}
              placeholder="Playlist Title"
              maxLength={100}
            />
            <FormLabel>
                Name
            </FormLabel>
            <FormInput
              style={styles.textInput}
              placeholder="Your Name"
              maxLength={50}
            />
            <FormLabel>
                Passcode
            </FormLabel>
            <FormInput
              style={styles.textInput}
              placeholder="Your Playlist Passcode"
              maxLength={4}
            />
          </View>
          <TouchableOpacity style={styles.saveButton}>
            <Text style={styles.saveButtonText}>Save</Text>
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
