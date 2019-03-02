import React, { Component } from 'react';
import { TextInput } from 'react-native-gesture-handler';
export default class TextArea extends Component {
    render() {
       // Inherit any props passed to it; e.g., multiline, numberOfLines below
       // hard coded the max length for now
      return (
        <TextInput
          {...this.props}
          multiline = {true}
          editable = {true}
          maxLength = {500}
        />
      );
    }
  }