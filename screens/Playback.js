import React, { useState } from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';
import { Card, Image, ListItem } from 'react-native-elements';
import { Feather } from '@expo/vector-icons';

const dummySongs = [
  {
    id: 1,
    imageUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcT77F0HHO8TgKU4y94P4PkYmgYgZrlmv_PaS_dEGBeetbsp5_7B',
    name: 'Bye Bye Bye',
    artist: 'NSYNC',
    upvote: false,
    downvote: false
  }
];

export default function SingleSong() {
  return (
    <View style={styles.container}>
      {/* <StatusBar hidden /> */}
      {dummySongs.map(song => {
        return (
          <View key={song.id}>
            <Image
              style={styles.image}
              resizeMode="cover"
              source={{
                uri: song.imageUrl
              }}
            />
            <View>
              <Text style={styles.songName}>{song.name}</Text>
              <Text style={styles.songArtist}>{song.artist}</Text>
            </View>

            <View style={styles.icons}>
              <Feather name="pause" size={50} color="#FF5857" />
              <Feather name="play" size={50} color="#FF5857" />
              <Feather name="skip-forward" size={50} color="#FF5857" />
            </View>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    flexDirection: 'column',
    backgroundColor: '#F4F8FF',
    alignItems: 'center'
  },
  image: {
    width: 300,
    height: 300
  },
  songName: {
    fontWeight: 'bold',
    fontSize: 25,
    paddingBottom: 15,
    paddingTop: 15,
    alignSelf: 'center'
  },
  songArtist: {
    fontSize: 20,
    alignSelf: 'center'
  },
  icons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 50
  }
});
