import React, { Component } from 'react';
import {
  StyleSheet, Text,
  View, KeyboardAvoidingView, ScrollView
} from 'react-native';
import data from "../../dataFiles/allPatterns.json";

type Props = {};
export default class Patterns extends Component<Props> {
  static navigationOptions = {
    title: 'Patterns List',
  };
  constructor(props) {
    super(props);
    this.state = {
      local: [],
      single: null,
      viewOne: false

    }
  }
  componentDidMount() {
    const arr = data.patternsArray
    this.setState({ local: arr })
  }

  getPattern(index) {
    const dataObj = this.state.local[index]
    this.props.navigation.navigate('pattern', {
      data: dataObj
    });
  }

  render() {
    let view;
    if (this.state.local.length > 0) {
      const array = this.state.local.map((obj, index) => {
        return <Text
          contentContainerStyle={
            {
              justifyContent: 'center',
              alignItems: 'center',
            }
          }
          key={index} style={styles.textStyle} onPress={() => { this.getPattern(index) }}>{obj.title}</Text>
      })
      view = <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
        <ScrollView contentContainerStyle={styles.wrapper}>
          {array}
        </ScrollView>
      </KeyboardAvoidingView>
    }
    else {
      view = <View>
        <Text>Loading</Text>
      </View>;
    }
    return view;
  }
}

const styles = StyleSheet.create({
  wrapper: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  textStyle:{
    fontSize:24,
    margin:5
  }
});

