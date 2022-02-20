import { createAction, handleActions } from 'redux-actions';
import { takeLatest } from 'redux-saga/effects';
import createRequestSaga, {
  createRequestActionTypes,
} from 'lib/createRequestSaga';
import * as projectAPI from 'lib/api/project';

//액션
const [
  LIST_PROJECT,
  LIST_PROJECT_SUCCESS,
  LIST_PROJECT_FAILURE,
] = createRequestActionTypes('listProjects/LIST_PROJECT');

//액션 생성 함수
export const listProject = createAction(LIST_PROJECT, (query) => query);

//사가
const listProjectSaga = createRequestSaga(LIST_PROJECT, projectAPI.list);
export function* listProjectsSaga() {
  yield takeLatest(LIST_PROJECT, listProjectSaga);
}

//초기 상태
const initialState = {
  projects: null,
  projectCount: 0,
  tags: null,
  error: null,
};

//리듀서 함수
const listProjects = handleActions(
  {
    [LIST_PROJECT]: () => initialState,
    [LIST_PROJECT_SUCCESS]: (
      state,
      { payload: { projects, projectCount, tags } },
    ) => ({
      ...state,
      projects,
      projectCount,
      tags,
    }),
    [LIST_PROJECT_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
  },
  initialState,
);

export default listProjects;
