import React from 'react';
import {
  Text,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
  View,
  Image,
  ImageBackground
} from 'react-native';
import { connect } from 'react-redux';
import { width, height } from '../constants/Layout';

function HomeScreen(props) {
  const docId = props.docId;
  const userName = props.userName;
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
        <View style={styles.itemsContainer}>
          <Image
            source={require('../weJay.png')}
            style={{ width: 250, height: 250, marginTop: 150 }}
          />
          <View>
            <TouchableHighlight
              style={styles.button}
              onPress={() => props.navigation.navigate('CreatePlaylistForm')}
            >
              <Text style={styles.text}>Create Playlist</Text>
            </TouchableHighlight>

            <TouchableOpacity
              style={styles.button}
              onPress={() =>
                props.navigation.navigate('JoinPlaylistForm', {
                  docId,
                  userName,
                  otherParam: 'Join A Playlist'
                })
              }
            >
              <Text style={styles.text}>Join Playlist</Text>
            </TouchableOpacity>
            {docId ? (
              <TouchableOpacity
                style={styles.goToPlaylistButton}
                onPress={() =>
                  props.navigation.navigate('PlaylistRoom', {
                    docId,
                    userName
                  })
                }
              >
                <Text style={styles.text}>Go To Playlist</Text>
              </TouchableOpacity>
            ) : null}
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}
const mapStateToProps = state => {
  return {
    docId: state.docId,
    roomData: state.roomData,
    userName: state.userName
  };
};
export default connect(mapStateToProps)(HomeScreen);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    flexDirection: 'column',
    alignItems: 'center',
    width: 375,
    height: 700
  },
  itemsContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
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
    borderRadius: 25,
    padding: 10,
    backgroundColor: '#FF5857',
    width: 300
  },
  goToPlaylistButton: {
    marginTop: 30,
    borderRadius: 25,
    padding: 10,
    backgroundColor: '#A085AD',
    width: 300
  }
});
