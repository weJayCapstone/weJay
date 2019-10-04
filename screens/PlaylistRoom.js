import React from 'react';
import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native';

export default class PlaylistRoom extends React.Component {
  render() {
    return (
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >
        <View>
          <Text style={styles.title}>PLAYLIST TITLE</Text>
          <Text style={styles.host}>Hosted by: HOST NAME</Text>

          <TouchableHighlight style={styles.button}>
            <Text style={styles.text}>SONG #1</Text>
          </TouchableHighlight>

          <TouchableHighlight style={styles.button}>
            <Text style={styles.text}>Song #2</Text>
          </TouchableHighlight>
          <TouchableHighlight style={styles.button}>
            <Text style={styles.text}>SONG #3</Text>
          </TouchableHighlight>

          <TouchableHighlight style={styles.button}>
            <Text style={styles.text}>Song #4</Text>
          </TouchableHighlight>
          <TouchableHighlight style={styles.button}>
            <Text style={styles.text}>SONG #5</Text>
          </TouchableHighlight>

          <TouchableHighlight style={styles.button}>
            <Text style={styles.text}>Song #6</Text>
          </TouchableHighlight>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24
  },
  host: {
    fontSize: 18
  },
  text: {
    fontSize: 20
  }
});
