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
        super(props);
        this.state = {
            docId: this.props.docId
        }
        this.handleSongSelection = this.handleSongSelection.bind(this)
    }
    songDataParser = (data) => {
        let result  = {
            name: data.name,
            id: data.id,
            href: data.href,
            uri: data.uri,
            artist: data.artists[0].name,
            imageUrl: data.album.images[0].url,
            albumName: data.album.name
        };
        return result;
    }
   handleSongSelection = async () => {
        const roomID = this.state.docId;
    //    const songURI = {songUri: 'spotify:track:4JGKZS7h4Qa16gOU3oNETV'}
        //roomId and songData
        const songData = this.songDataParser(this.props.item);
        //console.log(songData);
        try {
            await addSongToDB(roomID, songData);
        } catch (err){
            console.log(err);
        }
    }

    render(){
        return (

    <TouchableHighlight onPress={this.handleSongSelection}>
        <Card
        style={styles.card}
        >

            <View>
                <Image
                style={{width: 75, height: 75}}
                resizeMode='cover'
                source={{uri: `${this.props.item.album.images[1].url}`}}
                />
            </View>
            <View style={styles.songInfo}>
            <View>
                <Text numberOfLines={1} ellipsizeMode='tail' style={{fontSize: 19}}>{this.props.item.name} </Text>
            </View>

            <View style={{top: 10}}>

                <Text numberOfLines={1} ellipsizeMode='tail' style={{fontSize: 15}}>{this.props.item.album.artists[0].name} - {this.props.item.album.name}</Text>

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
        borderColor: 'white',
        padding: 4
    },
    songInfo: {
        display: 'flex',
        flexDirection: 'column',
        flexWrap: 'wrap',
        alignItems: 'stretch',
        flex: 1,
        padding: 13,
        justifyContent: 'center',
    },
    searchBar: {
        backgroundColor: '#d6c2c0'
    }
})
