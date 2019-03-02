import React, { Component } from 'react';
import {
  StyleSheet, Text,
  View, KeyboardAvoidingView, ScrollView, Button
} from 'react-native';
import storage from 'react-native-modest-storage';

type Props = {};
class Notes extends Component<Props> {
  static navigationOptions = {
    title: 'Notes you have saved'
  };
  constructor(props) {
    super(props);
    this.state = {
      notes: null,
      deleteDisabled:true
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
        this.setState({ notes: data, deleteDisabled:false })
      }
      else {
        this.setState({ notes: [], deleteDisabled:true })
      }
    })
  }

  getNote(noteObj) {
    this.props.navigation.navigate('note', {
      data: noteObj
    });
  }

  createDataArray() {
    let noNotesInDatabase = <Text
    style={{fontSize:20}}
    >No notes to show currently</Text>
    let array = null;
    if (this.state.notes !== null) {
      if (this.state.notes.length > 0) {
        array = this.state.notes.map((noteObj, index) => {
          return <Text
            contentContainerStyle={{
              justifyContent: 'center',
              alignItems: 'center'
            }}
            style={{fontSize:20}}
            key={index} onPress={() => { this.getNote(noteObj) }}>{noteObj.title}</Text>
        })
      }
      else {
        array = noNotesInDatabase
      }
    }
    return array;
  }

  createRenderView(array) {
    const view = <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
      <View>
        <ScrollView contentContainerStyle={styles.wrapper}>
          {array}
        </ScrollView>
        <View style={styles.row}>
        <Button style={styles.button} disabled={this.state.deleteDisabled} title="Delete Notes" onPress={() => { this.deleteAllNotes() }}></Button>
        <Button style={styles.button} title="Create Note" onPress={() => {
          this.props.navigation.navigate('createNote');
        }}></Button>
        </View>
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
    justifyContent:'flex-start',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  button: {
   marginHorizontal:30,
   marginVertical:30,
    width:20
  },
  row:{
    flex: 1,
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems: 'center',
  }
});

export default Notes;

