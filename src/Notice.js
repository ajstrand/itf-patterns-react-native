import React, { Component } from 'react';
import {
  Text, StyleSheet, View
} from 'react-native';
export default class Notice extends Component {
    render() {
        return <View style={styles.container}>
            <Text style={styles.text}> ITF Patterns Review allows you to review all of the patterns in ITF Taekwonso,
                as well as take notes let you review later(if you're studying a certain technique in a pattern for example).
                This is an unofficial app(meaning it is not endored by the ITF or any school),
                therefore this should be used as a secondary resource to any materials provided by your instructor.
  </Text>
        </View>
    }
}

const styles = StyleSheet.create({
    text: {
        fontSize:18
    },
    container: {
      flex: 1,
      margin:15,
      justifyContent: 'flex-start',
      alignItems: 'center',
      backgroundColor: '#F5FCFF',
    }
  });