import React, { Component } from 'react';
import {
    StyleSheet, Text,
    View, ScrollView,
    Button
} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
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
            view = <View>
                <TextInput
                    value={this.state.title}
                    onChangeText={(text) => this.setState({ title: text })}>
                </TextInput>
                <TextInput
                    value={this.state.note}
                    onChangeText={(text) => this.setState({ note: text })}>
                </TextInput>
                <Button
                    title="Save edit"
                    onPress={() => this.saveEdits()}
                ></Button>
            </View>
            return view;
        }
        if (this.state.error) {
            view = <View>
                <Button
                    title="Back"
                    onPress={() => this.props.navigation.goBack()}
                ></Button>
                <Text>An error occured trying to render the note you selected :(</Text>
            </View>
            return view;
        }
        else {
            content = <Fragment>
            <Button title="Edit"
            onPress={() => this.editNote()}
        ></Button>
        <ScrollView contentContainerStyle={styles.wrapper}>
            <Text>{this.state.title}</Text>
            <Text>{this.state.note}</Text>
        </ScrollView>
        </Fragment>  
        }
        const baseView = <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
        <View>
            <Button
                title="Back"
                onPress={() => this.props.navigation.navigate('Home')}
            >Back</Button> 
            {content}
        </View>
        </KeyboardAvoidingView>;
        view = baseView;
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
    }
});
