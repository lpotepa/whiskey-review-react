import axios from 'axios';
import _ from 'lodash'
import {BASE_URL} from '../config';
import {FETCH_WHISKEYS, FETCH_WHISKEY, CHANGE_WHISKEY_RATING} from '../types/'
import history from '../router/history'
import qs from 'query-string';
const WHISKEYS_URL = `${BASE_URL}/whiskeys`

export function fetchWhiskeys(params){
  return function(dispatch){
    let query = qs.stringify(params)
    axios.get(`${WHISKEYS_URL}?${query}`)
    .then((response) => {
      dispatch({
        type: FETCH_WHISKEYS,
        payload: {
          data: response.data
        }
      })
    }).catch((error) => {
      console.log(error)
    })
  }
}

export function fetchWhiskey(id){
  return function(dispatch){
    axios.get(`${WHISKEYS_URL}/${id}`)
    .then((response) => {
      dispatch({
        type: FETCH_WHISKEY,
        payload: {
          data: response.data
        }
      })
    }).catch((error) => {
      console.log(error)
    })
  }
}

export function createWhiskey(params){
  return function(dispatch){
    axios.post(`${WHISKEYS_URL}/`, params)
    .then((response) => {
      history.push('');
    }).catch((error) => {
      console.log(error)
    })
  }
}

export function updateWhiskey(params){
  return function(dispatch){
    axios.put(`${WHISKEYS_URL}/${params.id}`, params)
    .then((response) => {
      history.push('');
    }).catch((error) => {
      console.log(error)
    })
  }
}

export function changeWhiskeyRating(id, type, value){
  return {
    type: CHANGE_WHISKEY_RATING,
    payload: {id: id, type: type, value: value}
  }
}
