import React, {Component} from 'react';
import { Card, CardTitle, CardContent, CardAction, CardButton, CardImage } from 'react-native-cards';
import {
    Text,
    View,
    FlatList,
    Image,
    Button,
    StyleSheet,
    ScrollView,
    TouchableHighlight,
    TouchableOpacity,
    AsyncStorage,
    SafeAreaView
} from 'react-native'
import Modal from 'react-native-modal'

import {addSong} from '../api/spotify'
import {addSongToDB, getRoomData} from '../firebase/index'


export default class SongCard extends Component {

    constructor(props){
        super(props);
        this.state = {
            docId: this.props.docId,
            visibleModal: false
        }
        this.handleSongSelection = this.handleSongSelection.bind(this)
        this.toggleModal = this.toggleModal.bind(this)
    }
    songDataParser = (data) => {
        let result  = {
            name: data.name,
            id: data.id,
            href: data.href,
            uri: data.uri,
            artist: data.artists[0].name,
            imageUrl: data.album.images[0].url,
            albumName: data.album.name,
            votes: 0,
            timeAdded: Date.now(),
            users: {
                [this.props.userName]: null
            }
        };
        return result;
    }
   handleSongSelection = async () => {
       this.toggleModal();
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

    toggleModal(){
        this.setState({visibleModal: !this.state.visibleModal})
    }

    render(){
        return (
    <View>
    <TouchableHighlight onPress={this.toggleModal}>
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

    <Modal isVisible={this.state.visibleModal}>
            <View style={styles.content}>
                <Text numberOfLines={2} ellipsizeMode='tail' style={styles.contentTitle}>{this.props.item.name}</Text>

                <View style={styles.modalDetails}>
                    <Image
                    style={{width: 200, height: 200, marginBottom: 20}}
                    resizeMode='cover'
                    source={{uri: `${this.props.item.album.images[1].url}`}}
                    />
                    <Text numberOfLines={1} ellipsizeMode='tail' style={{fontSize: 15, marginBottom: 20}}>{this.props.item.album.artists[0].name} - {this.props.item.album.name}</Text>
                </View>

                <View>
                    <TouchableOpacity
                    style={styles.addButton}
                    onPress={this.handleSongSelection}
                    >
                        <Text style={styles.addButtonText}>Add To Playlist</Text>
                    </TouchableOpacity>

                    <Button
                    title='Cancel'
                    style={{top: 15}}
                    onPress={() => this.setState({visibleModal: false})}
                    />
                </View>
            </View>
    </Modal>
    </View>

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
    },
    content: {
        backgroundColor: 'white',
        padding: 22,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        borderColor: 'rgba(0, 0, 0, 0.1)',
      },
    contentTitle: {
        fontSize: 20,
        marginBottom: 12,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    modalDetails: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    addButton: {
        // marginRight: 80,
        // marginLeft: 80,
        // marginTop: 25,
        // paddingTop: 10,
        backgroundColor: 'green',
        borderRadius: 10,
    },
    addButtonText: {
        color: 'black',
        textAlign: 'center',
        fontSize: 25,
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 8,
        paddingBottom: 8
    }

})
