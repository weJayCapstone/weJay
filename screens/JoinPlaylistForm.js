import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Alert } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { enterRoom } from "../firebase/index";
import { Feather } from "@expo/vector-icons";
import { setDocId, fetchRoomDataThunk, setUserName } from "../redux/store";
import { connect } from "react-redux";

function JoinPlayListForm(props) {
  const [authData, setAuthData] = useState({});
  const handleSubmit = async () => {
    try {
      let result = await enterRoom(
        authData.passcode,
        authData.title,
        authData.userName
      );
      if (result === "Invalid credentials") {
        Alert.alert("Try Again!", result + ". Fields are case sensitive.", {
          cancelable: false
        });
      } else {
        //set redux state
        props.setStoreDocId(result);
        props.setStoreRoomData(result);
        props.setUserName(authData.userName);
        //then navigate to playlist room
        props.navigation.navigate("PlaylistRoom");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.header}>Join Playlist</Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Playlist Title"
          maxLength={100}
          onChangeText={text => setAuthData({ ...authData, title: text })}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Your Name"
          maxLength={50}
          onChangeText={text => setAuthData({ ...authData, userName: text })}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Playlist Passcode"
          maxLength={50}
          onChangeText={text => setAuthData({ ...authData, passcode: text })}
        />
        <TouchableOpacity
          style={styles.saveButton}
          onPress={() => handleSubmit()}
        >
          <Text style={styles.saveButtonText}>Join</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const mapDispatchToProps = dispatch => {
  return {
    setStoreDocId: result => dispatch(setDocId(result)),
    setStoreRoomData: docId => dispatch(fetchRoomDataThunk(docId)),
    setUserName: userName => dispatch(setUserName(userName))
  };
};
export default connect(
  null,
  mapDispatchToProps
)(JoinPlayListForm);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    flexDirection: "column",
    backgroundColor: "#423959",
    alignItems: "center"
  },
  header: {
    fontSize: 30,
    textAlign: "center",
    fontWeight: "bold",
    color: "white",
    marginTop: 80
  },
  inputContainer: {
    paddingTop: 15,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  textInput: {
    borderColor: "#fff",
    backgroundColor: "#E9DBFF",
    borderRadius: 30,
    borderWidth: 1,
    width: 250,
    fontSize: 18,
    height: 45,
    textAlign: "center",
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center"
  },
  saveButton: {
    backgroundColor: "#FF5857",
    padding: 15,
    borderRadius: 25,
    width: 200
  },
  saveButtonText: {
    color: "white",
    fontSize: 20,
    textAlign: "center",
    fontWeight: "bold"
  }
});
