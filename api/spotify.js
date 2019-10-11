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
      'playlist-modify-private',
      'user-modify-playback-state',
      'user-read-private',
      'user-read-email',
      'user-read-currently-playing',
      'user-read-playback-state'
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
  } catch (err) {
    console.log(err);
  }
}

export const makeNewPlaylist = async (accessToken, playListName) => {
  try {
    //const code = await getUserData('accessToken')

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
    console.log(userID);
    const playlist = await fetch(
      `https://api.spotify.com/v1/users/${userID}/playlists`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },

        body: JSON.stringify({
          name: playListName,
          public: true
        })
      }
    );

    const playlistJSON = await playlist.json();
    const playlistID = playlistJSON.id;
    //console.log('this is playlist, ', playlistJSON)
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
    if (songJSON.snapshot_id) {
      console.log('You added a song!');
    } else {
      console.log('something went wrong in Spotify :(');
    }
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
    // if (responseJSON.error){
    //     await getTokens()
    // }
    // else {
    //     const {
    //         access_token: newAccessToken,
    //         refresh_token: newRefreshToken,
    //         expires_in: expiresIn,
    //     } = responseJSON

    //     const expirationTime = new Date().getTime() + expiresIn * 1000;

    //     await setUserData('accesssToken', newAccessToken)

    //     if (newRefreshToken){
    //         await setUserData('refreshToken', newRefreshToken)
    //     }
    //     await setUserData('expirationTime', expirationTime.toString())

    // }
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

export const play = async (roomData, songID) => {
  try {
    const start = await fetch('https://api.spotify.com/v1/me/player/play', {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${roomData.accessToken}`,
        'Content-Type': 'application/json'
      },
      // body: JSON.stringify({uris: [`spotify:track:${songID}`]})
      body: JSON.stringify({ uris: [`${songID}`] })
    });

    // const startJSON = await start.json()
    // console.log('START JSON :', startJSON)
  } catch (e) {
    console.log(e);
  }
};

export const resume = async (roomData, songID, progress) => {
  try {
    const start = await fetch('https://api.spotify.com/v1/me/player/play', {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${roomData.accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ uris: [`${songID}`], position_ms: `${progress}` })
    });
  } catch (e) {
    console.log(e);
  }
};

export const next = async roomData => {
  try {
    console.log('are you getting to next function?');
    const next = await fetch('https://api.spotify.com/v1/me/player/next', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${roomData.accessToken}`
      }
    });
  } catch (e) {
    console.log(e);
  }
};

export const pause = async roomData => {
  try {
    await fetch('https://api.spotify.com/v1/me/player/pause', {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${roomData.accessToken}`
      }
    });
  } catch (e) {
    console.log(e);
  }
};

export const currentTrack = async roomData => {
  try {
    let track = await fetch(
      'https://api.spotify.com/v1/me/player/currently-playing',
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${roomData.accessToken}`
        }
      }
    );

    let trackJSON = await track.json();
    // console.log('trackJSON', trackJSON);

    return trackJSON;
  } catch (e) {
    console.log(e);
  }
};

export const getPlaylistTracks = async roomData => {
  try {
    let tracks = await fetch(
      `https://api.spotify.com/v1/playlists/${roomData.playlistID}/tracks`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${roomData.accessToken}`
        }
      }
    );
    let tracksJSON = await tracks.json();
    let arr = tracksJSON.items;

    let songs = arr.map(function(el) {
      // console.log('this is el in map', el)
      return el.track.uri;
    });
    if (tracks.status !== 200) {
      console.log(
        'somethings off in spotify, this is your status:',
        tracks.status
      );
    }
    return songs;
  } catch (e) {
    console.log(e);
  }
};

export const shiftPlaylist = async (roomData, currentSong) => {
  try {
    // console.log("current song in delete", currentSong);
    let deleted = await fetch(
      `https://api.spotify.com/v1/playlists/${roomData.playlistID}/tracks`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${roomData.accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          tracks: [{ uri: currentSong, position: [0] }]
        })
      }
    );

    let deletedJSON = await deleted.json();
    console.log('this is deleted', deletedJSON);
  } catch (e) {
    console.log(e);
  }
};
