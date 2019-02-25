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
      notes:[],
      currentNewText:'',
      editNotice:false
    }
  }
  componentDidMount() {
    this.getNotes();
  }

  async getNotes() {
    await storage.get('notes').then((data) => {
        this.setState({notes:data})
    })
  }

  addNote() {
    if(this.state.currentNewText === ''){
        this.setState({editNotice:true})
        return;
    }
    else {
        let copy = this.state.notes.slice();
        let length = this.state.notes.length - 1;
        let newId = length + 1
        let obj = {
            text:this.state.currentNewText,
            id:newId
        }
        copy.push(obj);
        this.setState({notes:copy})
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
    let array = []
    if (this.state.notes.length > 0) {
      array = this.state.notes.map((noteObj, index) => {
        return <Text
          contentContainerStyle={{
            justifyContent: 'center',
            alignItems: 'center'
          }}
          key={index} onPress={() => { this.getNote(noteObj.id) }}>{noteObj.text}</Text>
      })
    }
      view = <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
      <View>
        {top}
      <Button title="Save Notes" onPress={() => { this.saveAll()}}></Button>
        <Button title="Create Notes" onPress={() => { this.addNote()}}></Button>
        <TextInput onChangeText={(text)=>{this.setState({currentNewText:text})}}></TextInput>
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

