// THIS IS TEST CODE IP, UNALTERED BOILER PLATE CODE CAN BE FOUND IN APPTEST.JS

'use strict';
import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';

import HomeScreen from './screens/HomeScreen';
import CreatePlaylistForm from './screens/CreatePlaylistForm';
import JoinPlaylistForm from './screens/JoinPlaylistForm';
import PlaylistRoom from './screens/PlaylistRoom';
import SearchScreen from './screens/SearchScreen';
import CleanSearch from './screens/CleanSearch';
import TestRoom from './screens/TestRoom';
//if you want to use our keys you need to require the secrets file
require('./secrets')
export default class ReactNav extends Component {
  render() {
    return <App />;
  }
}

// class GreenScreen extends Component {
//   static navigationOptions = {
//     title: 'Green'
//   };
//   render() {
//     return (
//       <View style={styles.green}>
//         <Text style={styles.text}>This is the Green Screen</Text>
//         <TouchableHighlight
//           style={styles.button}
//           onPress={() => this.props.navigation.navigate('Red')}
//         >
//           <Text style={styles.text}>Go to Red</Text>
//         </TouchableHighlight>
//       </View>
//     );
//   }
// }

// class RedScreen extends Component {
//   render() {
//     return (
//       <View style={styles.red}>
//         <Text style={styles.text}>This is the Red Screen</Text>
//         <TouchableHighlight
//           style={styles.button}
//           onPress={() => this.props.navigation.goBack()}
//         >
//           <Text style={styles.text}>Back to Green</Text>
//         </TouchableHighlight>
//       </View>
//     );
//   }
// }

// RedScreen.navigationOptions = props => {
//   const { navigation } = props;
//   return {
//     headerTitle: 'Red',
//     headerRight: (
//       <Button title="Purple" onPress={() => navigation.navigate('Purple')} />
//     ),
//     headerLeft: (
//       <Button title="Blue" onPress={() => navigation.navigate('Blue')} />
//     )
//   };
// };

// class BlueScreen extends Component {
//   render() {
//     return (
//       <View style={styles.blue}>
//         <Text style={styles.text}>This is the Blue Screen</Text>
//       </View>
//     );
//   }
// }

// class PurpleScreen extends Component {
//   render() {
//     return (
//       <View style={styles.purple}>
//         <Text style={styles.text}>This is the Purple Screen</Text>
//       </View>
//     );
//   }
// }

const StackNav = createStackNavigator({
  Home: { screen: HomeScreen },
  CreatePlaylistForm: { screen: CreatePlaylistForm },
  JoinPlaylistForm: { screen: JoinPlaylistForm },
  PlaylistRoom: { screen: PlaylistRoom },
  SearchScreen: { screen: SearchScreen },
  TestRoom: { screen: TestRoom },
  CleanSearch: { screen: CleanSearch}
});

const App = createAppContainer(StackNav);

AppRegistry.registerComponent('ReactNav', () => ReactNav);
