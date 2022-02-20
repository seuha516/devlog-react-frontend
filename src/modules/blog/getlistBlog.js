import { createAction, handleActions } from 'redux-actions';
import { takeLatest } from 'redux-saga/effects';
import createRequestSaga, {
  createRequestActionTypes,
} from 'lib/createRequestSaga';
import * as postAPI from 'lib/api/post';

const [
  GETLIST_POST,
  GETLIST_POST_SUCCESS,
  GETLIST_POST_FAILURE,
] = createRequestActionTypes('getlistBlog/GETLIST_POST');

export const getlistPost = createAction(GETLIST_POST);

const getlistPostSaga = createRequestSaga(GETLIST_POST, postAPI.getlist);
export function* getlistBlogSaga() {
  yield takeLatest(GETLIST_POST, getlistPostSaga);
}

const initialState = {
  titles: null,
  series: null,
  error: null,
};

const getlistBlog = handleActions(
  {
    [GETLIST_POST]: () => initialState,
    [GETLIST_POST_SUCCESS]: (state, { payload: { titles, series, tags } }) => ({
      ...state,
      titles,
      series,
      tags,
    }),
    [GETLIST_POST_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
  },
  initialState,
);

export default getlistBlog;
