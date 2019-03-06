import React, { Component } from 'react';
import {
  StyleSheet, Text,
  View, KeyboardAvoidingView, FlatList, Button
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
      deleteDisabled: true
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
        this.setState({ notes: data, deleteDisabled: false })
      }
      else {
        this.setState({ notes: [], deleteDisabled: true })
      }
    })
  }

  getNote(noteObj) {
    this.props.navigation.navigate('note', {
      data: noteObj
    });
  }

  _renderDataItem = ({ item }) => {
    return <Text
      contentContainerStyle={{
        justifyContent: 'center',
        alignItems: 'center'
      }}
      style={{ fontSize: 20 }}
      key={item.id} onPress={() => { this.getNote(item) }}>{item.title}</Text>
  }

  _keyExtractor = (item, index) => item.id;

  createRenderView() {
    const view = <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
      <FlatList
        contentContainerStyle={styles.list}
        ListEmptyComponent={<Text
          style={{ fontSize: 20 }}
        >No notes to show currently</Text>}
        data={this.state.notes}
        extraData={this.state}
        keyExtractor={this._keyExtractor}
        renderItem={this._renderDataItem}
      />
      <View style={styles.row}>
        <Button style={styles.button} disabled={this.state.deleteDisabled} title="Delete Notes" onPress={() => { this.deleteAllNotes() }}></Button>
        <Button style={styles.button} title="Create Note" onPress={() => {
          this.props.navigation.navigate('createNote');
        }}></Button>
      </View>
    </KeyboardAvoidingView>
    return view;
  }

  render() {
    let view = this.createRenderView();
    return view;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    paddingBottom:20,
    backgroundColor: '#F5FCFF',
  },
  list: {
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  button: {
    height: 20,
    width: 20
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  }
});

export default Notes;

