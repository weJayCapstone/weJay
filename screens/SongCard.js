import React, {Component} from 'react';
import { Card, CardTitle, CardContent, CardAction, CardButton, CardImage } from 'react-native-cards';
import {
    Text,
    View,
    FlatList,
    Image,
    StyleSheet,
    ScrollView,
    TouchableHighlight,
    AsyncStorage,
    SafeAreaView
} from 'react-native'

import {addSong} from '../api/spotify'
import {addSongToDB, getRoomData} from '../firebase/index'


export default class SongCard extends Component {

    constructor(props){
        super(props)
        this.handleSongSelection = this.handleSongSelection.bind(this)
    }

   handleSongSelection = async () => {
        console.log('is on press working?')
        const roomID = 'J63ViPbDgGvPdsJ2It0Y'
        
       const roomData = await getRoomData(roomID)
       const playlistID = roomData.playlistID
       
       const accessToken = roomData.accessToken
    //    const songURI = {songUri: 'spotify:track:4JGKZS7h4Qa16gOU3oNETV'}
       const songURI = {songUri: `${this.props.item.uri}`}

        //accessToken, playlistId, songData
        await addSong(accessToken, playlistID, songURI);
        //roomId and songData
        await addSongToDB(roomID, songURI);

    }

    render(){
        return (
    
    <TouchableHighlight onPress={this.handleSongSelection}>
        <Card
        style={styles.card}
        >

            <View>
                <Image
                style={{width: 100, height: 100}}
                resizeMode='cover'
                source={{uri: `${this.props.item.album.images[1].url}`}}
                />
            </View>

            <View style={styles.songInfo}>
            <View>
                <Text style={{fontSize: 30}}>{this.props.item.name}</Text>
            </View>

            <View style={{top: 5}}>

                <Text style={{fontSize: 18}}>{this.props.item.album.artists[0].name} - {this.props.item.album.name}</Text>

            </View>
            </View>

        </Card>
    </TouchableHighlight>

        )
    }
}


const styles = StyleSheet.create({
    mainView: {
        backgroundColor: 'grey',

    },
    card: {
        backgroundColor: '#E7F9A9',
        color: '#E7F9A9',
        display: 'flex',
        flexDirection: 'row',
        borderWidth: 2.5,
        borderColor: 'white'
    },
    songInfo: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
        // left: 7,
        // top: 7,
        padding: 13,
        justifyContent: 'center'
    },
    searchBar: {
        backgroundColor: '#d6c2c0'
    }
})

{/* <Card style={styles.card}>
<CardImage source={{uri: `${this.props.item.album.images[1].url}`}} />
<CardContent>
    <CardTitle title ={this.props.item.name} />
    <Text>Artist: {this.props.item.album.artists[0].name}</Text>
    <Text>Album: {this.props.item.album.name}</Text>
</CardContent>
<CardButton title='Add!' />
</Card> */}