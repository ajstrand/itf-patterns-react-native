import React, { Component } from 'react';
import {
  StyleSheet, Text,
  View, KeyboardAvoidingView, ScrollView, Button
} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import storage from 'react-native-modest-storage';

type Props = {};
class Notes extends Component<Props> {
  static navigationOptions = {
    title: 'Notes you have saved'
  };
  constructor(props) {
    super(props);
    this.state = {
      notes: null
    }
  }
  // hacky way to re-render notes when the user goes back
  // to the notes screen
  //TODO: add in redux
  componentDidMount() {
    this.getNotes();
    this._subscribe = this.props.navigation.addListener('didFocus', () => {
      this.getNotes();
    });
  }

  async deleteAllNotes() {
    await storage.remove('notes');
    this.getNotes();
  }

  async getNotes() {
    await storage.get('notes').then((data) => {
      if (data !== null) {
        this.setState({ notes: data })
      }
      else {
        this.setState({ notes: [] })
      }
    })
  }

  getNote(noteObj) {
    this.props.navigation.navigate('note', {
      data: noteObj
    });
  }

  createDataArray() {
    let none = <Text>No notes to show currently</Text>
    let array = null;
    if (this.state.notes !== null) {
      if (this.state.notes.length > 0) {
        array = this.state.notes.map((noteObj, index) => {
          return <Text
            contentContainerStyle={{
              justifyContent: 'center',
              alignItems: 'center'
            }}
            key={index} onPress={() => { this.getNote(noteObj) }}>{noteObj.title}</Text>
        })
      }
      else {
        array = none
      }
    }
    return array;
  }

  createRenderView(array) {
    const view = <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
      <View>
        <Button style={styles.buttonStyles} title="Delete Notes" onPress={() => { this.deleteAllNotes() }}></Button>
        <Button style={styles.buttonStyles} title="Create Note" onPress={() => {
          this.props.navigation.navigate('createNote');
        }}></Button>
        <ScrollView contentContainerStyle={styles.wrapper}>
          {array}
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
    return view;
  }

  render() {
    let array = this.createDataArray();
    let view = this.createRenderView(array);
    return view;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop:20,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  buttonStyles:{
    marginBottom:5
  }
});

export default Notes;

