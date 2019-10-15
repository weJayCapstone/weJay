import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Card, Image, ListItem } from 'react-native-elements';
import { Feather } from '@expo/vector-icons';
import { play } from '../api/spotify';
import db, { updateVote } from '../firebase/index.js';

export default function SingleSong(props) {
  const song = props.song;
  const userName = props.userName;
  const docId = props.docId;
  const handleVote = async (vote, songId) => {
    try {
      await updateVote(songId, vote, userName, docId);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <View key={song.id} style={styles.background}>
      <View style={styles.songContainer}>
        <Image
          style={{ width: 80, height: 80 }}
          resizeMode="cover"
          source={{
            uri: song.imageUrl
          }}
        />
        <View style={{ paddingLeft: 10 }}>
          <Text
            ellipsizeMode="tail"
            numberOfLines={1}
            style={{
              paddingTop: 15,
              fontWeight: 'bold',
              fontSize: 14,
              width: 200
            }}
          >
            {song.name}
          </Text>
          <Text
            ellipsizeMode="tail"
            numberOfLines={1}
            style={{ fontSize: 12, width: 150 }}
          >
            {song.artist}
          </Text>
          <Text
            ellipsizeMode="tail"
            numberOfLines={1}
            style={{ fontSize: 12, width: 150 }}
          >
            {song.albumName}
          </Text>
        </View>
        <View style={styles.feather}>
          <TouchableOpacity onPress={() => handleVote('up', song.id)}>
            <Feather
              style={
                song.users[userName] === 'up'
                  ? styles.voteHighlight
                  : styles.vote
              }
              name="chevron-up"
              size={30}
              color="black"
            />
          </TouchableOpacity>
          <Text
            style={{
              fontWeight: 'bold',
              marginLeft: 'auto',
              paddingRight: 10
            }}
          >
            {song.votes}
          </Text>
          <TouchableOpacity onPress={() => handleVote('down', song.id)}>
            <Feather
              style={
                song.users[userName] === 'down'
                  ? styles.voteHighlight
                  : styles.vote
              }
              name="chevron-down"
              size={30}
              color="black"
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: '#FF5857'
  },
  songContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: 'white',
    borderTopColor: '#FF5857',
    borderBottomColor: '#FF5857',
    borderRightColor: '#FF5857',
    borderLeftColor: '#FF5857',
    borderStyle: 'solid',
    borderWidth: 1,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10
  },
  containerStyle: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#E9DBFF'
  },
  feather: { marginLeft: 'auto', paddingRight: 10 },
  button: {
    padding: 15,
    backgroundColor: '#FF5857',
    borderRadius: 25,
    width: 200,
    marginBottom: 25,
    marginTop: 20,
    margin: 'auto',
    alignSelf: 'center'
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 20,
    textAlign: 'center'
  },
  vote: {
    color: '#000'
  },
  voteHighlight: {
    color: '#FF5857'
  }
});
