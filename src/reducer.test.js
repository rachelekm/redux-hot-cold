import reducer from './reducer';
import {generateAuralUpdate, restartGame, makeGuess} from './actions';

describe('Reducer', () => {

    const seedGuesses = [24, 42, 60, 1, 2];
    const seedFeedback = "You're Warm.";

    it('Should set the initial state when nothing is passed in', () => {
        const state = reducer(undefined, {type: '__UNKNOWN'});
        let answer = state.correctAnswer;
        expect(state).toEqual({
            guesses: [],
            feedback: 'Make your guess!',
            auralStatus: '',
            correctAnswer: answer
        });
    });

    it('Should return the current state on an unknown action', () => {
        let currentState = {};
        const state = reducer(currentState, {type: '__UNKNOWN'});
        expect(state).toBe(currentState);
    });

    describe('generateAuralUpdate', () => {
        it('Should generate an aural update', () => {
            let currentState = {            
                guesses: seedGuesses,
                feedback: seedFeedback,
                auralStatus: ''
            };
            currentState = reducer(currentState, generateAuralUpdate());
            let auralAnswer = currentState.auralStatus;
            let answer = currentState.correctAnswer;
            expect(currentState).toEqual({
                guesses: seedGuesses,
                feedback: seedFeedback,
                auralStatus: auralAnswer,
                correctAnswer: answer
            });
        });
    });

    describe('restartGame', () => {
        it('Should reset the state', () => {
            const newAnswer = 76;
            let currentState = {            
                guesses: seedGuesses,
                feedback: seedFeedback,
                auralStatus: ''
            };
            currentState = reducer(currentState, restartGame(newAnswer));
            expect(currentState).toEqual({
                guesses: [],
                feedback: 'Make your guess!',
                auralStatus: '',
                correctAnswer: newAnswer
            });
        });
    });

    describe('makeGuess', () => {
        it('Should update guesses and feedback in state', () => {
            const newGuess = 20;
            let currentState = {            
                guesses: seedGuesses,
                feedback: seedFeedback,
                auralStatus: '',
                correctAnswer: 40
            };
            currentState = reducer(currentState, makeGuess(newGuess));
            expect(currentState).toEqual({
                guesses: [2, 1, 60, 42, 24, 20],
                feedback: "You're Warm.",
                auralStatus: '',
                correctAnswer: 40
            });
        });
    });
});