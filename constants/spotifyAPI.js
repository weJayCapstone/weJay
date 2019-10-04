
import {AuthSession} from 'expo'
console.log(AuthSession.getRedirectUrl())

                // `https://accounts.spotify.com/authorize?client_id=${ClientID}&response_type=code&redirect_uri=${encodedRedirect}`


// logIn = async () => {
//     try {
//         const redirect = 'https://auth.expo.io/@gbuchanan/weJay'
//         const encodedRedirect = encodeURIComponent(redirect)
//         const ClientID = 'b7b6a836a01044abb7aa4eeb10c9039a'
//         const scopesArr = ['playlist-modify-public', 'user-modify-playback-state']
//         const scopes = encodeURIComponent(scopesArr.join(' '))

//         const result = await AuthSession.startAsync({
//             authUrl:
//             'https://accounts.spotify.com/authorize' +
//             '?client_id=' +
//             ClientID +
//             '&response_type=code' +
//             '&redirect_uri=' +
//             encodedRedirect +
//             (scopes ? '&scope=' + scopes : '')
//         })

//         console.log('this is result, ', result)
//         return result.params.code

//     }
//     catch (err){
//         console.log(err)
//     }
// }
