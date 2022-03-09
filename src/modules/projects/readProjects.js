import { createAction, handleActions } from 'redux-actions';
import { takeLatest } from 'redux-saga/effects';
import createRequestSaga, { createRequestActionTypes } from 'lib/createRequestSaga';
import * as projectAPI from 'lib/api/project';

const INIT_READ_PROJECT = 'readProjects/INIT_READ_PROJECT';
const [READ_PROJECT, READ_PROJECT_SUCCESS, READ_PROJECT_FAILURE] = createRequestActionTypes(
  'readProjects/READ_PROJECT',
);
const [REMOVE_PROJECT, REMOVE_PROJECT_SUCCESS, REMOVE_PROJECT_FAILURE] = createRequestActionTypes(
  'readProjects/REMOVE_PROJECT',
);
const [LIKE_PROJECT, LIKE_PROJECT_SUCCESS, LIKE_PROJECT_FAILURE] = createRequestActionTypes(
  'readProjects/LIKE_PROJECT',
);
const [WRITE_COMMENT_PROJECT, WRITE_COMMENT_PROJECT_SUCCESS, WRITE_COMMENT_PROJECT_FAILURE] =
  createRequestActionTypes('readProjects/WRITE_COMMENT_PROJECT');
const [REMOVE_COMMENT_PROJECT, REMOVE_COMMENT_PROJECT_SUCCESS, REMOVE_COMMENT_PROJECT_FAILURE] =
  createRequestActionTypes('readProjects/REMOVE_COMMENT_PROJECT');

export const initReadProject = createAction(INIT_READ_PROJECT);
export const readProject = createAction(READ_PROJECT, (id) => id);
export const removeProject = createAction(REMOVE_PROJECT, (id) => id);
export const likeProject = createAction(LIKE_PROJECT, (id) => id);
export const writeCommentProject = createAction(WRITE_COMMENT_PROJECT, ({ id, comment }) => ({
  id,
  comment,
}));
export const removeCommentProject = createAction(REMOVE_COMMENT_PROJECT, ({ id, comment }) => ({
  id,
  comment,
}));

const readProjectSaga = createRequestSaga(READ_PROJECT, projectAPI.read);
const removeProjectSaga = createRequestSaga(REMOVE_PROJECT, projectAPI.remove);
const likeProjectSaga = createRequestSaga(LIKE_PROJECT, projectAPI.like);
const writeCommentProjectSaga = createRequestSaga(WRITE_COMMENT_PROJECT, projectAPI.writeComment);
const removeCommentProjectSaga = createRequestSaga(
  REMOVE_COMMENT_PROJECT,
  projectAPI.removeComment,
);

export function* readProjectsSaga() {
  yield takeLatest(READ_PROJECT, readProjectSaga);
  yield takeLatest(REMOVE_PROJECT, removeProjectSaga);
  yield takeLatest(LIKE_PROJECT, likeProjectSaga);
  yield takeLatest(WRITE_COMMENT_PROJECT, writeCommentProjectSaga);
  yield takeLatest(REMOVE_COMMENT_PROJECT, removeCommentProjectSaga);
}

const initialState = {
  project: null,
  error: null,

  remove: false,
  reload: false,
};

const readBlog = handleActions(
  {
    [INIT_READ_PROJECT]: () => initialState,

    [READ_PROJECT_SUCCESS]: (state, { payload: project }) => ({
      ...state,
      project,
    }),
    [READ_PROJECT_FAILURE]: (state, { payload: error }) => {
      alert(error.response.data.message);
      return {
        ...state,
        error,
      };
    },

    [REMOVE_PROJECT_SUCCESS]: (state) => ({
      ...state,
      remove: true,
    }),
    [REMOVE_PROJECT_FAILURE]: (state, { payload: error }) => {
      alert(error.response.data.message);
      return state;
    },
    [LIKE_PROJECT]: (state) => ({
      ...state,
      reload: false,
    }),
    [LIKE_PROJECT_SUCCESS]: (state) => ({
      ...state,
      reload: true,
    }),
    [LIKE_PROJECT_FAILURE]: (state, { payload: error }) => {
      alert(error.response.data.message);
      return state;
    },
    [WRITE_COMMENT_PROJECT]: (state) => ({
      ...state,
      reload: false,
    }),
    [WRITE_COMMENT_PROJECT_SUCCESS]: (state) => ({
      ...state,
      reload: true,
    }),
    [WRITE_COMMENT_PROJECT_FAILURE]: (state, { payload: error }) => {
      alert(error.response.data.message);
      return state;
    },
    [REMOVE_COMMENT_PROJECT]: (state) => ({
      ...state,
      reload: false,
    }),
    [REMOVE_COMMENT_PROJECT_SUCCESS]: (state) => ({
      ...state,
      reload: true,
    }),
    [REMOVE_COMMENT_PROJECT_FAILURE]: (state, { payload: error }) => {
      alert(error.response.data.message);
      return state;
    },
  },
  initialState,
);

export default readBlog;
