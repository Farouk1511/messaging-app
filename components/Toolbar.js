import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
} from "react-native";

const ToolBarButton = ({ title, onPress }) => (
  <TouchableOpacity onPress={onPress}>
    <Text style={styles.button}>{title}</Text>
  </TouchableOpacity>
);

ToolBarButton.propTypes = {
  title: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
};

const ToolBar = ({ onSubmit, onPressCamera, onPressLocation,isFocused,onChageFocus}) => {
  const [text, setText] = useState("");
  const input = useRef(null)


  
  const handleChangeText = (text) => {
    setText(text);
  };

  const handleSubmitting = () => {
    if (!text) return;
    onSubmit(text);
    setText("");
  };

  const handleBlur = () => {
    onChageFocus(false)
  }

  const handleFocus = () => {
    onChageFocus(true)
  }

  useEffect(() => {
    if(isFocused) {
      input.current.focus()
    }else{
      input.current.blur()
    }
  },[isFocused])

  return (
    <View style={styles.toolbar}>
      <ToolBarButton title="📸" onPress={onPressCamera} />
      <ToolBarButton title="🗺️" onPress={onPressLocation} />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          underlineColorAndroid={"transparent"}
          placeholder={"Type Something"}
          blurOnSubmit={false}
          value={text}
          onChangeText={handleChangeText}
          onSubmitEditing={handleSubmitting}
          ref={input}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      </View>
      <ToolBarButton title="⏩" onPress={handleSubmitting} />
    </View>
  );
};

const styles = StyleSheet.create({
  toolbar: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 10,
    paddingLeft: 16,
    backgroundColor: "white",
  },
  button: {
    top: -2,
    marginRight: 12,
    fontSize: 20,
    color: "grey",
  },
  inputContainer: {
    flex: 1,
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.04)",
    borderRadius: 16,
    paddingVertical: 4,
    paddingHorizontal: 12,
    backgroundColor: "rgba(0,0,0,0.02)",
  },
  input: {
    flex: 1,
    fontSize: 18,
  },
});

ToolBar.propTypes = {
  isFocused: PropTypes.bool.isRequired,
  onChageFocus: PropTypes.func,
  onSubmit: PropTypes.func,
  onPressCamera: PropTypes.func,
  onPressLocation: PropTypes.func,
};

ToolBar.defaultProps = {
  onChageFocus: () => {},
  onSubmit: () => {},
  onPressCamera: () => {},
  onPressLocation: () => {},
};

export default ToolBar;
