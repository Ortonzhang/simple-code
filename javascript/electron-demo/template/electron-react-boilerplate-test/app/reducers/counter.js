// @flow
import { CREATE_FILE, CREATE_PREVIEW } from '../actions/counter';

import type { Action } from './types';


const INITIAL_STATE = {
  file: '',
  preview: ''
}

export default function orc(state=INITIAL_STATE, action: Action) {
  const { type, payload } = action
  
  switch (type) {
    case CREATE_FILE:
      return { ...state, ...payload }
    case CREATE_PREVIEW: 
      return { ...state, ...payload }
    default:
      return state;
  }
}