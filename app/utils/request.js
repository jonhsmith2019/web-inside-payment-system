import axios from 'axios';
import qs from 'qs';
/**
 * Parses the JSON returned by a network request
 *
 * @param  {object} response A response from a network request
 *
 * @return {object}          The parsed JSON from the request
 */
function parseJSON(response) {
  if (response.status === 204 || response.status === 205) {
    return null;
  }
  return response.json();
}

/**
 * Checks if a network request came back fine, and throws an error if not
 *
 * @param  {object} response   A response from a network request
 *
 * @return {object|undefined} Returns either the response, or throws an error
 */
function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

/**
 * Requests a URL, returning a promise
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 *
 * @return {object}           The response data
 */
export default function request(url, options) {
  return fetch(url, options)
    .then(checkStatus)
    .then(parseJSON);
}

export function requestAxios(method, url, data) {
  const token = localStorage.getItem('token');

  return new Promise((resolve, reject) => {
    axios({
      method,
      url: `${process.env.ENDPOINT_BASE_URL}${url}`,
      data,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => {
        if (res.data === 'Invalid token.') {
          localStorage.removeItem('token');
          window.location.reload();
        } else {
          resolve(res.data);
        }
      })
      .catch(err => {
        if (err.response) {
          if (err.response.status === 401) {
            if (url !== '/login') {
              // notistack.error('Expire session. Please try to login again!');
            }
            localStorage.removeItem('token');
            window.location.reload();
            // handleLogout();
          }
        }

        reject(err.response);
      });
  });
}

export function requestAxiosLogin(method, url, data) {
  return new Promise((resolve, reject) => {
    axios({
      method: 'post',
      url: `${process.env.ENDPOINT_BASE_URL}${url}`,
      data: qs.stringify(data),
      headers: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
      },
    })
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err.response);
      });
  });
}
