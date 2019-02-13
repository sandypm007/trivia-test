import React, { Component } from 'react';
import { View, Text, Button, StyleSheet, WebView } from 'react-native';

export default class Question extends Component {
    state = {
        disabled: false,
    };

    answerQuestion(answer) {
        const { onAnswer, quest } = this.props;


        if (onAnswer && typeof onAnswer === 'function') {
            onAnswer(quest.correct_answer === answer);
            this.setState({ disabled: true });
        }
    }

    render() {
        const { quest } = this.props;
        const { disabled } = this.state;

        return (
            <View>
                {quest && (
                    <View style={styles.question}>
                        <Text>{quest.question}?</Text>
                    </View>
                )}
                <View style={styles.options}>
                    <Button title={'True'}
                            onPress={this.answerQuestion.bind(this, 'True')}
                            disabled={disabled}
                    />
                    <Button
                        title={'False'}
                        onPress={this.answerQuestion.bind(this, 'False')}
                        color={'black'}
                        disabled={disabled}
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    options: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    question: {
        marginTop: 5,
        marginBottom: 5,
        padding: 10,
    },
});
