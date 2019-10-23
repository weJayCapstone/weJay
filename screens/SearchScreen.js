import React, { useState, useEffect } from 'react';

import {
  Text,
  View,
  FlatList,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image
} from 'react-native';
import { Feather } from '@expo/vector-icons';

import { SearchBar } from 'react-native-elements';
import { Container, Content } from 'native-base';
import SongCard from '../screens/SongCard.js';
import { refreshRoomToken } from '../firebase/index';
import { connect } from 'react-redux';

function SearchScreen(props) {
  const userName = props.userName;
  const docId = props.docId;
  let [search, setSearch] = useState('');
  let [results, setResults] = useState({});
  let [accessToken, setAccessToken] = useState('');

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
    const q = encodeURIComponent(`"${search}*"`);
    const response = await fetch(
      `https://api.spotify.com/v1/search?type=artist,track,album&limit=10&market=US&q=${q}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }
    );
    const searchJSON = await response.json();
    setResults(searchJSON);
  };

  const activeSearch = async text => {
    setSearch(text);

    await searchHandler();
  };

  SearchScreen.navigationOptions = {
    headerLeft: (
      <TouchableOpacity
        onPress={() => {
          props.navigation.navigate('PlaylistRoom');
        }}
      >
        <Feather name="chevron-left" size={32} color="#4392F1" />
      </TouchableOpacity>
    )
  };

  return (
    <Container style={styles.mainView}>
      <View style={{ height: 13 }} />
      <SearchBar
        placeholder="Search"
        onChangeText={text => activeSearch(text)}
        value={search}
        onSubmitEditing={searchHandler}
        returnKeyType="search"
        style={styles.searchBar}
        inputStyle={{ backgroundColor: 'white' }}
        containerStyle={{
          backgroundColor: 'white',
          borderWidth: 1,
          borderRadius: 40,
          borderColor: 'black',
          width: '95%',
          alignSelf: 'center',
          marginBottom: 5
        }}
        inputContainerStyle={{
          backgroundColor: 'white',
          borderColor: 'black'
        }}
      />
      <View
        style={{ display: 'flex', flex: 1 }}
        contentContainerStyle={{
          justifyContent: 'center',
          alignItems: 'stretch'
        }}
      >
        {results.tracks ? (
          <ScrollView style={{ marginBottom: 30 }}>
            <FlatList
              data={results.tracks.items}
              renderItem={({ item }) => (
                <SongCard item={item} docId={docId} userName={userName} />
              )}
              keyExtractor={item => item.id}
            />
          </ScrollView>
        ) : (
          <View
            style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
          >
            <Image
              style={styles.searchImage}
              source={require('../weJay.png')}
            />
          </View>
        )}
      </View>
    </Container>
  );
}
const mapStateToProps = state => {
  return {
    docId: state.docId,
    userName: state.userName
  };
};
export default connect(mapStateToProps)(SearchScreen);

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
    backgroundColor: '#a99bc9',
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
  },
  searchText: {
    fontSize: 20,
    color: '#FF5857',
    alignSelf: 'center'
  },
  searchImage: {
    opacity: 0.5,
    width: 300,
    height: 300,
    marginBottom: 200
  }
});
