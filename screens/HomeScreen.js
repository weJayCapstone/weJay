import React from 'react';
import {
  Text,
  ScrollView,
  StyleSheet,
  TouchableHighlight,
  View,
  StatusBar
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import {getTokens} from '../api/spotify'

export default class HomeScreen extends React.Component {
    constructor(){
        super();
    }
  static navigationOptions = {
    title: 'WeJay',
    headerStyle: {
        backgroundColor: '#000',
      },
    headerTintColor: '#fff',
    headerTitleStyle: {
        fontWeight: 'bold',
    }
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

          <TouchableHighlight
            style={styles.button}
            onPress={() => this.props.navigation.navigate('JoinPlaylistForm')}
          >
            <Text style={styles.text}>Join Playlist</Text>
          </TouchableHighlight>

          <TouchableHighlight
            style={styles.button}
            onPress={() => this.props.navigation.navigate('SearchScreen')}
          >
            <Text style={styles.text}>Search Screen Component (Gus)</Text>
          </TouchableHighlight>

          <TouchableHighlight
            style={styles.button}
            onPress={() => this.props.navigation.navigate('TestRoom')}
          >
            <Text style={styles.text}>TestRoom Component (Natalie)</Text>
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
    color: '#fff'
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
  }
  // contentContainer: {
  //   paddingTop: 30
  // },
  // welcomeContainer: {
  //   alignItems: 'center',
  //   marginTop: 100,
  //   marginBottom: 20,
  //   fontSize: 34
  // },
  // welcomeImage: {
  //   width: 100,
  //   height: 80,
  //   resizeMode: 'contain',
  //   marginTop: 3,
  //   marginLeft: -10
  // },
  // homeScreenFilename: {
  //   marginVertical: 7
  // },
  // codeHighlightText: {
  //   color: 'rgba(96,100,109, 0.8)'
  // },
  // codeHighlightContainer: {
  //   backgroundColor: 'rgba(0,0,0,0.05)',
  //   borderRadius: 3,
  //   paddingHorizontal: 4
  // },
  // getStartedText: {
  //   fontSize: 17,
  //   color: 'rgba(96,100,109, 1)',
  //   lineHeight: 24,
  //   textAlign: 'center'
  // },
  // tabBarInfoContainer: {
  //   position: 'absolute',
  //   bottom: 0,
  //   left: 0,
  //   right: 0,
  //   ...Platform.select({
  //     ios: {
  //       shadowColor: 'black',
  //       shadowOffset: { width: 0, height: -3 },
  //       shadowOpacity: 0.1,
  //       shadowRadius: 3
  //     },
  //     android: {
  //       elevation: 20
  //     }
  //   }),
  //   alignItems: 'center',
  //   backgroundColor: '#fbfbfb',
  //   paddingVertical: 20
  // },
  // tabBarInfoText: {
  //   fontSize: 17,
  //   color: 'rgba(96,100,109, 1)',
  //   textAlign: 'center'
  // },
  // navigationFilename: {
  //   marginTop: 5
  // }
});
