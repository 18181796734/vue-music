import axios from 'axios'

import {HOST} from '../common/js/config'

export function getPlayList (id, cookie) {
  const url = HOST + '/playlist/detail?id=' + id + '&cookie=' + cookie
  return axios.get(url)
}
