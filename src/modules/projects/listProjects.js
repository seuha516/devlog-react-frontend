import { createAction, handleActions } from 'redux-actions';
import { takeLatest } from 'redux-saga/effects';
import createRequestSaga, { createRequestActionTypes } from 'lib/createRequestSaga';
import * as projectAPI from 'lib/api/project';

const [LIST_PROJECT, LIST_PROJECT_SUCCESS, LIST_PROJECT_FAILURE] = createRequestActionTypes(
  'listProjects/LIST_PROJECT',
);

export const listProject = createAction(LIST_PROJECT, (query) => query);

const listProjectSaga = createRequestSaga(LIST_PROJECT, projectAPI.list);

export function* listProjectsSaga() {
  yield takeLatest(LIST_PROJECT, listProjectSaga);
}

const initialState = {
  projects: null,
  projectCount: 0,
  tags: null,
  error: null,
};

const listProjects = handleActions(
  {
    [LIST_PROJECT]: () => initialState,
    [LIST_PROJECT_SUCCESS]: (state, { payload: { projects, projectCount, tags } }) => ({
      ...state,
      projects,
      projectCount,
      tags,
    }),
    [LIST_PROJECT_FAILURE]: (state, { payload: error }) => {
      alert(error.response.data.message);
      return {
        ...state,
        error,
      };
    },
  },
  initialState,
);

export default listProjects;
