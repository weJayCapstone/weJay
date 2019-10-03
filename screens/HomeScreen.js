import * as WebBrowser from 'expo-web-browser';
//react hooks
import React, { useState, useEffect } from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {createStackNavigator, createAppContainer} from 'react-navigation'
import SpotifyLoginScreen from './SpotifyLogin'
import { MonoText } from '../components/StyledText';
import db from '../cloudServer/index'

const LoginNavigator = createStackNavigator({
    Login: {screen: SpotifyLoginScreen}
})
const Thing = createAppContainer(LoginNavigator);

// async function queryTest() {
//     try{
//         const stuff = await db.collection('Rooms').doc('Test-Room').get();
//         console.log('this is stuff',stuff.data());

//         make a room
//         const rooms = await db.collection('Rooms');
//         let setRoom = rooms.doc('newRoom').set({
//             RoomId: 2, 
//             "Spotify Token": "BQC3TfzpQWaoL6tWosdouXmJkbrpi7Vd1WHyDlwAnzQzmhYLPlE9pCAWLzvyyJayTCJnDScXCCXs8m35HBk9DHVuK5Cg2TaxvRuPt_4RNj9QDZMwSetIqlDbviW1uSFnffOnlmAwzSCk3uP-fOurAiuyI9yU4lZW76wa5ENPEZk7xbVVvqeadNIly1irTKfxc9fT5yFiqP8zLhRS2nJs",
//             UserId:1 
//           });
//         let roomRef = await db.collection('Rooms').doc('newRoom');
//         let getDoc = roomRef.get()
//             .then(doc => {
//               if (!doc.exists) {
//                 console.log('No such document!');
//               } else {
//                 console.log('Document data:', doc.data());

//               }
//             })
//             .catch(err => {
//               console.log('Error getting document', err);
//             });
        
//     }catch(err){
//         console.log(err)
//     }
// }

export default function HomeScreen(props) {
    
    //queryTest();
  return (
    <View style={styles.container}>
      <View style={styles.tabBarInfoContainer}>
        <Text style={styles.tabBarInfoText}>
          This is a tab bar. You can edit it in:
        </Text>

        <View
          style={[styles.codeHighlightContainer, styles.navigationFilename]}>
          <MonoText style={styles.codeHighlightText}>
            navigation/MainTabNavigator.js
          </MonoText>
        </View>
      </View>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}>
       <View
        style ={styles.welcomeContainer}
       >
           <TouchableOpacity
            onPress={() => navigate('Login')}
           >
            <Text style={{fontSize: 34}}>Create Room</Text>
           </TouchableOpacity>
           <TouchableOpacity>
            <Text style={{fontSize: 34}}>Join Room</Text>
           </TouchableOpacity>
       </View>
      </ScrollView>

    </View>
  );
}

HomeScreen.navigationOptions = {
  header: null,
};

function DevelopmentModeNotice() {
  if (__DEV__) {
    const learnMoreButton = (
      <Text onPress={handleLearnMorePress} style={styles.helpLinkText}>
        Learn more
      </Text>
    );

    return (
      <Text style={styles.developmentModeText}>
        Development mode is enabled: your app will be slower but you can use
        useful development tools. {learnMoreButton}
      </Text>
    );
  } else {
    return (
      <Text style={styles.developmentModeText}>
        You are not in development mode: your app will run at full speed.
      </Text>
    );
  }
}

function handleLearnMorePress() {
  WebBrowser.openBrowserAsync(
    'https://docs.expo.io/versions/latest/workflow/development-mode/'
  );
}

function handleHelpPress() {
  WebBrowser.openBrowserAsync(
    'https://docs.expo.io/versions/latest/workflow/up-and-running/#cant-see-your-changes'
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 100,
    marginBottom: 20,
    fontSize: 34
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
