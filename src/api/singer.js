import axios from 'axios'

import {HOST} from '../common/js/config'

export function getSingerList (key) {
  const url = HOST + '/artist/list?limit=5&initial=' + key
  return axios.get(url)
}

export function getSingerSong (id) {
  const url = HOST + '/artist/top/song?id=' + id
  return axios.get(url)
}

export function getSingerData (id) {
  const url = HOST + '/artist/desc?id=' + id
  return axios.get(url)
}
