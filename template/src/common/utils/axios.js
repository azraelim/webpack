import axios from 'axios'

import qs from 'qs'

// axios 配置
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
// axios.defaults.headers.common['Authorization'] = sessionStorage.getItem("tokens");
//axios.defaults.headers.common['Authorization'] = 'Bearer ' + sessionStorage.getItem("tokens");

export function post(url, params) {
  return new Promise((resolve, reject) => {
    axios.post(BASE + url, qs.stringify(params,{depth:10}))
      .then(response => {
        resolve(response.data);
      }, err => {
        reject(err);
      })
      .catch((error) => {
        reject(error)
      })
  })
}
export function get(url, params) {
  return new Promise((resolve, reject) => {
    axios.get(BASE + url, {params: params})
    .then(response => {
      resolve(response.data);
    }, err => {
      reject(err);
    })
    .catch((error) => {
      reject(error)
    })
  })
}

export function deletes(url, params) {
  return new Promise((resolve, reject) => {
    axios.delete(BASE + url, {params: params})
      .then(response => {
        resolve(response.data);
      }, err => {
        reject(err);
      })
      .catch((error) => {
        reject(error)
      })
  })
}

export function put(url, params) {
  return new Promise((resolve, reject) => {
    axios.put(BASE + url, qs.stringify(params,{depth:10}))
      .then(response => {
        resolve(response.data);
      }, err => {
        reject(err);
      })
      .catch((error) => {
        reject(error)
      })
  })
}




