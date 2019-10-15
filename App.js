'use strict';
import React, { Component } from 'react';
import {
  createStackNavigator,
  createAppContainer,
  createSwitchNavigator
} from 'react-navigation';
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  StatusBar
} from 'react-native';
import { Feather } from '@expo/vector-icons';

//screens
import HomeScreen from './screens/HomeScreen';
import CreatePlaylistForm from './screens/CreatePlaylistForm';
import JoinPlaylistForm from './screens/JoinPlaylistForm';
import PlaylistRoom from './screens/PlaylistRoom';
import SearchScreen from './screens/SearchScreen';
import Playback from './screens/Playback';
require('./secrets');

//redux
import store from './redux/store';
import { Provider } from 'react-redux';

export default class ReactNav extends Component {
  render() {
    return (
      <Provider store={store}>
        <StatusBar barStyle="light-content" />
        <App />
      </Provider>
    );
  }
}

const StackNav = createStackNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      header: null
    }
  },
  CreatePlaylistForm: {
    screen: CreatePlaylistForm,
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: '#423959',
        borderBottomWidth: 0
      },
      headerLeft: (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Home');
          }}
        >
          <Feather name="chevron-left" size={32} color="white" />
        </TouchableOpacity>
      )
    })
  },
  JoinPlaylistForm: {
    screen: JoinPlaylistForm,
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: '#423959',
        borderBottomWidth: 0
      },
      headerLeft: (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Home');
          }}
        >
          <Feather name="chevron-left" size={32} color="#FF5857" />
        </TouchableOpacity>
      )
    })
  },
  PlaylistRoom: {
    screen: PlaylistRoom,
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: '#423959',
        borderBottomWidth: 0,
        color: '#999'
      },
      headerRight: (
        <TouchableOpacity onPress={() => navigation.navigate('Playback')}>
          <View style={styles.headerContainer}>
            <Text style={styles.nowPlayingText}>Now Playing</Text>
            <Feather
              name="music"
              size={30}
              color="#fff"
              style={styles.musicnote}
            />
          </View>
        </TouchableOpacity>
      ),
      headerLeft: (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Home');
          }}
        >
          <Feather name="chevron-left" size={32} color="#fff" />
        </TouchableOpacity>
      )
    })
  },
  SearchScreen: {
    screen: SearchScreen,
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: '#a99bc9',
        borderBottomWidth: 0
      },
      headerLeft: (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('PlaylistRoom');
          }}
        >
          <Feather name="chevron-left" size={32} color="#000" />
        </TouchableOpacity>
      )
    })
  },
  Playback: {
    screen: Playback
  }
});

const MainNav = createSwitchNavigator({
  App: StackNav
});

const App = createAppContainer(MainNav);

const styles = StyleSheet.create({
  headerContainer: {
    display: 'flex',
    flexDirection: 'row'
  },
  feather: { marginLeft: 'auto' },
  nowPlayingText: {
    color: '#fff',
    fontSize: 18,
    paddingRight: 3,
    paddingTop: 5
  },
  musicnote: {
    paddingRight: 10
  }
});
