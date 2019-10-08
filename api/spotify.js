import { AuthSession } from 'expo';
import { encode as btoa } from 'base-64';
import { AsyncStorage } from 'react-native';
require('../secrets');
//need to writ/read accessToken, refreshToken, expirationtime to firestore
//need all spotify requests in this file

export async function logIn() {
  try {
    const redirect = AuthSession.getRedirectUrl();
    const encodedRedirect = encodeURIComponent(redirect);
    const ClientID = process.env.SPOTIFY_CLIENT_ID;
    const scopesArr = [
      'playlist-modify-public',
      'user-modify-playback-state',
      'user-read-private',
      'user-read-email'
    ];
    const scopes = encodeURIComponent(scopesArr.join(' '));

    const result = await AuthSession.startAsync({
      authUrl:
        'https://accounts.spotify.com/authorize' +
        '?client_id=' +
        ClientID +
        '&response_type=code' +
        '&redirect_uri=' +
        encodedRedirect +
        (scopes ? '&scope=' + scopes : '')
    });
    return result.params.code;
  } catch (err) {
    console.log(err);
  }
}

export async function getTokens() {
  try {
    const authorizationCode = await logIn();
    const ClientID = process.env.SPOTIFY_CLIENT_ID; //replace with your client Id from spotify
    const ClientSecret = process.env.SPOTIFY; //replace with your own secret
    const redirect = AuthSession.getRedirectUrl();
    //add variables to secrets file
    const encodedRedirect = encodeURIComponent(redirect);
    const credsB64 = btoa(`${ClientID}:${ClientSecret}`);

    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        Authorization: `Basic ${credsB64}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: `grant_type=authorization_code&code=${authorizationCode}&redirect_uri=${encodedRedirect}`
    });

    const responseJSON = await response.json();
    return responseJSON;
    // const {
    //     access_token: accessToken,
    //     refresh_token: refreshToken,
    //     expires_in: expiresIn
    // } = responseJSON

    //const expirationTime = new Date().getTime() + expiresIn * 1000;

    // await setUserData('accessToken', accessToken)
    // await setUserData('refreshToken', refreshToken)
    // await setUserData('expirationTime', expirationTime.toString())
  } catch (e) {
    console.log(e);
  }
}
export const makeNewPlaylist = async (accessToken, playListName) => {
  try {
    //const code = await getUserData('accessToken')

    console.log('this is accessToken', accessToken);

    let user = await fetch('https://api.spotify.com/v1/me', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      }
    });

    const userJSON = await user.json();
    //console.log('user object, ', userJSON)
    //console.log('this is userId? ', userJSON.id)
    const userID = userJSON.id;

    const playlist = await fetch(
      `https://api.spotify.com/v1/users/${userID}/playlists`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: playListName, public: true })
      }
    );

    const playlistJSON = await playlist.json();
    const playlistID = playlistJSON.id;
    //console.log('this is playlist, ', playlistJSON)
    console.log('this is playlistID', playlistID);
    console.log('Youve made a playlist!');
    return playlistID;
  } catch (e) {
    console.log(e);
  }
};

export const addSong = async (roomData, songData) => {
  try {
    const song = await fetch(
      `https://api.spotify.com/v1/playlists/${roomData.playlistID}/tracks`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${roomData.accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ uris: [songData.uri] })
      }
    );
    const songJSON = await song.json();
    console.log('this is songJSON ', songJSON);
    //if this succeeds add to database
  } catch (err) {
    console.log(err);
  }
};

export async function refreshTokens(refreshToken) {
  try {
    const ClientID = process.env.SPOTIFY_CLIENT_ID;
    const ClientSecret = process.env.SPOTIFY;
    const credsB64 = btoa(`${ClientID}:${ClientSecret}`);

    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        Authorization: `Basic ${credsB64}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: `grant_type=refresh_token&refresh_token=${refreshToken}`
    });

    const responseJSON = await response.json();
    return responseJSON;
  } catch (e) {
    console.log(e);
  }
}

export async function setUserData(key, value) {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    console.log(e);
  }
}

export async function getUserData(key) {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return value;
    }
  } catch (e) {
    console.log(e);
  }
}
