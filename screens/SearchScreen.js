<<<<<<< HEAD
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
        this.accountInitialize()
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

        //console.log('these are search results: ', searchJSON)

        this.setState({results: searchJSON})

        this.setState({search: ''})

        //console.log('this is state results : ', this.state.results)
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
            // const ClientSecret = '4c7abdb1351b49fba4b18a5008f62bb9'
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

            console.log('this is expirationTime, ', expirationTime)
            console.log('this is accessToken in getTokens', accessToken)

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
            // const ClientSecret = '4c7abdb1351b49fba4b18a5008f62bb9'
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
        //const authCode = this.logIn()

    //    this.accountInitialize()

    //    this.test()

    // if (this.state.results){
    //     console.log('this.state.results.tracks.items[0].album.images[2]', this.state.results.tracks.items[0].album.images[2].url)

    // }

        return (


            <Container style={styles.mainView}>
                <View style={{height: 13}} />

                <Content>
                    <SearchBar
                    placeholder='Search'
                    onChangeText={this.updateSearch}
                    value={search}
                    />

                    <TouchableHighlight
                        style={styles.button}
                        onPress={this.search}
                    >
                        <Text style={styles.text}>Search</Text>
                    </TouchableHighlight>
                    
            <ScrollView style={{top: 10}}>
                    
                {this.state.results ?
                <FlatList
                data={this.state.results.tracks.items}
                renderItem={({item}) => <SongCard item={item} />}
                keyExtractor={item => item.id}
                />
                :
                <Text>Search We-J for a Song!</Text>}

            </ScrollView>

                </Content>
            </Container>








            // <ScrollView style={styles.container}>
            //     <Text>Search View</Text>
            //     <SearchBar
            //     placeholder='Search'
            //     onChangeText={this.updateSearch}
            //     value={search}
            //     />

            //     <TouchableHighlight
            //         style={styles.button}
            //         onPress={this.search}
            //     >
            //     <Text style={styles.text}>Search</Text>
            //     </TouchableHighlight>

            //     {this.state.results ?
            //     <FlatList
            //     data={this.state.results.tracks.items}
            //     renderItem={({item}) => <SongCard item={item} />}
            //     keyExtractor={item => item.id}
            //     />
            //     :
            //     <Text>''</Text>}


            // </ScrollView>

        )
    }
}

function ListCard({item}){
    return (

    <View>
        <Text>Song: {item.name}</Text>
        <Text>Album: {item.album.name}</Text>
        <Text>Artist: {item.album.artists[0].name}</Text>
        <Image
        style={{width: 64, height: 64}}
        source={{uri: `${item.album.images[2]}`}}
        // source={{uri: 'https://i.scdn.co/image/ab67616d000048518074759e322b06e493cbe154'}}
         />
    </View>
)
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
=======
import React from 'react'
import {View, Text} from 'react-native'

export default function SearchScreen() {
    return (
        <View><Text>
            Hello
            </Text></View>
    )
}
>>>>>>> 9074e985ebe6ad6bdfb9accb7b47fe53c2603c83
