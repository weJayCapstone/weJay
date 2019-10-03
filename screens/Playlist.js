import React from 'react';
import {
  Button,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

export default class PlaylistRoom extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.headerText}>Playlist Name</Text>
      </View>
    );
  }
}
