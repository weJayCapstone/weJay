import React, { useState } from 'react';
import {
  Text,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
  View,
  Image,
  Dimensions
} from 'react-native';
import { connect } from 'react-redux';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

function HomeScreen(props) {
  const docId = props.docId;
  const userName = props.userName;
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('../weJay.png')}
          style={{ width: 150, height: 150 }}
        />
      </View>
      <View>
        <TouchableHighlight
          style={styles.button}
          onPress={() =>
            props.navigation.navigate('CreatePlaylistForm')
          }
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
  );
}
const mapStateToProps = state => {
    return{
        docId: state.docId,
        roomData: state.roomData,
        userName: state.userName
    }
}
export default connect(mapStateToProps)(HomeScreen)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#F4F8FF',
    width: width,
    height: height
  },
  header: {
    paddingBottom: 25,
    marginTop: 100
  },
  text: {
    fontSize: 24,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#fff'
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
    backgroundColor: '#FF5857',
    width: 300
  },
  goToPlaylistButton: {
    marginTop:10,
    shadowColor: '#999',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 1,
    borderRadius: 25,
    padding: 10,
    backgroundColor: '#4392F1',
    width: 300
  }
});
