import { createAction, handleActions } from 'redux-actions';
import { takeLatest } from 'redux-saga/effects';
import createRequestSaga, { createRequestActionTypes } from 'lib/createRequestSaga';
import * as postAPI from 'lib/api/post';

const INIT_WRITE_POST = 'writeBlog/INIT_WRITE_POST';
const CHANGE_FIELD = 'writeBlog/CHANGE_FIELD';
const SET_ORIGINAL_POST = 'writeBlog/SET_ORIGINAL_POST';
const [WRITE_POST, WRITE_POST_SUCCESS, WRITE_POST_FAILURE] =
  createRequestActionTypes('writeBlog/WRITE_POST');
const [UPDATE_POST, UPDATE_POST_SUCCESS, UPDATE_POST_FAILURE] =
  createRequestActionTypes('writeBlog/UPDATE_POST');

export const initWritePost = createAction(INIT_WRITE_POST);
export const changeField = createAction(CHANGE_FIELD, ({ key, value }) => ({ key, value }));
export const setOriginalPost = createAction(SET_ORIGINAL_POST, (post) => post);
export const writePost = createAction(WRITE_POST, (post) => post);
export const updatePost = createAction(UPDATE_POST, ({ id, post }) => ({ id, post }));

const writePostSaga = createRequestSaga(WRITE_POST, postAPI.write);
const updatePostSaga = createRequestSaga(UPDATE_POST, postAPI.update);

export function* writeBlogSaga() {
  yield takeLatest(WRITE_POST, writePostSaga);
  yield takeLatest(UPDATE_POST, updatePostSaga);
}

const initialState = {
  title: '',
  subTitle: '',
  body: '',
  thumbnail: '',
  series: '',
  project: '',
  tags: [],
  post: null,
  error: null,
  originalId: null,
};

const writeBlog = handleActions(
  {
    [INIT_WRITE_POST]: () => initialState,
    [CHANGE_FIELD]: (state, { payload: { key, value } }) => ({
      ...state,
      [key]: value,
    }),
    [SET_ORIGINAL_POST]: (state, { payload: post }) => ({
      ...state,
      title: post.title,
      subTitle: post.subTitle,
      body: post.body,
      thumbnail: post.thumbnail,
      series: post.series,
      project: post.project,
      tags: post.tags,
      originalId: post._id,
    }),
    [WRITE_POST]: (state) => ({
      ...state,
      post: null,
      error: null,
    }),
    [WRITE_POST_SUCCESS]: (state, { payload: post }) => ({
      ...state,
      post,
    }),
    [WRITE_POST_FAILURE]: (state, { payload: error }) => {
      alert(error.response.data.message);
      return {
        ...state,
        error,
      };
    },
    [UPDATE_POST]: (state) => ({
      ...state,
      post: null,
      error: null,
    }),
    [UPDATE_POST_SUCCESS]: (state, { payload: post }) => ({
      ...state,
      post,
    }),
    [UPDATE_POST_FAILURE]: (state, { payload: error }) => {
      alert(error.response.data.message);
      return {
        ...state,
        error,
      };
    },
  },
  initialState,
);

export default writeBlog;
