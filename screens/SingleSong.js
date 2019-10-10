import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Card, Image, ListItem } from 'react-native-elements';
import { Feather } from '@expo/vector-icons';
import { play } from '../api/spotify'
import db ,{updateVote}from '../firebase/index.js'



export default function SingleSong(props) {
  const song = props.song;
  const userName = props.userName;
  const docId = props.docId;
  const handleVote = async(vote, songName) => {
    try{
        await updateVote(songName,vote,userName,docId);
    }catch(err){
        console.log(err);
    }
  }
  return (
    <View key={song.id} style={styles.background}>
    <Card style={styles.containerStyle}>
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
              paddingTop: 25,
              fontWeight: 'bold',
              fontSize: 14,
              width: 150
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
        <TouchableOpacity
               onPress={() => handleVote('up', song.name)}
            >
          <Feather style={song.users[userName] === "up"? styles.voteHighlight: styles.vote} name="chevron-up" size={30} color="black" />
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
          <TouchableOpacity
               onPress={() => handleVote('down', song.name)}
            >
            <Feather style={song.users[userName] === 'down'? styles.voteHighlight: styles.vote}name="chevron-down" size={30} color="black" />
          </TouchableOpacity>
        </View>
      </View>
    </Card>
    </View>

    ///////////////////
    // <Card style={styles.song}>
    //       <View key={song.id} style={styles.songContainer}>
    //         <Image
    //           style={{ width: 80, height: 80 }}
    //           resizeMode="cover"
    //           source={{
    //             uri: song.imageUrl
    //           }}
    //         />
    //         <View style={{ paddingLeft: 10 }}>
    //           <Text
    //             style={{
    //               paddingTop: 25,
    //               fontWeight: 'bold',
    //               fontSize: 14
    //             }}
    //           >
    //             {song.name}
    //           </Text>
    //           <Text style={{ fontSize: 12 }}>{song.artist}</Text>
    //         </View>
    //         <View style={{ marginLeft: 'auto' }}>
    //         <TouchableOpacity
    //            onPress={() => handleVote('up')}
    //         >
    //           <Feather
    //             name="chevron-up"
    //             size={30}
    //             color="black"
                
    //           />
    //         </TouchableOpacity>
    //           <Text
    //             style={{
    //               fontWeight: 'bold',
    //               marginLeft: 'auto',
    //               paddingRight: 10
    //             }}
    //           >
    //             {song.votes}
    //           </Text>
    //           <Feather
    //             name="chevron-down"
    //             size={30}
    //             color="black"
    //             // onPress={() => handleVote}
    //           />
    //         </View>
    //       </View>
    // </Card>
  );
}

const styles = StyleSheet.create({
    background: {
      backgroundColor: '#F4F8FF'
    },
    songContainer: {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap'
    },
    containerStyle: {
      display: 'flex',
      flexDirection: 'row'
    },
    feather: { marginLeft: 'auto' },
    button: {
      padding: 15,
      backgroundColor: '#FF5857',
      borderRadius: 25,
      width: 200,
      marginBottom: 25,
      marginTop: 20,
      margin: 'auto',
      shadowColor: '#999',
      shadowOffset: { width: 1, height: 2 },
      shadowOpacity: 0.5,
      shadowRadius: 2,
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
        color:'#FF5857'
    }
    // buttonBackground: {
    //   backgroundColor: '#C9DDFF'
    // }
  });