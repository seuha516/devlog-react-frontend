import { createAction, handleActions } from 'redux-actions';
import { takeLatest } from 'redux-saga/effects';
import createRequestSaga, {
  createRequestActionTypes,
} from 'lib/createRequestSaga';
import * as projectAPI from 'lib/api/project';

const [
  GETLIST_PROJECT,
  GETLIST_PROJECT_SUCCESS,
  GETLIST_PROJECT_FAILURE,
] = createRequestActionTypes('getlistProjects/GETLIST_PROJECT');

export const getlistProject = createAction(GETLIST_PROJECT);

const getlistProjectSaga = createRequestSaga(
  GETLIST_PROJECT,
  projectAPI.getlist,
);
export function* getlistProjectsSaga() {
  yield takeLatest(GETLIST_PROJECT, getlistProjectSaga);
}

const initialState = {
  tags: null,
  error: null,
};

const getlistProjects = handleActions(
  {
    [GETLIST_PROJECT]: () => initialState,
    [GETLIST_PROJECT_SUCCESS]: (state, { payload: { tags } }) => ({
      ...state,
      tags,
    }),
    [GETLIST_PROJECT_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
  },
  initialState,
);

export default getlistProjects;
