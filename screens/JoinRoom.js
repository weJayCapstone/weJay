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
  import { LinearGradient } from 'expo-linear-gradient';
  import { Feather } from '@expo/vector-icons';
  import db from '../cloudServer/index';
  import axios from 'axios'
  import {addSongs} from '../cloudServer/index'
  import {getSpotifyPlaylist} from '../spotifyUtils/index'
  //user will have access to room name some how, for now we will try to access our newRoom
  let currentToken = "BQBjBWbSLcJjEKuWehF1JhHLLBSXLmJ_oWE88zXEEUZvJe7eKblMP9SKBmuEcEYqVNG2QElXr08IE4mO3H7j5nws5qqx4hIymBB-BsV5Oru7YkZ4ImhiRcS5l59Zy2y-CO8qK6Vu7F12X3Uk13HbALd9IJRO2KrDZi6RzSDHE9l4-Hlo40uLVjYxd2PVun3lRmrt1d4hOTzmbQUG6TBQ";
  const roomName = 'newRoom';
  
  export default function JoinRoom() {
    const [songs, setSongs] = useState([]);
  
    //get songs from spotify playlist?
    
    //add songs to database, try returning songs?
   // addSongs(songs, 'newRoom'); adds infinite songs!!!!
    return (
        <ScrollView>
            <LinearGradient
          colors={['#000000', '#666666', '#AAAAAA']}
          style={{ padding: 15, borderRadius: 5 }}>
              <Text
              style={{
                backgroundColor: 'transparent',
                fontSize: 20,
                alignContent:'center',
                marginBottom: 10,
                fontWeight: 'bold',
                color: '#fff',
              }}
              >Playlist Title</Text>
            {
                songs.map(song => <View key={song.track.name} style={styles.songContainer}>
                    <Text style={{color:'#ffffff'}}>{song.track.name}</Text>
                    <TouchableOpacity
                    style={{justifyContent: 'flex-end'}}
                    >
                     <Feather name="thumbs-up" size={20} color="white" />
                    </TouchableOpacity>
                    </View>)
            }
            </LinearGradient>
        </ScrollView>
    )
  }


const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center'
    },
    songContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent:'space-between',
        marginBottom: 10
    }
});