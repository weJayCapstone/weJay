import React from 'react';
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

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'WeJay'
  };
  // headerLeft: <Feather name="music" size={20} color="black" />,
  // headerRight: <Feather name="plus-square" size={20} color="black" />

  render() {
    return (
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >
        <StatusBar barStyle="light-content" />
        <View>
          <TouchableHighlight
            style={styles.button}
            onPress={() => this.props.navigation.navigate('CreatePlaylistForm')}
          >
            <Text style={styles.text}>Create Playlist</Text>
          </TouchableHighlight>

          <TouchableOpacity
            style={styles.button}
            onPress={() => this.props.navigation.navigate('JoinPlaylistForm')}
          >
            <Text style={styles.text}>Join Playlist</Text>
          </TouchableOpacity>

          <TouchableHighlight
            style={styles.button}
            onPress={() => this.props.navigation.navigate('SearchScreen')}
          >
            <Text style={styles.text}>Search Screen Component (Gus)</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={styles.button}
            onPress={() => this.props.navigation.navigate('SingleSong')}
          >
            <Text style={styles.text}>Single Song</Text>
          </TouchableHighlight>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000'
  },
  text: {
    fontSize: 24,
    textAlign: 'center',
    color: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff',
    padding: 10
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
    marginTop: 10
  }
  // contentContainer: {
  //   paddingTop: 30
  // },
});
