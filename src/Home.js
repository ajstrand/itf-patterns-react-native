import React, { Component } from 'react';
import {
  StyleSheet,
  KeyboardAvoidingView, Button
} from 'react-native';
import Patterns from "./patternComponents/Patterns";
import Pattern from "./patternComponents/Pattern";
import Notes from "./noteComponents/Notes";
import Note from "./noteComponents/Note";
import CreateNote from "./noteComponents/CreateNote";
import Notice from "./Notice";
import { createStackNavigator, createAppContainer } from 'react-navigation';

type Props = {};
class Home extends Component<Props> {
  static navigationOptions = {
    title: 'ITF Patterns Review',
  };

  render() {
    const view = <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
    <Notice></Notice>
      <Button style={styles.buttonStyles} title="View Patterns"
        onPress={() => this.props.navigation.navigate('patterns')}
      ></Button>
      <Button style={styles.buttonStyles} title="Take notes"
        onPress={() => this.props.navigation.navigate('notes')}

      ></Button>
    </KeyboardAvoidingView>

    return view;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent:'space-evenly',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  buttonStyles:{
    width:20
  }
});

const MainNavigator = createStackNavigator({
  home: { screen: Home },
  pattern: { screen: Pattern },
  patterns: { screen: Patterns },
  notes: { screen: Notes },
  note: { screen: Note },
  createNote: { screen: CreateNote }
},
  {
    initialRouteName: "home"
  }
);

export default createAppContainer(MainNavigator);

