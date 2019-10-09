//UNALTERED BOILER PLATE CODE CAN BE FOUND IN APPTEST.JS

'use strict';
import React, { Component } from 'react';
import {
  createStackNavigator,
  createAppContainer,
  createDrawerNavigator,
  createSwitchNavigator
} from 'react-navigation';
import { DrawerActions } from 'react-navigation-drawer';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';

//screens
import HomeScreen from './screens/HomeScreen';
import CreatePlaylistForm from './screens/CreatePlaylistForm';
import JoinPlaylistForm from './screens/JoinPlaylistForm';
import PlaylistRoom from './screens/PlaylistRoom';
import SearchScreen from './screens/SearchScreen';
import CleanSearch from './screens/CleanSearch';
import TestRoom from './screens/TestRoom';
import SingleSong from './screens/SingleSong';
require('./secrets');

export default class ReactNav extends Component {
  render() {
    return <App />;
  }
}

const DrawerNav = createDrawerNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      title: 'Home'
    }
  },
  CreatePlaylistForm: {
    screen: CreatePlaylistForm,
    navigationOptions: {
      title: 'Create a Playlist'
    }
  },
  JoinPlaylistForm: {
    screen: JoinPlaylistForm,
    navigationOptions: {
      title: 'Join a Playlist'
    }
  }
});

const StackNav = createStackNavigator({
  DrawerNav: {
    screen: DrawerNav,
    navigationOptions: ({ navigation }) => {
      const { state } = navigation;

      if (state.isDrawerOpen) {
        return {
          title: null,
          headerLeft: (
            <TouchableOpacity
              onPress={() => {
                navigation.dispatch(DrawerActions.toggleDrawer());
              }}
            >
              <Feather name="menu" size={32} color="black" />
            </TouchableOpacity>
          )
        };
      } else {
        return {
          title: null,
          headerLeft: (
            <TouchableOpacity
              onPress={() => {
                navigation.dispatch(DrawerActions.toggleDrawer());
              }}
            >
              <Feather name="menu" size={32} color="black" />
            </TouchableOpacity>
          )
        };
      }
    }
  },
  Home: { screen: HomeScreen },
  CreatePlaylistForm: { screen: CreatePlaylistForm },
  JoinPlaylistForm: { screen: JoinPlaylistForm },
  PlaylistRoom: { screen: PlaylistRoom },
  SearchScreen: { screen: SearchScreen },
  TestRoom: { screen: TestRoom },
  CleanSearch: { screen: CleanSearch },
  SingleSong: { screen: SingleSong }
});

const MainNav = createSwitchNavigator({
  App: StackNav
});

const App = createAppContainer(MainNav);
