import React, { Component } from 'react';
import {
  StyleSheet, Text,
  KeyboardAvoidingView, FlatList
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
      patterns: []
    }
  }
  componentDidMount() {
    const patterns = data.patternsArray
    //create temporary id
    //TODO: add permanent id when generating json
    patterns.map((obj, index) => {
      obj["id"] = index
    })
    this.setState({ patterns: patterns });

  }

  getPattern(index) {
    const dataObj = this.state.patterns[index]
    this.props.navigation.navigate('pattern', {
      data: dataObj
    });
  }

  //_keyExtractor = (pattern, index) => pattern.id;


  _renderDataItem = (pattern) => {
    const patternId = pattern.item.id;
    const patternTitle = pattern.item.title;
    return <Text
      contentContainerStyle={
        {
          justifyContent: 'center',
          alignItems: 'flex-start',
        }
      }
      key={patternId} style={styles.textStyle} 
      onPress={() => { 
        this.getPattern(patternId)
       }}>{patternTitle}</Text>
  }

  render() {
    let view;
    if (this.state.patterns.length > 0) {
      view = <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
      <Text style={styles.titleStyle}>Select a pattern to view by clicking on the title:</Text>
        <FlatList
          style={styles.listStyle}
          contentContainerStyle={styles.wrapper}
          data={this.state.patterns}
          ListEmptyComponent={<Text
            style={{ fontSize: 20 }}
          >No patterns to show. An error may have occured :(</Text>}
          extraData={this.state}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderDataItem}
        />
      </KeyboardAvoidingView>
    }
    else {
      view = <Text>Loading...</Text>
    }
    return view;
  }
}

const styles = StyleSheet.create({
  wrapper: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  listStyle:{
    width:'100%'
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  titleStyle: {
    width:'70%',
    fontSize: 20,
    margin: 5
  },
  textStyle: {
    fontSize: 24,
    margin: 5
  }
});

