import axios from 'axios'

import {HOST} from '../common/js/config'

export function getPhoneSign (phone, password) {
  const url = HOST + '//login/cellphone?phone=' + phone + '&password=' + password
  return axios.get(url)
}
