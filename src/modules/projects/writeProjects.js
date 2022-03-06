import { createAction, handleActions } from 'redux-actions';
import { takeLatest } from 'redux-saga/effects';
import createRequestSaga, { createRequestActionTypes } from 'lib/createRequestSaga';
import * as projectAPI from 'lib/api/project';

const INIT_WRITE_PROJECT = 'writeProjects/INIT_WRITE_PROJECT';
const CHANGE_FIELD = 'writeProjects/CHANGE_FIELD';
const SET_ORIGINAL_PROJECT = 'writeProjects/SET_ORIGINAL_PROJECT';
const [WRITE_PROJECT, WRITE_PROJECT_SUCCESS, WRITE_PROJECT_FAILURE] = createRequestActionTypes(
  'writeProjects/WRITE_PROJECT',
);
const [UPDATE_PROJECT, UPDATE_PROJECT_SUCCESS, UPDATE_PROJECT_FAILURE] = createRequestActionTypes(
  'writeProjects/UPDATE_PROJECT',
);

export const initWriteProject = createAction(INIT_WRITE_PROJECT);
export const changeField = createAction(CHANGE_FIELD, ({ key, value }) => ({ key, value }));
export const setOriginalProject = createAction(SET_ORIGINAL_PROJECT, (project) => project);
export const writeProject = createAction(WRITE_PROJECT, (project) => project);
export const updateProject = createAction(UPDATE_PROJECT, ({ id, project }) => ({ id, project }));

const writeProjectSaga = createRequestSaga(WRITE_PROJECT, projectAPI.write);
const updateProjectSaga = createRequestSaga(UPDATE_PROJECT, projectAPI.update);

export function* writeProjectsSaga() {
  yield takeLatest(WRITE_PROJECT, writeProjectSaga);
  yield takeLatest(UPDATE_PROJECT, updateProjectSaga);
}

const initialState = {
  title: '',
  subTitle: '',
  body: '',
  thumbnail: '',
  images: [],
  tags: [],
  update: [],
  workingPeriod: {
    start: '',
    end: '',
  },
  moreInfo: {
    projectClass: 'Personal Project',
    developState: 'Complete',
  },
  link: {
    website: [],
    github: [],
  },
  project: null,
  error: null,
  originalId: null,
};

const writeProjects = handleActions(
  {
    [INIT_WRITE_PROJECT]: () => initialState,
    [CHANGE_FIELD]: (state, { payload: { key, value } }) => ({
      ...state,
      [key]: value,
    }),
    [SET_ORIGINAL_PROJECT]: (state, { payload: project }) => ({
      ...state,
      title: project.title,
      subTitle: project.subTitle,
      body: project.body,
      thumbnail: project.thumbnail,
      images: project.images,
      tags: project.tags,
      update: project.update,
      workingPeriod: project.workingPeriod,
      moreInfo: project.moreInfo,
      link: project.link,
      originalId: project._id,
    }),
    [WRITE_PROJECT]: (state) => ({
      ...state,
      project: null,
      error: null,
    }),
    [WRITE_PROJECT_SUCCESS]: (state, { payload: project }) => ({
      ...state,
      project,
    }),
    [WRITE_PROJECT_FAILURE]: (state, { payload: error }) => {
      alert(error.response.data.message);
      return {
        ...state,
        error,
      };
    },
    [UPDATE_PROJECT]: (state) => ({
      ...state,
      project: null,
      error: null,
    }),
    [UPDATE_PROJECT_SUCCESS]: (state, { payload: project }) => ({
      ...state,
      project,
    }),
    [UPDATE_PROJECT_FAILURE]: (state, { payload: error }) => {
      alert(error.response.data.message);
      return {
        ...state,
        error,
      };
    },
  },
  initialState,
);

export default writeProjects;
