import React, { Component } from 'react';
import {
  Text,
  View,
  FlatList,
  Image,
  StyleSheet,
  ScrollView,
  TouchableHighlight,
  AsyncStorage
} from 'react-native';
import { SearchBar } from 'react-native-elements';
import { Container, Content } from 'native-base';
require('../secrets');
import SongCard from '../screens/SongCard.js';
import { getTokens } from '../api/spotify';

export default class SearchScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: ''
    };
    this.updateSearch = this.updateSearch.bind(this);
    this.accountInitialize = this.accountInitialize.bind(this);
  }

  componentDidMount() {
    this.accountInitialize();
  }

  updateSearch(search) {
    this.setState({ search });
  }

  search = async () => {
    console.log('THIS IS ACCESS TOKEN', this.state.accessToken);
    const q = encodeURIComponent(this.state.search);
    console.log('q', q);

    const search = await fetch(
      `https://api.spotify.com/v1/search?type=track&limit=10&market=US&q=${q}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${this.state.accessToken}`
        }
      }
    );

    const searchJSON = await search.json();

    this.setState({ results: searchJSON });

    this.setState({ search: '' });
  };

  accountInitialize = async () => {
    try {
      let result = await getTokens();
      this.setState({
        accessToken: result.access_token
      });
    } catch (e) {
      console.log(e);
    }
  };

  render() {
    const { search } = this.state;

    return (
      <Container style={styles.mainView}>
        <View style={{ height: 13 }} />

        <Content>
          <SearchBar
            placeholder="Search"
            onChangeText={this.updateSearch}
            value={search}
          />

          <TouchableHighlight style={styles.button} onPress={this.search}>
            <Text style={styles.text}>Search</Text>
          </TouchableHighlight>

          <ScrollView style={{ top: 10 }}>
            {this.state.results ? (
              <FlatList
                data={this.state.results.tracks.items}
                renderItem={({ item }) => <SongCard item={item} />}
                keyExtractor={item => item.id}
              />
            ) : (
              <Text>Search We-J for a Song!</Text>
            )}
          </ScrollView>
        </Content>
      </Container>
    );
  }
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

async function setUserData(key, value) {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    console.log(e);
  }
}

async function getUserData(key) {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return value;
    }
  } catch (e) {
    console.log(e);
  }
}

const styles = StyleSheet.create({
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
    padding: 13,
    justifyContent: 'center'
  },
  searchBar: {
    backgroundColor: '#d6c2c0'
  }
});
