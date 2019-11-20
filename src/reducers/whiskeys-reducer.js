import { FETCH_WHISKEYS, FETCH_WHISKEY, UPDATE_WHISKEY, CHANGE_WHISKEY_RATING } from '../types'
import _ from 'lodash';

export default function(state = {}, action){

  switch(action.type){
    case FETCH_WHISKEYS:
      return _.mapKeys(action.payload.data, "id");
    case FETCH_WHISKEY:
      let whiskey = action.payload.data;
      return { ...state, [action.payload.data.id]: whiskey }
    case CHANGE_WHISKEY_RATING:
      let newWhiskey = state[action.payload.id]
      newWhiskey.ratings[action.payload.type] = action.payload.value
      return { ...state, [action.payload.id]: newWhiskey }
    default:
      return state;
  }

}
