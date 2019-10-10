import React, { Component, useState, useEffect } from 'react';
import { AuthSession } from 'expo';
import { encode as btoa } from 'base-64';
import { Text, View, FlatList, StyleSheet, ScrollView } from 'react-native';

import { SearchBar, Button } from 'react-native-elements';
import { Container, Content, Footer } from 'native-base';
require('../secrets');
import { Card, CardButton } from 'react-native-cards';
import SongCard from '../screens/SongCard.js';
import { refreshRoomToken, getRoomData } from '../firebase/index';

export default function SearchScreen(props) {
  let [search, setSearch] = useState('');
  let [results, setResults] = useState({});
  let [docId, setDocId] = useState(props.navigation.state.params.docId);
  let [accessToken, setAccessToken] = useState('');
  const userName = props.navigation.state.params.userName;
  const accountInitialize = async () => {
    try {
      let result = await refreshRoomToken(docId);
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
          onSubmitEditing={searchHandler}
          returnKeyType="search"
          inputStyle={{backgroundColor: 'white'}}
          containerStyle={{backgroundColor: 'white', borderWidth: 1, borderRadius: 40, borderColor: 'black'}}
          inputContainerStyle={{backgroundColor: 'white', borderColor: 'black'}}
        />

        <ScrollView style={{ top: 10 }}>
          {results.tracks ? (
            <FlatList
              data={results.tracks.items}
              renderItem={({ item }) => <SongCard item={item} docId={docId} userName ={userName}/>}
              keyExtractor={item => item.id}
            />
          ) : (
            <Text>Search We-J for a Song!</Text>
          )}
        </ScrollView>
      </Content>

    </Container>
    )
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
    backgroundColor: 'white',
    display: 'flex',
    alignItems: 'stretch'
  },
  card: {
    backgroundColor: 'white',
    color: '#E7F9A9',
    display: 'flex',
    flexDirection: 'row',
    borderWidth: 2.5,
    borderColor: 'grey'
  },
  songInfo: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    padding: 13,
    justifyContent: 'center'
  },
  searchBar: {
    backgroundColor: 'white'
  }
});
