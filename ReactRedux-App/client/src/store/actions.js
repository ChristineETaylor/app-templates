import * as types from './actionTypes';

export const saveText = text => ({
  type: types.SAVE_TEXT,
  text,
});

export const clearText = () => ({
  type: types.CLEAR_TEXT,
});

export const saveText2 = text => ({
  type: types.SAVE_TEXT_2,
  text,
});

export const clearText2 = () => ({
  type: types.CLEAR_TEXT_2,
});
