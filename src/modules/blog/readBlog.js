import { createAction, handleActions } from 'redux-actions';
import { takeLatest } from 'redux-saga/effects';
import createRequestSaga, { createRequestActionTypes } from 'lib/createRequestSaga';
import * as postAPI from 'lib/api/post';

const INIT_READ_POST = 'readBlog/INIT_READ_POST';
const [READ_POST, READ_POST_SUCCESS, READ_POST_FAILURE] = createRequestActionTypes('readBlog/READ_POST');
const [REMOVE_POST, REMOVE_POST_SUCCESS, REMOVE_POST_FAILURE] = createRequestActionTypes('readBlog/REMOVE_POST');
const [LIKE_POST, LIKE_POST_SUCCESS, LIKE_POST_FAILURE] = createRequestActionTypes('readBlog/LIKE_POST');
const [WRITE_COMMENT_POST, WRITE_COMMENT_POST_SUCCESS, WRITE_COMMENT_POST_FAILURE] =
  createRequestActionTypes('readBlog/WRITE_COMMENT_POST');
const [REMOVE_COMMENT_POST, REMOVE_COMMENT_POST_SUCCESS, REMOVE_COMMENT_POST_FAILURE] =
  createRequestActionTypes('readBlog/REMOVE_COMMENT_POST');

export const initReadPost = createAction(INIT_READ_POST);
export const readPost = createAction(READ_POST, (id) => id);
export const removePost = createAction(REMOVE_POST, (id) => id);
export const likePost = createAction(LIKE_POST, (id) => id);
export const writeCommentPost = createAction(WRITE_COMMENT_POST, ({ id, comment }) => ({ id, comment }));
export const removeCommentPost = createAction(REMOVE_COMMENT_POST, ({ id, comment }) => ({ id, comment }));

const readPostSaga = createRequestSaga(READ_POST, postAPI.read);
const removePostSaga = createRequestSaga(REMOVE_POST, postAPI.remove);
const likePostSaga = createRequestSaga(LIKE_POST, postAPI.like);
const writeCommentPostSaga = createRequestSaga(WRITE_COMMENT_POST, postAPI.writeComment);
const removeCommentPostSaga = createRequestSaga(REMOVE_COMMENT_POST, postAPI.removeComment);

export function* readBlogSaga() {
  yield takeLatest(READ_POST, readPostSaga);
  yield takeLatest(REMOVE_POST, removePostSaga);
  yield takeLatest(LIKE_POST, likePostSaga);
  yield takeLatest(WRITE_COMMENT_POST, writeCommentPostSaga);
  yield takeLatest(REMOVE_COMMENT_POST, removeCommentPostSaga);
}

const initialState = {
  post: null,
  prev: null,
  next: null,
  error: null,

  remove: false,
  reload: false,
};

const readBlog = handleActions(
  {
    [INIT_READ_POST]: () => initialState,

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

    [REMOVE_POST_SUCCESS]: (state) => ({
      ...state,
      remove: true,
    }),
    [REMOVE_POST_FAILURE]: (state, { payload: error }) => {
      alert(error.response.data.message);
      return state;
    },
    [LIKE_POST_SUCCESS]: (state) => ({
      ...state,
      reload: true,
    }),
    [LIKE_POST_FAILURE]: (state, { payload: error }) => {
      alert(error.response.data.message);
      return state;
    },
    [WRITE_COMMENT_POST_SUCCESS]: (state) => ({
      ...state,
      reload: true,
    }),
    [WRITE_COMMENT_POST_FAILURE]: (state, { payload: error }) => {
      alert(error.response.data.message);
      return state;
    },
    [REMOVE_COMMENT_POST_SUCCESS]: (state) => ({
      ...state,
      reload: true,
    }),
    [REMOVE_COMMENT_POST_FAILURE]: (state, { payload: error }) => {
      alert(error.response.data.message);
      return state;
    },
  },
  initialState,
);

export default readBlog;
