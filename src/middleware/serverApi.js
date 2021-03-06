import axios from 'axios';

const API_DOMAIN = 'http://xly-wkop.xiaoniangao.cn/music';

const callServerApi = (endpoint, params) => new Promise((resolve, reject) => {
  axios({
    method: 'POST',
    url: API_DOMAIN + endpoint,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: params
  }).then(res => {
    if (res.data.ret === 1) {
      return resolve(res.data.data);
    }
    return reject(new Error(res.data.errMsg));
  }).catch(err => reject(err));
});

/* eslint-disable no-unused-vars */
const array = [];
export default store => next => action => {
  if (!action.SERVER_API) {
    return next(action);
  }
  const {
    type,
    endpoint,
    params,
    normailzerFun,
    success
  } = action.SERVER_API;
  if (typeof type !== 'string') {
    throw new Error('type shoudle be a string');
  }
  if (typeof endpoint !== 'string') {
    throw new Error('endpoint shoudle be a string');
  }
  if (typeof params !== 'object') {
    throw new Error('params shoudle be a object');
  }

  next({
    type: `${type}_REQ`
  });
  return callServerApi(endpoint, params)
    .then(res => {
      const response = typeof (normailzerFun) !== 'undefined' ? normailzerFun(res) : res;
      next({
        type: `${type}_SUC`,
        response
      });
    }).catch(err => {
      next({
        type: `${type}_FAI`,
        errMsg: err.errMsg
      });
    });
};
