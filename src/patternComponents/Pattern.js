import React, { Component } from 'react';
import {
  StyleSheet, Text,
  View, ScrollView,
  Button
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
    for (const e in obj) {
      list.push(<Text>{obj[e]}</Text>)
    }
    this.setState({ moveList: list })
  }

  render() {
    let view = null;
    if (this.state.error) {
      view = <View>
        <Button
          title="Back"
          onPress={() => this.props.navigation.goBack()}
        >Back</Button>
        <Text>An error occured trying to render the pattern you selected :(</Text>
      </View>
    }
    else {
      view = <View>
        <Button
          title="Back"
          onPress={() => this.props.navigation.navigate('Home')}
        >Back</Button>
        <ScrollView contentContainerStyle={styles.wrapper}>
          {this.state.moveList}
        </ScrollView>
      </View>
    }
    return view;
  }
}

const styles = StyleSheet.create({
  wrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft:15,
    paddingRight:15,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
});
