// @flow
import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import orc from './counter';

const rootReducer = combineReducers({
  orc,
  router
});

export default rootReducer;
