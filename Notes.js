import React, { Component } from 'react';
import {StyleSheet, Text,
  View, KeyboardAvoidingView, ScrollView, Button
} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import storage from 'react-native-modest-storage';

type Props = {};
class Notes extends Component<Props> {
  static navigationOptions = {
    title: 'Patterns List',
  };
  constructor(props) {
    super(props);
    this.state = {
      notes:null,
      currentNewNote:{title:'', text:''},
      editNotice:false
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
      if(data !== null){
        this.setState({notes:data})
      }
      else {
        this.setState({notes:[]})
      }
    })
  }

  getNote(noteObj) {
    this.props.navigation.navigate('note', {
      data: noteObj
    });
  }

  addNote() {
    if(this.state.currentNewNote.text === ''){
        this.setState({editNotice:true})
        return;
    }
    else {
        let copy = this.state.notes.slice();
        let length = this.state.notes.length - 1;
        let newId = length + 1
        let obj = {
            text:this.state.currentNewNote.text,
            id:newId,
            title:this.state.currentNewNote.title,
        }
        copy.push(obj);
        this.setState({notes:copy}, () => {
          this.saveAll();
        })
    }
  }

  async saveAll() {
    await storage.set('notes', this.state.notes)
  }

  render() {
    let top = null;
    if(this.state.editNotice){
        top = <Text>Input must be a non empty string</Text>
    }
    else {
        top = <Text>View notes or create a new one</Text>
    }
    let view;
    let array;
    let none = <Text>No notes to show currently</Text>
    if(this.state.notes !== null){
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
  
      view = <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
      <View>
        {top}
        <Button title="Delete Notes" onPress={() => { this.deleteAllNotes()}}></Button>
        <Button title="Create Note" onPress={() => { this.addNote()}}></Button>
        <TextInput placeholder="title" onChangeText={(text)=>{
          let copy = this.state.currentNewNote;
          copy.title = text;
          this.setState({currentNewNote:copy})}}
          ></TextInput>
        <TextInput placeholder="text" onChangeText={(text)=>{
          let copy = this.state.currentNewNote;
          copy.text = text;
          this.setState({currentNewNote:copy})}}
          ></TextInput>
        <ScrollView contentContainerStyle={styles.wrapper}>
          {array}
        </ScrollView>
      </View>
      </KeyboardAvoidingView>
      ;
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

export default Notes;

