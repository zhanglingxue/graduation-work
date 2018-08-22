import axios from 'axios';

const API_DOMAIN = 'http://xly-wkop.xiaoniangao.cn/login';

const callLoginApi = params => new Promise((resolve, reject) => {
  axios({
    method: 'POST',
    url: API_DOMAIN,
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
export default store => next => action => {
  if (!action.LOGIN_API) {
    return next(action);
  }
  const {
    type,
    params,
    success
  } = action.LOGIN_API;
  if (typeof type !== 'string') {
    throw new Error('type shoudle be a string');
  }
  if (typeof params !== 'object') {
    throw new Error('params shoudle be a object');
  }
  next({
    type: `${type}_REQ`
  });
  return callLoginApi(params)
    .then(response => {
      next({
        type: `${type}_SUC`,
        response
      });
      success(response);
    }).catch(err => {
      next({
        type: `${type}_FAI`,
        errMsg: err.errMsg
      });
    });
};
