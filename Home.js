import React, { Component } from 'react';
import {
  Platform, StyleSheet, Text,
  View, KeyboardAvoidingView, ScrollView, Button
} from 'react-native';
import Pattern from "./Pattern";
import Notes from "./Notes";
import Note from "./Note";
import data from "./dataFiles/allPatterns.json";
import { createStackNavigator, createAppContainer } from 'react-navigation';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
class Home extends Component<Props> {
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
          contentContainerStyle={{
            justifyContent: 'center',
            alignItems: 'center'
          }}
          key={index} onPress={() => { this.getPattern(index) }}>{obj.title}</Text>
      })
      view = <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
        <Button title="take notes"
          onPress={() => this.props.navigation.navigate('notes')}

        ></Button>
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

const MainNavigator = createStackNavigator({
  home: { screen: Home },
  pattern: { screen: Pattern },
  notes: { screen: Notes },
  note: { screen: Note }
},
  {
    initialRouteName: "home"
  }
);

export default createAppContainer(MainNavigator);

