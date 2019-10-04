//hardcored constants

//getting a playlist
  export async function getSpotifyPlaylist(token) {

    try{
        const playList = await axios.get("https://api.spotify.com/v1/playlists/2lZ0RyHoyDn8KpI1dAS6Fw/tracks?market=ES&fields=items(track(name%2Chref))", {
          headers: {
            "Authorization": "Bearer " + token
          }
        })
        return playList.data.items
    }catch(err){
        console.log(err)
    }
  }