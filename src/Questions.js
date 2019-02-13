import React, { Component } from 'react';
import { View, Text, Button, ScrollView, StyleSheet, Dimensions } from 'react-native';

import axios from 'axios';
import moment from 'moment';
import Question from './Question';
import he from "he";

const { width } = Dimensions.get('window');

export default class Questions extends Component {
    state = {
        questions: [],
        msg: 'Loading...',

        done: false,
        start: new Date(),
        end: new Date(),
        count: 0,
        correct: 0,
    };

    constructor(props) {
        super(props);

        this.onAnswer = this.onAnswer.bind(this);
        this.loadTrivia = this.loadTrivia.bind(this);
        this.playAgain = this.playAgain.bind(this);
    }

    loadTrivia() {
        axios;
        // .get('http://192.168.1.200/json.json')
        // .then(({ data }) => {
        axios
            .get('https://opentdb.com/api.php?amount=10&type=boolean')
            .then(({ data }) => {
                if (data.response_code === 0) {
                    this.setState({
                        questions: data.results.map( result => {
                            result.question = he.decode(result.question);
                            return result;
                        }),
                        start: new Date(),
                        msg: false,
                    });
                } else {
                    this.setState({
                        msg: 'Please close and open again.',
                    });
                }
            })
            .catch(r => {
                this.setState({
                    msg: 'Please close and open again.',
                });
            });
    }

    componentDidMount() {
        this.loadTrivia();
    }

    onAnswer(answer) {
        const { correct, count, questions } = this.state;
        let state = {};
        if (answer) {
            state.correct = correct + 1;
        }
        state.count = count + 1;
        if (questions && questions.length === state.count) {
            console.log('Finish', { state });
            state.done = true;
            state.end = new Date();
        }
        this.setState(state);
    }

    playAgain() {
        this.setState(
            {
                questions: [],
                msg: 'Loading...',

                done: false,
                start: new Date(),
                end: new Date(),
                count: 0,
                correct: 0,
            },
            () => {
                this.loadTrivia();
            }
        );
    }

    render() {
        const { onClose } = this.props;
        const { done, questions, msg, start, end, correct, count } = this.state;
        return (
            <View style={styles.view}>
                {!done ? (
                    <ScrollView contentContainerStyle={styles.container}>
                        {msg && <Text>{msg}</Text>}
                        {questions.map((question, key) => (
                            <Question key={key} quest={question} onAnswer={this.onAnswer} />
                        ))}
                    </ScrollView>
                ) : (
                    <View>
                        <View style={styles.info}>
                            <Text style={styles.welcome}>Finish :D</Text>
                            <Text>The "Trivia" was done {moment(end).from(start)}</Text>
                            <Text>
                                Answer correct: {correct} of {count}
                            </Text>
                        </View>
                        <View style={styles.playAgain}>
                            <Button title={'Play Again'} onPress={this.playAgain} color={'black'} />
                        </View>
                    </View>
                )}
                <Button title={'Close Trivia'} onPress={() => onClose()} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    view: {
        flex: 1,
        flexGrow: 1,
        width: width,
    },
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 10,
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    playAgain: {
        marginTop: 10,
        marginBottom: 15,
    },
    info: {
        justifyContent: 'center',
        padding: 10,
    }
});
