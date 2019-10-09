import React, {useState} from 'react';
import {
  Text,
  ScrollView,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
  View,
  StatusBar
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { getTokens } from '../api/spotify';

export default function HomeScreen(props){
  const [docId, setDocId] = useState('')
    return (
      <View
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >
        <StatusBar barStyle="dark-content" backgroundColor="#FF5857"/>
        <View style={styles.header}>
            <Text style={{fontSize:40, fontWeight:'bold'}}>weJay</Text>
        </View>
        <View>
          <TouchableHighlight
            style={styles.button}
            onPress={() => props.navigation.navigate('CreatePlaylistForm', {docId, setDocId})}
          >
            <Text style={styles.text}>Create Playlist</Text>
          </TouchableHighlight>

          <TouchableOpacity
            style={styles.button}
            onPress={() => props.navigation.navigate('JoinPlaylistForm', {docId, setDocId})}
          >
            <Text style={styles.text}>Join Playlist</Text>
          </TouchableOpacity>
          {docId? <TouchableOpacity
            style={styles.button}
            onPress={() => props.navigation.navigate('PlaylistRoom', {docId})}
          >
            <Text style={styles.text}>Go To Playlist</Text>
          </TouchableOpacity>: null}

          {/* <TouchableHighlight
            style={styles.button}
            onPress={() => this.props.navigation.navigate('SearchScreen')}
          >
            <Text style={styles.text}>Search Screen Component (Gus)</Text>
          </TouchableHighlight> */}
        </View>
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 100,
    marginLeft: 60,
    width: 200
  },
  text: {
    fontSize: 24,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#fff',
  },
  icon: {
    paddingLeft: 10
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: 120
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
    backgroundColor: '#FF5857'
  },
  contentContainer: {
    justifyContent:'center'
  },
  header:{
      paddingBottom: 25,
      marginLeft: 40,
  }
  // contentContainer: {
  //   paddingTop: 30
  // },
});
