import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import whiskeysReducer from './whiskeys-reducer';
import ratingTypesReducer from './rating-types-reducer';

const rootReducer = combineReducers({
  form: form,
  whiskeys: whiskeysReducer,
  ratingTypes: ratingTypesReducer
});

export default rootReducer;
