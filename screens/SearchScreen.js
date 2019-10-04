import React, {Component} from 'react'
import {AuthSession} from 'expo'
import { encode as btoa } from 'base-64'
import {
    Text,
    View,
    AsyncStorage,
} from 'react-native'
import {
    SearchBar
} from 'react-native-elements'

export default class SearchScreen extends Component {

    constructor(props){
        super(props)
        this.state = {
            search: ''
        }
        this.updateSearch = this.updateSearch.bind(this)
        this.logIn = this.logIn.bind(this)
        this.getTokens = this.getTokens.bind(this)
        this.accountInitialize = this.accountInitialize.bind(this)
        this.refreshTokens = this.refreshTokens.bind(this)
        this.test = this.test.bind(this)
    }

    updateSearch(search){
        this.setState({search})
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
            const ClientSecret = 'b24315a073694a8eafb1ca555ee402f0'
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
            const ClientSecret = 'b24315a073694a8eafb1ca555ee402f0'
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
            console.log('this is songJSON ', songJSON)

        }
        catch (e){
            console.log(e)
        }
    }

    // search = async () => {
    //     try {
            
    //         let fart = 'fart'




    //     }
    //     catch (err){
    //         console.log(err)
    //     }


    // }


    render(){

        const { search } = this.state
        //const authCode = this.logIn()

       this.accountInitialize()

       this.test()

        return (

            <View>
                <Text>Whatup</Text>
                <SearchBar
                placeholder='Search'
                onChangeText={this.updateSearch}
                value={search}
                />
            </View>

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

