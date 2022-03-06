import { createAction, handleActions } from 'redux-actions';
import { takeLatest } from 'redux-saga/effects';
import createRequestSaga, { createRequestActionTypes } from 'lib/createRequestSaga';
import * as projectAPI from 'lib/api/project';

const [REMOVE_PROJECT, REMOVE_PROJECT_SUCCESS, REMOVE_PROJECT_FAILURE] = createRequestActionTypes(
  'removeProjects/REMOVE_PROJECT',
);
const INIT_REMOVE_PROJECT = 'removeProjects/INIT_REMOVE_PROJECT';

export const removeProject = createAction(REMOVE_PROJECT, (id) => id);
export const initRemoveProject = createAction(INIT_REMOVE_PROJECT);

const removeProjectSaga = createRequestSaga(REMOVE_PROJECT, projectAPI.remove);

export function* removeProjectsSaga() {
  yield takeLatest(REMOVE_PROJECT, removeProjectSaga);
}

const initialState = {
  remove: false,
  error: null,
};

const readBlog = handleActions(
  {
    [REMOVE_PROJECT]: () => initialState,
    [REMOVE_PROJECT_SUCCESS]: (state) => ({
      remove: true,
      error: null,
    }),
    [REMOVE_PROJECT_FAILURE]: (state, { payload: error }) => {
      alert(error.response.data.message);
      return {
        ...state,
        error,
      };
    },
    [INIT_REMOVE_PROJECT]: () => initialState,
  },
  initialState,
);

export default readBlog;
