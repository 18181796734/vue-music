import axios from 'axios'

import {HOST} from '../common/js/config'

export function getPhoneSign (phone, password) {
  const url = HOST + '/login/cellphone?phone=' + phone + '&password=' + password
  return axios.get(url)
}

export function getCode (phone) {
  const url = HOST + '/captcha/sent?phone=' + phone
  return axios.get(url)
}

export function getVerifyCode (phone, code) {
  const url = HOST + '/captcha/verify?phone=' + phone + '&captcha=' + code
  return axios.get(url)
}
