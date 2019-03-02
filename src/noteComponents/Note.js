import React, { Component } from 'react';
import {
    StyleSheet, Text,
    View, SafeAreaView,
    ScrollView,
    Button, KeyboardAvoidingView
} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import TextArea from "./TextArea";
import storage from 'react-native-modest-storage';

type Props = {};
export default class Note extends Component<Props> {
    static navigationOptions = ({ navigation }) => {
        return {
            title: navigation.state.params.data.title
        }
    };
    constructor(props) {
        super(props);
        this.state = {
            note: '',
            id: '',
            title: '',
            error: false,
            edit: false
        }
    }
    componentDidMount() {
        const { navigation } = this.props;
        const data = navigation.getParam("data", {});
        if (data === {}) {
            this.setState({ error: true })
        }
        this.setState({
            id: data.id,
            note: data.text,
            title: data.title
        })
    }

    editNote() {
        this.setState({ edit: true });
    }

    async saveEdits() {
        const notes = await storage.get('notes');
        notes[this.state.id].text = this.state.note;
        notes[this.state.id].title = this.state.title;
        await storage.set('notes', notes);
        this.setState({ edit: false });
    }

    render() {
        let content = null;
        let view = null;
        if (this.state.edit) {
            view = <KeyboardAvoidingView
            style={styles.wrapper}>
                <TextInput
                    style={styles.textStyle}
                    value={this.state.title}
                    onChangeText={(text) => this.setState({ title: text })}>
                </TextInput>
                <ScrollView contentContainerStyle={styles.wrapper}>
                <TextArea
                    style={styles.textStyle}
                    value={this.state.note}
                    onChangeText={(text) => this.setState({ note: text })}>
                </TextArea>
                </ScrollView>
            <Button
            style={styles.button}
            title="Save edit"
            onPress={() => this.saveEdits()}
        ></Button>
        </KeyboardAvoidingView>
            return view;
        }
        if (this.state.error) {
            view = <View style={styles.wrapper}>
                <Text>An error occured trying to render the note you selected :(</Text>
            </View>
            return view;
        }
        else {
            content = <View style={styles.container}>
                <Button style={styles.button} title="Edit"
                    onPress={() => this.editNote()}
                ></Button>
                <Text style={styles.textStyle}>{this.state.title}</Text>
                <ScrollView contentContainerStyle={styles.wrapper}>
                    <Text style={styles.textStyle}>{this.state.note}</Text>
                </ScrollView>
            </View>
        }
        const baseView = <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
                {content}
        </KeyboardAvoidingView>;
        view = baseView;
        return view;
    }
}

const styles = StyleSheet.create({
    button: {
        width:40
    },
    wrapper: {
        flex:1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    showScrollText: {
        flex:1,
        justifyContent: 'center',
        alignItems: 'flex-start'
    },
    container: {
        flex: 1,
        marginTop:20,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    textStyle: {
        paddingLeft:15,
        paddingRight:15,
        fontSize:20
    }
});
