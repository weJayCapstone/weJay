import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card, Image, ListItem } from 'react-native-elements';
import { Feather } from '@expo/vector-icons';

//THIS COMPONENT IS HARD-CODED
const dummySongs = [
  {
    id: 1,
    imgUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcT77F0HHO8TgKU4y94P4PkYmgYgZrlmv_PaS_dEGBeetbsp5_7B',
    title: 'Bye Bye Bye',
    artist: 'NSYNC',
    upvote: false,
    downvote: false
  },
  {
    id: 2,
    imgUrl:
      'https://images-na.ssl-images-amazon.com/images/I/71F3ZjInajL._SL1500_.jpg',
    title: 'Oops! ...I Did It Again',
    artist: 'Britney Spears',
    upvote: false,
    downvote: false
  }
];

export default function SingleSong() {
  const [songs, setSongs] = useState(dummySongs);

  function handleUpVote(evt) {
    if (evt) {
      dummySongs.upvote = true;
    }
  }

  function handleDownVote(evt) {
    if (evt) {
      dummySongs.downvote = true;
    }
  }

  return (
    <Card style={styles.song}>
      {dummySongs.map(song => {
        return (
          <View key={song.id} style={styles.songContainer}>
            <Image
              style={{ width: 80, height: 80 }}
              resizeMode="cover"
              source={{
                uri: song.imgUrl
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
                {song.title}
              </Text>
              <Text style={{ fontSize: 12 }}>{song.artist}</Text>
            </View>
            <View style={{ marginLeft: 'auto' }}>
              <Feather
                name="chevron-up"
                size={30}
                color="black"
                onPress={() => handleUpVote}
              />
              <Text
                style={{
                  fontWeight: 'bold',
                  marginLeft: 'auto',
                  paddingRight: 10
                }}
              >
                {5}
              </Text>
              <Feather
                name="chevron-down"
                size={30}
                color="black"
                onPress={() => handleDownVote}
              />
            </View>
          </View>
        );
      })}
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
