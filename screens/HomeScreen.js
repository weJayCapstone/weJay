import React, { useState } from 'react';
import {
  Text,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
  View,
  StatusBar
} from 'react-native';

export default function HomeScreen(props) {
  const [docId, setDocId] = useState('');
  const [userName, setUserName] = useState('');
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FF5857" />
      <View style={styles.header}>
        <Text style={{ fontSize: 40, fontWeight: 'bold', alignSelf: 'center' }}>
          weJay
        </Text>
      </View>
      <View>
        <TouchableHighlight
          style={styles.button}
          onPress={() =>
            props.navigation.navigate('CreatePlaylistForm', {
              otherParam: 'Create a Playlist',
              docId, setDocId, userName,setUserName
            })
          }
        >
          <Text style={styles.text}>Create Playlist</Text>
        </TouchableHighlight>

        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            props.navigation.navigate('JoinPlaylistForm', {
              docId,
              setDocId,
              userName,
              setUserName,
              otherParam: 'Join A Playlist'
            })
          }
        >
          <Text style={styles.text}>Join Playlist</Text>
        </TouchableOpacity>
          { docId ?( <TouchableOpacity
            style={styles.button}
            onPress={() => props.navigation.navigate('PlaylistRoom', {docId, setDocId, userName,setUserName})}
          >
            <Text style={styles.text}>Go To Playlist</Text>
          </TouchableOpacity>)
         : null}

        {/* NEED THIS TO TEST, WILL REMOVE AFTER TESTING */}

        <TouchableOpacity
          style={styles.button}
          onPress={() => props.navigation.navigate('Playback')}
        >
          <Text style={styles.text}>Playback (TEST)</Text>
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
    alignItems: 'center',
    backgroundColor: '#F4F8FF'
  },
  header: {
    paddingBottom: 25,
    marginTop: 80
  },
  text: {
    fontSize: 24,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#fff'
  },
  button: {
    marginTop: 10,
    shadowColor: '#999',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 1,
    borderRadius: 25,
    padding: 10,
    backgroundColor: '#FF5857',
    width: 300
  }
});
