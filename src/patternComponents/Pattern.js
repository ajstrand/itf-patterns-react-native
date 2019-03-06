import React, { Component } from 'react';
import {
  StyleSheet, Text,
  View, FlatList
} from 'react-native';

type Props = {};
export default class Pattern extends Component<Props> {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.state.params.data.title
    }
  };
  constructor(props) {
    super(props);
    this.state = {
      moveList: [],
      error: false
    }
  }
  componentDidMount() {
    const { navigation } = this.props;
    const data = navigation.getParam("data", {});
    if (data === {}) {
      this.setState({ error: true })
    }
    let list = [];
    let obj = data.patternSteps;
    for (const patternStep in obj) {
      if (obj.hasOwnProperty(patternStep)) {
        const element = obj[patternStep];
        list.push(element)
      }
    }
    this.setState({ moveList: list })
  }

  _renderDataItem = (moveObj) => {
    const text = moveObj.item;
    const index = moveObj.index;
    return <Text
      contentContainerStyle={
        {
          justifyContent: 'center',
          alignItems: 'center',
        }
      }
      key={index} style={styles.textStyle}>{text}</Text>
  }

  render() {
    let view = null;
    if (this.state.error) {
      view = <View>
        <Text style={styles.textStyle}>An error occured trying to render the pattern you selected :(</Text>
      </View>
    }
    else {
      view = <View style={styles.container}>
        <FlatList
        style={styles.listStyle}
          contentContainerStyle={styles.listStyle}
          data={this.state.moveList}
          ListEmptyComponent={<Text
            style={{ fontSize: 20 }}
          >No patterns to show. An error may have occured :(</Text>}
          extraData={this.state}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderDataItem}
        />
      </View>
    }
    return view;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft:15,
    paddingRight:15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  listStyle:{
    flex:1,
    width:'100%'
  },
  textStyle: {
    fontSize: 24,
    margin: 5
  }
});
