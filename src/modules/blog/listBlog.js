import { createAction, handleActions } from 'redux-actions';
import { takeLatest } from 'redux-saga/effects';
import createRequestSaga, { createRequestActionTypes } from 'lib/createRequestSaga';
import * as postAPI from 'lib/api/post';

const [LIST_POST, LIST_POST_SUCCESS, LIST_POST_FAILURE] =
  createRequestActionTypes('listBlog/LIST_POST');

export const listPost = createAction(LIST_POST, (query) => query);

const listPostSaga = createRequestSaga(LIST_POST, postAPI.list);

export function* listBlogSaga() {
  yield takeLatest(LIST_POST, listPostSaga);
}

const initialState = {
  posts: null,
  tags: null,
  series: null,
  postCount: 0,
  error: null,
};

const listBlog = handleActions(
  {
    [LIST_POST]: () => initialState,
    [LIST_POST_SUCCESS]: (state, { payload: { posts, postCount, tags, series } }) => ({
      ...state,
      posts,
      postCount,
      tags,
      series,
    }),
    [LIST_POST_FAILURE]: (state, { payload: error }) => {
      alert(error.response.data.message);
      return {
        ...state,
        error,
      };
    },
  },
  initialState,
);

export default listBlog;
