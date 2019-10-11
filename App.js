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
import { TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';

//screens
import HomeScreen from './screens/HomeScreen';
import CreatePlaylistForm from './screens/CreatePlaylistForm';
import JoinPlaylistForm from './screens/JoinPlaylistForm';
import PlaylistRoom from './screens/PlaylistRoom';
import SearchScreen from './screens/SearchScreen';
import CleanSearch from './screens/CleanSearch';
import TestRoom from './screens/TestRoom';
import Playback from './screens/Playback';
import {Provider} from 'react-redux'
// import store from '.redux/store'
require('./secrets');

export default class ReactNav extends Component {
  render() {

    return (
        <App />
    )
  }
}

const DrawerNav = createDrawerNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      title: 'weJay'
      // headerStyle: {
      //   backgroundColor: '#F4F8FF'
      // }
    }
  },
  CreatePlaylistForm: {
    screen: CreatePlaylistForm,
    navigationOptions: {
      title: 'Create Playlist'
      // headerStyle: {
      //   backgroundColor: '#F4F8FF'
      // }
    }
  },
  JoinPlaylistForm: {
    screen: JoinPlaylistForm,
    navigationOptions: {
      title: 'Join Playlist'
      // headerStyle: {
      //   backgroundColor: '#F4F8FF'
      // }
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
          // title: 'wejay',
          // headerStyle: {
          //   backgroundColor: '#F4F8FF'
          // },
          headerLeft: (
            <TouchableOpacity
              onPress={() => {
                navigation.dispatch(DrawerActions.toggleDrawer());
              }}
            >
              <Feather name="menu" size={32} color="#4392F1" />
            </TouchableOpacity>
          )
        };
      } else {
        return {
          // title: 'weJay',
          // headerStyle: {
          //   backgroundColor: '#F4F8FF'
          // },
          headerLeft: (
            <TouchableOpacity
              onPress={() => {
                navigation.dispatch(DrawerActions.toggleDrawer());
              }}
            >
              <Feather name="menu" size={32} color="#4392F1" />
            </TouchableOpacity>
          )
          // headerRight: (
          //   <TouchableOpacity
          //     onPress={() => {
          //       navigation.dispatch('HomeScreen');
          //     }}
          //   >
          //     <Feather name="home" size={32} color="#4392F1" />
          //   </TouchableOpacity>
          // )
        };
      }
    }
  },
  Home: { screen: HomeScreen },
  CreatePlaylistForm: { screen: CreatePlaylistForm },
  JoinPlaylistForm: { screen: JoinPlaylistForm },
  PlaylistRoom: {
    screen: PlaylistRoom
  },
  SearchScreen: { screen: SearchScreen },
  TestRoom: { screen: TestRoom },
  CleanSearch: { screen: CleanSearch },
  Playback: {
    screen: Playback
  }
});

const MainNav = createSwitchNavigator({
  App: StackNav
});

const App = createAppContainer(MainNav);
