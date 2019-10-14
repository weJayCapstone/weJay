import React, { useState } from 'react';
import {
  Text,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
  View,
  Image,
  ImageBackground
} from 'react-native';

export default function HomeScreen(props) {
  const [docId, setDocId] = useState('');
  const [userName, setUserName] = useState('');
  return (
    <View style={styles.container}>
      <ImageBackground
        source={{
          uri:
            'https://s30226.pcdn.co/wp-content/uploads/2015/02/half-moon-party-dates.jpg'
        }}
        style={{ width: 375, height: 1000 }}
        imageStyle={{ opacity: 0.7 }}
        resizeMode="cover"
      >
        <View style={styles.container}>
          <Image
            source={require('../weJay.png')}
            style={{ width: 250, height: 250, marginTop: 150 }}
          />
          <View>
            <TouchableHighlight
              style={styles.button}
              onPress={() =>
                props.navigation.navigate('CreatePlaylistForm', {
                  otherParam: 'Create a Playlist',
                  docId,
                  setDocId,
                  userName,
                  setUserName
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
            {docId ? (
              <>
                <TouchableOpacity
                  style={styles.goToPlaylistButton}
                  onPress={() =>
                    props.navigation.navigate('PlaylistRoom', {
                      docId,
                      setDocId,
                      userName,
                      setUserName
                    })
                  }
                >
                  <Text style={styles.text}>Go To Playlist</Text>
                </TouchableOpacity>
              </>
            ) : null}
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    flexDirection: 'column',
    alignItems: 'center'
  },
  text: {
    fontSize: 24,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#fff'
  },
  button: {
    marginTop: 30,
    // shadowColor: '#999',
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.5,
    // shadowRadius: 2,
    // elevation: 1,
    borderRadius: 25,
    padding: 10,
    backgroundColor: '#FF5857',
    width: 300
  },
  goToPlaylistButton: {
    marginTop: 20,
    // shadowColor: '#999',
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.5,
    // shadowRadius: 2,
    // elevation: 1,
    borderRadius: 25,
    padding: 10,
    backgroundColor: '#A085AD',
    width: 300
  }
});
