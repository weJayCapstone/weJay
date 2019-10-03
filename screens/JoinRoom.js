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
  import db from '../cloudServer/index';
  import axios from 'axios'

  //user will have access to room name some how, for now we will try to access our newRoom
  const roomName = 'newRoom'
  async function getSpotifyPlaylist(token) {

    try{
        const playList = await axios.get("https://api.spotify.com/v1/playlists/2lZ0RyHoyDn8KpI1dAS6Fw/tracks?market=ES&fields=items(track(name%2Chref))", {
          headers: {
            "Authorization": "Bearer " + token
          }
        })
        return playList.data.items
    }catch(err){
        console.log(err)
    }
  }

  export default function JoinRoom() {
    const [songs, setSongs] = useState([]);
    async function fetchDB(){
            try{
                let roomsRef =  db.collection('Rooms').doc(roomName);
                let result = await roomsRef.get();
                if(!result.exists) console.log('no document!')
                else {
                    let thing = result.data();
                    return thing["Spotify Token"];
                }
            }catch(err){
                console.log(err)
            }
        }
    let anotherToken = "BQAkc_0wWE8rpfVzRJW_5s9fwtV1XeXq96Izs70SxpGOutOyRs2qf1R6nRqbn2_huyLGSFuF6_GizohH3hGCCsZSMXLLCzMKNKtCPU7ZrdZ7n8nAVnVLR1qCml3fPHjEHT8-2gITDkMIZ3Qpw6ZHcawv5I38l34_cdXyY-Xuxro4tCW-SJDXNccy_QcfrR9is-rJPcfvgH3c3K2iDF0L";

    getSpotifyPlaylist(anotherToken)
        .then(data => {
            setSongs(data)
        })
        .catch(err => console.log(err))
    return (
        <ScrollView>
        {
            songs.map(song => <View key={song.track.name}><Text>{song.track.name}</Text></View>)
        }

        </ScrollView>
    )
  }
