import React, {Component} from 'react';
import {
    View,
    Text
} from 'react-native'
import {getFinalPlaylist} from '../firebase/index'
import {connect} from 'react-redux';
import { play } from '../api/spotify';

class Stats extends Component{
    constructor() {
        super();
        this.state ={
            playlist:[]
        }
    }
    async componentDidMount() {
        try{
            let result = await getFinalPlaylist(this.props.docId)
            this.setState({
                playlist: result
            })
        }catch(err){
            console.log(err)
        }
    }
    getDJs(playlistArr){
        let djs = playlistArr.map(song => song.addedBy);
        return djs.join(' ');
    }
    getPlaylistDuration(playlistArr){
        let totalDuration = playlistArr.reduce((sum, song)=> {
            return sum + song.duration;
        }, 0)
        console.log(totalDuration);
    }
    getLeastPopularSong(playlistArr) {
        let downVoteObj= {};
        let downVoteResults = playlistArr.map(song =>{
            let count = 0;
            for(let key in song.currentSong.users){
                if(song.currentSong.users[key] === 'down'){
                    count++;
                }
            }
            downVoteObj[count] = song.currentSong;
            return count;
        });
        downVoteResults.sort();
        console.log('least popular song',downVoteObj[downVoteResults[downVoteResults.length-1]].name)
        return downVoteObj[downVoteResults[downVoteResults.length-1]].name;
    }
    getMostPopularSong(playlistArr){
        let obj= {};
        let results = playlistArr.map(song =>{
            let count = 0;
            for(let key in song.currentSong.users){
                if(song.currentSong.users[key] === 'up'){
                    count++;
                }
            }
            obj[count] = song.currentSong;
            return count;
        });
        results.sort();
        //most upvoted song, obj properties are getting overwritten
        console.log('most upvoted song',obj[results[results.length-1]].name);
        let songName = obj[results[results.length-1]].name
        return songName;
    }
    getBestDJ(playlistArr){
        let obj= {};
        let results = playlistArr.map(song =>{
            let count = 0;
            for(let key in song.currentSong.users){
                if(song.currentSong.users[key] === 'up'){
                    count++;
                }
            }
            obj[count] = song.currentSong;
            return count;
        });
        results.sort();
        //most upvoted song, obj properties are getting overwritten
        let user = obj[results[results.length-1]].addedBy;
        console.log('best DJ',user)
        return user;
    }
    
    render(){
        return(
            <View>
                <Text>Your Playlist Stats</Text>
            </View>
        )

    }
}
const mapStateToProps = state => {
    return {
        docId: state.docId
    }
}
export default connect(mapStateToProps)(Stats)