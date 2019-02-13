/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Button } from 'react-native';
import Questions from './src/Questions';

const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
    android: 'Double tap R on your keyboard to reload,\n' + 'Shake or press menu button for dev menu',
});

export default class App extends Component {

    state = {
        play: false,
    };

    constructor(props) {
        super(props);

        this.toggleGame = this.toggleGame.bind(this);
    }

    toggleGame() {
        const { play } = this.state;
        this.setState({ play: !play });
    }

    render() {
        const { play } = this.state;
        return (
            <View style={styles.container}>
                {!play ? <Button title={'Start Trivia'} onPress={this.toggleGame} /> : <Questions onClose={this.toggleGame}/>}
            </View>
        );
    }
}

const styles = StyleSheet.create({
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
