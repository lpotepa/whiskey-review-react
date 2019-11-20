import axios from 'axios';
import _ from 'lodash'
import {BASE_URL} from '../config';
import {FETCH_RATING_TYPES} from '../types/'
const RATING_TYPES_URL = `${BASE_URL}/rating_types`

export function fetchRatingTypes(resourceType){
  return function(dispatch){
    axios.get(`${RATING_TYPES_URL}?type=${resourceType}`)
    .then((response) => {
      dispatch({
        type: FETCH_RATING_TYPES,
        payload: {
          type: resourceType,
          data: response.data
        }
      })
    }).catch((error) => {
      console.log(error)
    })
  }
}
