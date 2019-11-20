import { FETCH_RATING_TYPES } from '../types'
import _ from 'lodash';

export default function(state = {}, action){

  switch(action.type){
    case FETCH_RATING_TYPES:
      return { ...state, [action.payload.type]: action.payload.data }
    default:
      return state;
  }

}
