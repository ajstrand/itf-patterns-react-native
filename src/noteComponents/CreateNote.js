import React, { Component } from 'react';
import {StyleSheet,
  View, KeyboardAvoidingView, Button
} from 'react-native';
import TextArea from "./TextArea";
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
      notes:null,
      currentNewNote:{title:'', text:''},
      noContent:false
    }
  }

  componentDidMount() {
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
     const view = <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
      <View>
        <Button style={styles.buttonStyles} title="Create Note" onPress={() => { this.addNote()}}></Button>
        <TextInput style={styles.inputStyles} placeholder="Title" onChangeText={(text)=>{
            this.updateState("title", text); 
        }}
          ></TextInput>
        <TextArea style={styles.inputStyles} placeholder="Text" onChangeText={(text)=>{
            this.updateState("text", text); 
        }}
          ></TextArea>
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

