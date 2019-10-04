import {AuthSession} from 'expo'
import { encode as btoa } from 'base-64'
import { AsyncStorage } from 'react-native'

//need to writ/read accessToken, refreshToken, expirationtime to firestore

//need all spotify requests in this file

async function logIn(){

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

async function getTokens(){

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
    }
    catch (e){
        console.log(e)
    }
}


async function refreshTokens(){

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


export default {logIn, getTokens, refreshTokens}
