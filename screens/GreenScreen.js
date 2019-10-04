'use strict';
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  Button
} from 'react-native';

export default class GreenScreen extends Component {
  static navigationOptions = {
    title: 'Green'
  };
  render() {
    return (
      <View style={styles.green}>
        <Text style={styles.text}>This is the Green Screen</Text>
        <TouchableHighlight
          style={styles.button}
          onPress={() => this.props.navigation.navigate('Red')}
        >
          <Text style={styles.text}>Go to Red</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  green: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'green'
  },
  text: {
    color: 'white',
    fontSize: 20
  },
  button: {
    backgroundColor: '#1E90FF',
    padding: 20,
    borderRadius: 8,
    marginTop: 20
  }
});
