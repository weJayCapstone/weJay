import React, { Component } from "react";
import { Card } from "react-native-cards";
import {
  Text,
  View,
  Image,
  Button,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity
} from "react-native";
import Modal from "react-native-modal";
import { addSongToDB } from "../firebase/index";
import {connect} from 'react-redux'

class SongCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      docId: this.props.docId,
      visibleModal: false,
      userName: this.props.userName
    };
    this.handleSongSelection = this.handleSongSelection.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
  }
  songDataParser = data => {
    let result = {
      name: data.name,
      id: data.id,
      href: data.href,
      uri: data.uri,
      artist: data.artists[0].name,
      imageUrl: data.album.images[0].url,
      albumName: data.album.name,
      votes: 0,
      duration: data.duration_ms,
      progress: null,
      timeAdded: Date.now(),
      users: {
        [this.props.userName]: null
      },
      addedBy:this.state.userName
    };
    return result;
  };
  handleSongSelection = async () => {
    this.toggleModal();
    const roomID = this.state.docId;
    //    const songURI = {songUri: 'spotify:track:4JGKZS7h4Qa16gOU3oNETV'}
    //roomId and songData
    const songData = this.songDataParser(this.props.item);
    //console.log(songData);
    try {
      await addSongToDB(roomID, songData);
    } catch (err) {
      console.log(err);
    }
  };

  toggleModal() {
    this.setState({ visibleModal: !this.state.visibleModal });
  }

  render() {
    let albumArt = this.props.item.album.images || [];
    return (
      <View>
        <TouchableHighlight onPress={this.toggleModal}>
          <Card style={styles.card}>
          { albumArt ?
              <Image
                style={{ width: 75, height: 75 }}
                resizeMode="cover"
                source={{ uri: `${albumArt[1].url}` }}
              /> : null}
            <View style={styles.songInfo}>
              <View>
                <Text
                  numberOfLines={1}
                  ellipsizeMode="tail"
                  style={{ fontSize: 19 }}
                >
                  {this.props.item.name}{" "}
                </Text>
              </View>

              <View style={{ top: 10 }}>
                <Text
                  numberOfLines={1}
                  ellipsizeMode="tail"
                  style={{ fontSize: 15 }}
                >
                  {this.props.item.album.artists[0].name} -{" "}
                  {this.props.item.album.name}
                </Text>
              </View>
            </View>
          </Card>
        </TouchableHighlight>

        <Modal isVisible={this.state.visibleModal}>
          <View style={styles.content}>
            <View style={styles.modalDetails}>
              { albumArt !== [] ?<Image
                style={{
                  width: 200,
                  height: 200,
                  marginBottom: 20,
                  marginTop: 15
                }}
                resizeMode="cover"
                source={{ uri: `${albumArt[1].url}` }}
              />: null}
              <Text
                numberOfLines={2}
                ellipsizeMode="tail"
                style={styles.contentTitle}
              >
                {this.props.item.name}
              </Text>
              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                style={{ fontSize: 18, marginBottom: 20, color: "#fff" }}
              >
                {this.props.item.album.artists[0].name} -{" "}
                {this.props.item.album.name}
              </Text>
            </View>

            <View>
              <TouchableOpacity
                style={styles.addButton}
                onPress={this.handleSongSelection}
              >
                <Text style={styles.addButtonText}>Add To Playlist</Text>
              </TouchableOpacity>

              <Button
                title="Cancel"
                color="#fff"
                style={{ top: 15 }}
                onPress={() => this.setState({ visibleModal: false })}
              />
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}
const mapStateToProps = state => {
    return {
        userName: state.userName
    }
}

export default connect(mapStateToProps)(SongCard)

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    // color: '#feffe8',
    display: "flex",
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "grey",
    padding: 4
  },
  songInfo: {
    display: "flex",
    flexDirection: "column",
    flexWrap: "wrap",
    alignItems: "stretch",
    flex: 1,
    padding: 13,
    justifyContent: "center"
  },
  searchBar: {
    backgroundColor: "white"
  },
  content: {
    backgroundColor: "#423959",
    padding: 22,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    borderColor: "rgba(0, 0, 0, 0.1)"
  },
  contentTitle: {
    fontSize: 20,
    marginBottom: 12,
    fontWeight: "bold",
    textAlign: "center",
    color: "#fff"
  },
  modalDetails: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  addButton: {
    // marginRight: 80,
    // marginLeft: 80,
    // marginTop: 25,
    // paddingTop: 10,
    backgroundColor: "#FF5857",
    borderRadius: 25
  },
  addButtonText: {
    color: "white",
    textAlign: "center",
    fontSize: 20,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 10,
    fontWeight: "bold"
  }
});
