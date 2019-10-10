import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Card, Image, ListItem } from 'react-native-elements';
import { Feather } from '@expo/vector-icons';
import db from '../firebase/index.js'



export default function SingleSong(props) {
  const song = props.song;
  const userName = props.userName;
  const docId = props.docId;
  const handleVote = (vote) => {
    if(vote === 'up'){
        let updateVote = {}
        updateVote[`users.${userName}`] = 'up'
        let songRef = db.collection('Rooms').doc(docId).collection('Playlist').doc('kOxjtrsCEz9Cu30AAhOA');
        songRef.update({['users.'+userName]:'up'});
        console.log(vote);
    }else {
        console.log(vote)
    }
  }
  return (
    <Card style={styles.song}>
          <View key={song.id} style={styles.songContainer}>
            <Image
              style={{ width: 80, height: 80 }}
              resizeMode="cover"
              source={{
                uri: song.imageUrl
              }}
            />
            <View style={{ paddingLeft: 10 }}>
              <Text
                style={{
                  paddingTop: 25,
                  fontWeight: 'bold',
                  fontSize: 14
                }}
              >
                {song.name}
              </Text>
              <Text style={{ fontSize: 12 }}>{song.artist}</Text>
            </View>
            <View style={{ marginLeft: 'auto' }}>
            <TouchableOpacity
               onPress={() => handleVote('up')}
            >
              <Feather
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
              <Feather
                name="chevron-down"
                size={30}
                color="black"
                // onPress={() => handleVote}
              />
            </View>
          </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  songContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 10
  }
});
