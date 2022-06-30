import { StatusBar } from "expo-status-bar";
import {
  Alert,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  Image,
  BackHandler,
} from "react-native";
import React, { useEffect, useState } from "react";
import Status from "./components/Status";
import {
  createImageMessage,
  createLocationMessage,
  createTextMessage,
} from "./messaging/utils/MessageUtils";
import MessageList from "./components/MessageList";
import ToolBar from "./components/Toolbar";

export default function App() {
  const [messages, setMessages] = useState([
    createImageMessage("https://unsplash.it/300/300"),
    createTextMessage("World"),
    createTextMessage("Hello"),
    createLocationMessage({ latitude: 37.78825, longitude: -122.4324 }),
  ]);
  const [fullscreenImageId, setFullscreenId] = useState(null);

  const [isInputFocused, setIsInputFocus] = useState(false);

  const handlePressToolbarCamera = () => {};

  const handlePressToolbarLocation = () => {};

  const handleChangeFocus = (isFocused) => {
    setIsInputFocus(isFocused);
  };

  const handleSubmit = (text) => {
    setMessages([createTextMessage(text), ...messages]);
  };

  const dismissFullScreenImage = () => {
    setFullscreenId(null);
  };

  const renderFullscreenImage = () => {
    if (!fullscreenImageId) return null;

    const image = messages.find((message) => message.id === fullscreenImageId);

    if (!image) return null;

    const { uri } = image;

    return (
      <TouchableHighlight
        style={styles.fullscreenOverlay}
        onPress={dismissFullScreenImage}
      >
        <Image style={styles.fullscreenImage} source={{ uri }} />
      </TouchableHighlight>
    );
  };

  const handlePressedMessage = ({ id, type }) => {
    switch (type) {
      case "text":
        Alert.alert(
          "Delete message?",
          "Are you sure you want to permanently delete this message?",
          [
            {
              text: "Cancel",
              style: "cancel",
            },
            {
              text: "Delete",
              style: "destructive",
              onPress: () => {
                setMessages((prev) =>
                  prev.filter((message) => message.id !== id)
                );
              },
            },
          ]
        );
        break;
      case "image":
        setFullscreenId(id);
        break;
      default:
        break;
    }
  };

  const renderMessageList = () => {
    return (
      <View style={styles.content}>
        <MessageList
          messages={messages}
          onPressMessage={handlePressedMessage}
        />
      </View>
    );
  };
  const renderInputMehodEditor = () => {
    return (
      <View style={styles.inputMethodEditor}>
        
      </View>
    );
  };
  const renderToolbar = () => {
    return (
      <View style={styles.toolbar}>
        <ToolBar
          isFocused={isInputFocused}
          onSubmit={handleSubmit}
          onChageFocus={handleChangeFocus}
          onPressCamera={handlePressToolbarCamera}
          onPressLocation={handlePressToolbarLocation}
        />
      </View>
    );
  };

  useEffect(() => {
    let subscription = BackHandler.addEventListener("hardwareBackPress", () => {
      if (fullscreenImageId) {
        dismissFullScreenImage();
        return true;
      }

      return false;
    });

    return () => subscription.remove();
  }, []);

  return (
    <View style={styles.container}>
      <Status />
      {renderMessageList()}
      {renderToolbar()}
      {renderInputMehodEditor()}
      {/* {renderFullscreenImage()} */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    flex: 1,
    backgroundColor: "white",
  },
  inputMethodEditor: {
    flex: 1,
    backgroundColor: "white",
  },
  toolbar: {
    borderTopWidth: 1,
    borderTopColor: "rgba(0,0,0,0.04)",
    backgroundColor: "white",
  },
  fullscreenOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "black",
    zIndex: 2,
  },
  fullscreenImage: {
    flex: 1,
    resizeMode: "contain",
  },
});
