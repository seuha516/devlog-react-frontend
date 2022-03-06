import { createAction, handleActions } from 'redux-actions';
import { takeLatest } from 'redux-saga/effects';
import createRequestSaga, { createRequestActionTypes } from 'lib/createRequestSaga';
import * as postAPI from 'lib/api/post';

const [READ_POST, READ_POST_SUCCESS, READ_POST_FAILURE] =
  createRequestActionTypes('readBlog/READ_POST');
const INIT_READ_POST = 'readBlog/INIT_READ_POST';

export const readPost = createAction(READ_POST, (id) => id);
export const initReadPost = createAction(INIT_READ_POST);

const readPostSaga = createRequestSaga(READ_POST, postAPI.read);

export function* readBlogSaga() {
  yield takeLatest(READ_POST, readPostSaga);
}

const initialState = {
  post: null,
  prev: null,
  next: null,
  error: null,
};

const readBlog = handleActions(
  {
    [READ_POST]: () => initialState,
    [READ_POST_SUCCESS]: (state, { payload: post }) => ({
      ...state,
      post: post.post,
      prev: post.prev,
      next: post.next,
    }),
    [READ_POST_FAILURE]: (state, { payload: error }) => {
      alert(error.response.data.message);
      return {
        ...state,
        error,
      };
    },
    [INIT_READ_POST]: () => initialState,
  },
  initialState,
);

export default readBlog;
