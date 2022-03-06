import { createAction, handleActions } from 'redux-actions';
import { takeLatest } from 'redux-saga/effects';
import createRequestSaga, { createRequestActionTypes } from 'lib/createRequestSaga';
import * as projectAPI from 'lib/api/project';

const [READ_PROJECT, READ_PROJECT_SUCCESS, READ_PROJECT_FAILURE] = createRequestActionTypes(
  'readProjects/READ_PROJECT',
);
const INIT_READ_PROJECT = 'readProjects/INIT_READ_PROJECT';

export const readProject = createAction(READ_PROJECT, (id) => id);
export const initReadProject = createAction(INIT_READ_PROJECT);

const readProjectSaga = createRequestSaga(READ_PROJECT, projectAPI.read);
export function* readProjectsSaga() {
  yield takeLatest(READ_PROJECT, readProjectSaga);
}

const initialState = {
  project: null,
  error: null,
};

const readBlog = handleActions(
  {
    [READ_PROJECT]: () => initialState,
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
    [INIT_READ_PROJECT]: () => initialState,
  },
  initialState,
);

export default readBlog;
