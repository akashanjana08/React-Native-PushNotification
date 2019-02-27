/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View ,ToastAndroid} from 'react-native';
import FCM,{FCMEvent} from "react-native-fcm";


type Props = {};
export default class App extends Component<Props> {
 
  constructor(props) {
    super(props);

    this.state = {
      token: "",
      tokenCopyFeedback: "",
      fcmMessage:""
    }
  }

  async componentDidMount(){
    try{
          let result = await FCM.requestPermissions({badge: false, sound: true, alert: true});
        } catch(e){
          console.error(e);
        }
    
        FCM.getFCMToken().then(token => {
          console.log("TOKEN (getFCMToken)", token);
          this.setState({token: token || ""})
        });

      FCM.on(FCMEvent.Notification, (notif)=> {
        console.log("====================================")
        this.setState({fcmMessage: notif})
        console.log(JSON.stringify(this.state.fcmMessage))
        ToastAndroid.show(this.state.fcmMessage.name , ToastAndroid.SHORT)
      })
}

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to React Native!</Text>
        <Text>{this.state.fcmMessage.name}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
