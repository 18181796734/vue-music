import axios from 'axios'

import {HOST} from '../common/js/config'

export function getUserData (uid, cookie) {
  // /user/detail?uid=32953014
  const url = HOST + '/user/detail?uid=' + uid + '&cookie=' + cookie
  return axios.get(url)
}

export function getUserLikeList (uid, cookie) {
  const url = HOST + '/likelist?uid=' + uid + '&cookie=' + cookie
  return axios.get(url)
}
