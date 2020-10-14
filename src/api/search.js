import axios from 'axios'

import {HOST} from '../common/js/config'

export function getSearchHotList () {
  const url = HOST + '/search/hot'
  return axios.get(url)
}
