import React, {Component} from 'react'
import {AuthSession} from 'expo'
import { encode as btoa } from 'base-64'
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
import {
    SearchBar,
    Button
} from 'react-native-elements'
import {
    Container,
    Header,
    Content,
    Footer,
    Title,
    InputGroup,
    Input,
    Icon
} from 'native-base';
require('../secrets')
import { Card, CardTitle, CardContent, CardAction, CardButton, CardImage } from 'react-native-cards';
import SongCard from '../screens/SongCard.js'


export default class SearchScreen extends Component {

    constructor(props){
        super(props)
        this.state = {
            search: '',
        }
        this.updateSearch = this.updateSearch.bind(this)
        this.logIn = this.logIn.bind(this)
        this.getTokens = this.getTokens.bind(this)
        this.accountInitialize = this.accountInitialize.bind(this)
        this.refreshTokens = this.refreshTokens.bind(this)
        this.test = this.test.bind(this)
    }

    componentDidMount(){
        //this.accountInitialize()
    }

    updateSearch(search){
        this.setState({search})
    }

    search = async () => {

        const code = await getUserData('accessToken')

        const q = encodeURIComponent(this.state.search)

        const search = await fetch(`https://api.spotify.com/v1/search?type=track&limit=10&market=US&q=${q}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${code}`
            }
        })

        const searchJSON = await search.json()

        this.setState({results: searchJSON})

        this.setState({search: ''})
    }


    logIn = async () => {
        try {
            const redirect = 'https://auth.expo.io/@gbuchanan/weJay'
            const encodedRedirect = encodeURIComponent(redirect)
            const ClientID = 'b7b6a836a01044abb7aa4eeb10c9039a'
            const scopesArr = ['playlist-modify-public', 'user-modify-playback-state', 'user-read-private', 'user-read-email']
            const scopes = encodeURIComponent(scopesArr.join(' '))

            const result = await AuthSession.startAsync({
                authUrl:
                'https://accounts.spotify.com/authorize' +
                '?client_id=' +
                ClientID +
                '&response_type=code' +
                '&redirect_uri=' +
                encodedRedirect +
                (scopes ? '&scope=' + scopes : '')
            })

            return result.params.code

        }
        catch (err){
            console.log(err)
        }
    }

    getTokens = async () => {

        try {
            const authorizationCode = await this.logIn()
            const ClientID = 'b7b6a836a01044abb7aa4eeb10c9039a'
            const ClientSecret = process.env.SPOTIFY
            const redirect = 'https://auth.expo.io/@gbuchanan/weJay'
            const encodedRedirect = encodeURIComponent(redirect)
            const credsB64 = btoa(`${ClientID}:${ClientSecret}`)

            const response = await fetch('https://accounts.spotify.com/api/token', {
                    method: 'POST',
                    headers: {
                        Authorization: `Basic ${credsB64}`,
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: `grant_type=authorization_code&code=${authorizationCode}&redirect_uri=${encodedRedirect}`,
                })

            const responseJSON = await response.json()

            const {
                access_token: accessToken,
                refresh_token: refreshToken,
                expires_in: expiresIn
            } = responseJSON

            const expirationTime = new Date().getTime() + expiresIn * 1000;

            await setUserData('accessToken', accessToken)
            await setUserData('refreshToken', refreshToken)
            await setUserData('expirationTime', expirationTime.toString())
            console.log('this is access token...', await getUserData('accessToken'))
        }
        catch (e){
            console.log(e)
        }
    }

    refreshTokens = async () => {

        try {
            const ClientID = 'b7b6a836a01044abb7aa4eeb10c9039a'
            const ClientSecret = process.env.SPOTIFY
            const credsB64 = btoa(`${ClientID}:${ClientSecret}`)
            const refreshToken = await getUserData('refreshToken')

            const response = await fetch('https://accounts.spotify.com/api/token', {
                method: 'POST',
                headers: {
                    Authorization: `Basic ${credsB64}`,
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: `grant_type=refresh_token&refresh_token=${refreshToken}`
            });

            const responseJSON = await response.json();

            if (responseJSON.error){
                await this.getTokens()
            }
            else {
                const {
                    access_token: newAccessToken,
                    refresh_token: newRefreshToken,
                    expires_in: expiresIn,
                } = responseJSON

                const expirationTime = new Date().getTime() + expiresIn * 1000;

                await setUserData('accesssToken', newAccessToken)

                if (newRefreshToken){
                    await setUserData('refreshToken', newRefreshToken)
                }
                await setUserData('expirationTime', expirationTime.toString())

            }
        }
        catch (e){
            console.log(e)
        }
    }

    accountInitialize = async () => {
        try {
            await this.refreshTokens();
            await this.getTokens()
        }
        catch (e){
            console.log(e)
        }
    }

    test = async () => {
        try {
            const code = await getUserData('accessToken')

            console.log('this is accessToken', code)

            let user = await fetch('https://api.spotify.com/v1/me', {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${code}`,
                    'Content-Type': 'application/json'
                }
            })

            const userJSON = await user.json()
            console.log('user object, ', userJSON)
            console.log('this is userId? ', userJSON.id)

            const userID = userJSON.id

            const playlist = await fetch(`https://api.spotify.com/v1/users/${userID}/playlists`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${code}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({name: 'Please Work Again', public: true})
            })

            const playlistJSON = await playlist.json()
            const playlistID = playlistJSON.id
            console.log('this is playlist, ', playlistJSON)
            console.log('this is playlistID', playlistID)


            const song = await fetch(`https://api.spotify.com/v1/playlists/${playlistID}/tracks`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${code}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({uris: ['spotify:track:4qsAYBCJnu2OkTKUVbbOF1', 'spotify:track:7e89621JPkKaeDSTQ3avtg']})
            })

            const songJSON = await song.json();
            //console.log('this is songJSON ', songJSON)

        }
        catch (e){
            console.log(e)
        }
    }

    render(){

        const { search } = this.state

        return (


            <Container style={styles.mainView}>
                <View style={{height: 13}} />

                <Content style={{backgroundColor: 'blue'}}>
                    <SearchBar
                    placeholder='Search'
                    onChangeText={this.updateSearch}
                    value={search}
                    onSubmitEditing={this.search}
                    returnKeyType = 'search'
                    round={true}
                    />
                    
            <ScrollView contentContainerStyle={{flexGrow: 1}}>
                    
                {this.state.results ?
                <FlatList
                data={this.state.results.tracks.items}
                renderItem={({item}) => <SongCard item={item} />}
                keyExtractor={item => item.id}
                />
                :
                <View style={{alignItems: 'center', fontSize: 30, backgroundColor: 'red'}}>
                    <Text>Search We-J for a Song!</Text>
                </View>
                }


            </ScrollView>
             
                </Content>

                <Footer>
                    <Card style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'white',   
                    }}>
                            <CardButton
                            title='ADD'
                            color='yellow'
                            style={{
                                backgroundColor: 'green',
                                alignSelf: 'stretch',
                                right: 4
                            }}
                            />
                    </Card>
                </Footer>
            </Container>

        )
    }
}


async function setUserData(key, value){

    try {
        await AsyncStorage.setItem(key, value)
    }
    catch (e){
        console.log(e)
    }
}

async function getUserData(key){
    try {
        const value = await AsyncStorage.getItem(key)
        if (value !== null){
            return value
        }
    }
    catch (e){
        console.log(e)
    }
}


const styles = StyleSheet.create({
    mainView: {
        backgroundColor: 'blue',
        display: 'flex',
        alignItems: 'stretch'
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



////PlAYBACK FUNCTIONS

export default class PlaybackClass extends Component {

    constructor(props){
        super(props)

        this.state = {
            currentSong: {},
            songs: [],
            paused: false,
            playing: null
        }
        this.playSong = this.playSong.bind(this)
        this.nextSong = this.nextSong.bind(this)
        this.pauseSong = this.pauseSong.bind(this)
        this.fetchSongs = this.fetchSongs.bind(this)
        this.setCurrentSong = this.setCurrentSong.bind(this)
        this.resumeSong = this.resumeSong.bind(this)
        this.playbackTimer = this.playbackTimer.bind(this)
    }

    componentDidUpdate(){

    }

    fetchSongs = async () => {

        let roomData = await getRoomData(this.props.docId)
        let tracks = await getPlaylistTracks(roomData)

        this.setState({songs: tracks})

    }

    setCurrentSong = async () => {

        let roomData = await getRoomData(this.props.docId)
        let playing = await currentTrack(roomData)
        this.setState({currentSong: playing})
    }

    playbackTimer = (songTime) => {

        console.log('this is songTime', songTime)
        console.log('this is this.state.songs.length', this.state.songs.length)

        setTimeout(function(){
            if (this.state.songs.length > 1){
                console.log('this is inside the timeout')
                this.nextSong()
            }
        }.bind(this), songTime)

    }

    playSong = async () => {

        try {
            let roomData = await refreshRoomToken(this.props.docId)
            console.log('songs before fetch', this.state.songs)
            await this.fetchSongs();
            console.log('songs after fetch', this.state.songs)
            let song = this.state.songs[0]
            console.log(roomData);
            await play(roomData, song);

            await this.setCurrentSong()
            const songLength = this.state.currentSong.item.duration_ms
            this.playbackTimer(songLength)

            console.log('does this work in play song? ', this.state.songs)

        } catch (err){
            console.log(err);
        }
    }

    nextSong = async () => {

        let roomData = await getRoomData(this.props.docId)
        let currentSong = this.state.currentSong.item.uri

        await shiftPlaylist(roomData, currentSong)

        await this.playSong()

    }

    pauseSong = async () => {
        let roomData = await getRoomData(this.props.docId)
        await this.setCurrentSong()
        this.setState({paused: true})
        this.setState({songs: []})
        this.playbackTimer()
        await pause(roomData)
    }

    resumeSong = async () => {
        await this.fetchSongs()
        //let song = this.state.songs[0]
        let song = this.state.currentSong.item.uri
        console.log('this is song in resume', song)
        let roomData = await getRoomData(this.props.docId)
        let progress = this.state.currentSong.progress_ms

        let remainingTime = this.state.currentSong.item.duration_ms - progress

        await resume(roomData, song, progress)
        this.playbackTimer(remainingTime)

        this.setState({paused: false})
    }