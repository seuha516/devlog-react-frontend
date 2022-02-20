import { createAction, handleActions } from 'redux-actions';
import { takeLatest } from 'redux-saga/effects';
import createRequestSaga, {
  createRequestActionTypes,
} from 'lib/createRequestSaga';
import * as projectAPI from 'lib/api/project';

const [
  READ_PROJECT,
  READ_PROJECT_SUCCESS,
  READ_PROJECT_FAILURE,
] = createRequestActionTypes('readProjects/READ_PROJECT');
const UNLOAD_PROJECT = 'readProjects/UNLOAD_PROJECT';

export const readProject = createAction(READ_PROJECT, (id) => id);
export const unloadProject = createAction(UNLOAD_PROJECT);

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
    [READ_PROJECT_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
    [UNLOAD_PROJECT]: () => initialState,
  },
  initialState,
);

export default readBlog;
