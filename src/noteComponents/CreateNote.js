import React, { Component } from 'react';
import {StyleSheet,
  View, KeyboardAvoidingView, Button, Text
} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import storage from 'react-native-modest-storage';

type Props = {};
class CreateNote extends Component<Props> {
  static navigationOptions = {
    title: 'Create Note',
  };
  constructor(props) {
    super(props);
    this.state = {
      currentNewNote:{title:'', text:''},
      noContent:false
    }
  }

    async deleteAllNotes() {
      await storage.remove('notes');
      this.getNotes();
    }

  addNote() {
    if(this.state.currentNewNote.text === ''){
        this.setState({noContent:true})
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

  updateState(key, value) {
    let copy = this.state.currentNewNote;
    copy[key] = value;
    this.setState({currentNewNote:copy})
  }

  async saveAll() {
    await storage.set('notes', this.state.notes);
    this.props.navigation.navigate('notes');
  }

  render() {
    let top = null;
    if(this.state.noContent){
        top = <Text>Input must be a non empty string</Text>
    }
    else {
        top = <Text>View notes or create a new one</Text>
    }
     const view = <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
      <View>
        <Button style={styles.buttonStyles} title="Create Note" onPress={() => { this.addNote()}}></Button>
        <TextInput style={styles.inputStyles} placeholder="title" onChangeText={(text)=>{
            this.updateState("title", text); 
        }}
          ></TextInput>
        <TextInput style={styles.inputStyles} placeholder="text" onChangeText={(text)=>{
            this.updateState("text", text); 
        }}
          ></TextInput>
      </View>
      </KeyboardAvoidingView>
      ;
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
  },
  inputStyles: {
    fontSize:22
  }
});

export default CreateNote;

