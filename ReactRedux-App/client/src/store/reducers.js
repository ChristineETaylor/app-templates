import { combineReducers } from 'redux';
import Immutable from 'seamless-immutable';
import * as types from './actionTypes';

const input1State = (state = Immutable({
  text1: '',
}), action) => {
  switch (action.type) {
    case types.SAVE_TEXT: {
      return Immutable({
        text1: action.text,
      });
    }
    case types.CLEAR_TEXT: {
      return Immutable({
        text1: '',
      });
    }
    default:
      return state;
  }
};

const input2State = (state = Immutable({
  text2: '',
}), action) => {
  switch (action.type) {
    case types.SAVE_TEXT_2: {
      return Immutable({
        text2: action.text,
      });
    }
    case types.CLEAR_TEXT_2: {
      return Immutable({
        text2: '',
      });
    }
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  input1State,
  input2State,
});

export default rootReducer;
