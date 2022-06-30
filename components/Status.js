import Constants from "expo-constants";
import { useEffect, useState } from "react";
import { Platform, StatusBar, StyleSheet, Text, View } from "react-native";
import NetInfo from '@react-native-community/netinfo';

const statusHeight = Platform.OS === "ios" ? Constants.statusBarHeight : 0;

const styles = StyleSheet.create({
  status: {
    zIndex: 1,
    height: statusHeight,
  },
  messageContainer:{
    zIndex:1,
    position:'absolute',
    top:statusHeight + 20,
    right:0,
    left:0,
    height:80,
    alignItems:'center'
  },
  bubble:{
    paddingHorizontal:20,
    paddingVertical:10,
    borderRadius:20,
    backgroundColor:'red'
  },
  text:{
    color:'white'
  }
});

const Status = () => {
  const [info, setInfo] = useState("none");

  const isCOnnected = info !== "none";
  const backgroundColor = isCOnnected ? "white" : "red";

  const statusBar = (
    <StatusBar
    backgroundColor={backgroundColor}
    barStyle={isCOnnected ? "dark-content" : "light-content"}
    animated={false}
  />
  )

  const messageContainer = (
    <View style={styles.messageContainer} pointerEvents={'none'}>
        {statusBar}
        {!isCOnnected && (
            <View style={styles.bubble}>
                <Text style={styles.text}>No Connection</Text>
            </View>
        )}
    </View>
  )

  const handleChange = (data) =>{
    setInfo(data.type)
    console.log(data.type)
  }

  useEffect(() => {
    let subscription = NetInfo.addEventListener(handleChange)

    const getConnection = async () => {
        try{

            let data = await NetInfo.fetch()
            setInfo(data.type)
        }catch(err){
            console.log(err)
        }
       
    }

    getConnection()
    

    return () => subscription()
  },[])

  return Platform.OS === "ios" ? (
    <View style={[styles.status, { backgroundColor }]}>
     {messageContainer}
    </View>
  ) : messageContainer;
};

export default Status;
