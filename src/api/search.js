import axios from 'axios'

import {HOST} from '../common/js/config'

export function getSearchHotList () {
  const url = HOST + '/search/hot'
  return axios.get(url)
}

export function getSearch (key) {
  // search?keywords= 海阔天空
  const url = HOST + '/search?keywords=' + key
  return axios.get(url)
}
