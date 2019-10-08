import React, { Component, useState, useEffect } from 'react';
import { AuthSession } from 'expo';
import { encode as btoa } from 'base-64';
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
} from 'react-native';
import { SearchBar } from 'react-native-elements';
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
require('../secrets');
import {
  Card,
  CardTitle,
  CardContent,
  CardAction,
  CardButton,
  CardImage
} from 'react-native-cards';
import SongCard from '../screens/SongCard.js';
import { refreshRoomToken, getRoomData } from '../firebase/index';

export default function SearchScreen(props) {
  let [search, setSearch] = useState('');
  let [results, setResults] = useState({});
  let [docId, setDocId] = useState(props.navigation.state.params.docId);
  let [accessToken, setAccessToken] = useState('');
  const accountInitialize = async () => {
    try {
      console.log('docId', props.navigation.state.params.docId);
      let result = await refreshRoomToken(docId);
      console.log('result', result);

      setAccessToken(result.accessToken);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    accountInitialize();
  }, []);
  const searchHandler = async () => {
    const q = encodeURIComponent(search);
    const response = await fetch(
      `https://api.spotify.com/v1/search?type=track&limit=10&market=US&q=${q}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }
    );
    const searchJSON = await response.json();
    setResults(searchJSON);
    setSearch('');
  };
  return (
    <Container style={styles.mainView}>
      <View style={{ height: 13 }} />

      <Content>
        <SearchBar
          placeholder="Search"
          onChangeText={text => setSearch(text)}
          value={search}
        />

        <TouchableHighlight style={styles.button} onPress={searchHandler}>
          <Text style={styles.text}>Search</Text>
        </TouchableHighlight>

        <ScrollView style={{ top: 10 }}>
          {results.tracks ? (
            <FlatList
              data={results.tracks.items}
              renderItem={({ item }) => <SongCard item={item} docId={docId} />}
              keyExtractor={item => item.id}
            />
          ) : (
            <Text>Search We-J for a Song!</Text>
          )}
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
  );
}

function ListCard({ item }) {
  return (
    <View>
      <Text>Song: {item.name}</Text>
      <Text>Album: {item.album.name}</Text>
      <Text>Artist: {item.album.artists[0].name}</Text>
      <Image
        style={{ width: 64, height: 64 }}
        source={{ uri: `${item.album.images[2]}` }}
        // source={{uri: 'https://i.scdn.co/image/ab67616d000048518074759e322b06e493cbe154'}}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 10,
    margin: 1,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#fff'
  },
  text: {
    fontSize: 20,
    textAlign: 'center'
  },
  mainView: {
    backgroundColor: 'grey'
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
});
