import { createAction, handleActions } from 'redux-actions';
import { takeLatest } from 'redux-saga/effects';
import createRequestSaga, {
  createRequestActionTypes,
} from 'lib/createRequestSaga';
import * as postAPI from 'lib/api/post';

const INITIALIZE = 'writeBlog/INITIALIZE';
const CHANGE_FIELD = 'writeBlog/CHANGE_FIELD';
const SET_ORIGINAL_POST = 'writeBlog/SET_ORIGINAL_POST';
const [
  WRITE_POST,
  WRITE_POST_SUCCESS,
  WRITE_POST_FAILURE,
] = createRequestActionTypes('writeBlog/WRITE_POST');
const [
  UPDATE_POST,
  UPDATE_POST_SUCCESS,
  UPDATE_POST_FAILURE,
] = createRequestActionTypes('writeBlog/UPDATE_POST');

export const initialize = createAction(INITIALIZE);
export const changeField = createAction(CHANGE_FIELD, ({ key, value }) => ({
  key,
  value,
}));
export const setOriginalPost = createAction(SET_ORIGINAL_POST, (post) => post);
export const writePost = createAction(WRITE_POST, (post) => post);
export const updatePost = createAction(UPDATE_POST, ({ id, post }) => ({
  id,
  post,
}));

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
  series: {
    name: '',
    project: {
      name: '',
      id: '',
    },
  },
  tags: [],
  post: null,
  postError: null,
  originalPostId: null,
};

const writeBlog = handleActions(
  {
    [INITIALIZE]: () => initialState,
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
      tags: post.tags,
      originalPostId: post._id,
    }),
    [WRITE_POST]: (state) => ({
      ...state,
      post: null,
      postError: null,
    }),
    [WRITE_POST_SUCCESS]: (state, { payload: post }) => ({
      ...state,
      post,
    }),
    [WRITE_POST_FAILURE]: (state, { payload: postError }) => ({
      ...state,
      postError,
    }),
    [UPDATE_POST]: (state) => ({
      ...state,
      post: null,
      postError: null,
    }),
    [UPDATE_POST_SUCCESS]: (state, { payload: post }) => ({
      ...state,
      post,
    }),
    [UPDATE_POST_FAILURE]: (state, { payload: postError }) => ({
      ...state,
      postError,
    }),
  },
  initialState,
);

export default writeBlog;
