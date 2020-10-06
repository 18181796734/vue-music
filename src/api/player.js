import axios from 'axios'

import {HOST} from '../common/js/config'

export function getSongDetail (id) {
  const url = HOST + '/song/detail?ids=' + id
  return axios.get(url)
}

export function getSongUrl (id) {
  const url = HOST + '/song/url?id=' + id
  return axios.get(url)
}
