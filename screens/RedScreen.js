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

export default class RedScreen extends Component {
  render() {
    return (
      <View style={styles.red}>
        <Text style={styles.text}>This is the Red Screen</Text>
        <TouchableHighlight
          style={styles.button}
          onPress={() => this.props.navigation.goBack()}
        >
          <Text style={styles.text}>Back to Green</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

RedScreen.navigationOptions = props => {
  const { navigation } = props;
  return {
    headerTitle: 'Red',
    headerRight: (
      <Button title="Purple" onPress={() => navigation.navigate('Purple')} />
    ),
    headerLeft: (
      <Button title="Blue" onPress={() => navigation.navigate('Blue')} />
    )
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  red: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'red'
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
