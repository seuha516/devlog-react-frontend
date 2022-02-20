import { createAction, handleActions } from 'redux-actions';
import { call, takeLatest } from 'redux-saga/effects';
import createRequestSaga, {
  createRequestActionTypes,
} from 'lib/createRequestSaga';
import * as userAPI from 'lib/api/user';

const SET_USER = 'user/SET_USER';
const [LOGIN, LOGIN_SUCCESS, LOGIN_FAILURE] = createRequestActionTypes(
  'user/LOGIN',
);
const [CHECK, CHECK_SUCCESS, CHECK_FAILURE] = createRequestActionTypes(
  'user/CHECK',
);
const LOGOUT = 'user/LOGOUT';

export const setUser = createAction(SET_USER, (user) => user);
export const login = createAction(LOGIN, ({ username, password }) => ({
  username,
  password,
}));
export const check = createAction(CHECK);
export const logout = createAction(LOGOUT);

//사가
const loginSaga = createRequestSaga(LOGIN, userAPI.login);
const checkSaga = createRequestSaga(CHECK, userAPI.check);
function checkFailureSaga() {
  try {
    localStorage.removeItem('user');
  } catch (e) {
    console.log('localStorage is not working');
  }
}
function* logoutSaga() {
  try {
    yield call(userAPI.logout);
    localStorage.removeItem('user');
  } catch (e) {
    console.log(e);
  }
}
export function* userSaga() {
  yield takeLatest(LOGIN, loginSaga);
  yield takeLatest(CHECK, checkSaga);
  yield takeLatest(CHECK_FAILURE, checkFailureSaga);
  yield takeLatest(LOGOUT, logoutSaga);
}

const initialState = {
  user: null,
};

const user = handleActions(
  {
    [SET_USER]: (state, { payload: user }) => ({
      user,
    }),
    [LOGIN_SUCCESS]: (state, { payload: user }) => {
      alert(`Hello, ${user.username}!`);
      return { user };
    },
    [LOGIN_FAILURE]: (state, { payload: error }) => {
      alert(`로그인에 실패했습니다.`);
      return state;
    },
    [CHECK_SUCCESS]: (state, { payload: username }) => {
      return state;
    },
    [CHECK_FAILURE]: (state, { payload: error }) => {
      return { user: null };
    },
    [LOGOUT]: (state) => ({
      user: null,
    }),
  },
  initialState,
);
export default user;
