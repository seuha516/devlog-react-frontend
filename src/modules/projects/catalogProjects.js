import { createAction, handleActions } from 'redux-actions';
import { takeLatest } from 'redux-saga/effects';
import createRequestSaga, { createRequestActionTypes } from 'lib/createRequestSaga';
import * as projectAPI from 'lib/api/project';

const [CATALOG_PROJECT, CATALOG_PROJECT_SUCCESS, CATALOG_PROJECT_FAILURE] =
  createRequestActionTypes('catalogProjects/CATALOG_PROJECT');

export const catalogProject = createAction(CATALOG_PROJECT);

const catalogProjectSaga = createRequestSaga(CATALOG_PROJECT, projectAPI.catalog);

export function* catalogProjectsSaga() {
  yield takeLatest(CATALOG_PROJECT, catalogProjectSaga);
}

const initialState = {
  tags: null,
  error: null,
};

const catalogProjects = handleActions(
  {
    [CATALOG_PROJECT]: () => initialState,
    [CATALOG_PROJECT_SUCCESS]: (state, { payload: tags }) => ({
      ...state,
      tags,
    }),
    [CATALOG_PROJECT_FAILURE]: (state, { payload: error }) => {
      alert(error.response.data.message);
      return {
        ...state,
        error,
      };
    },
  },
  initialState,
);

export default catalogProjects;
