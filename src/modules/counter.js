import { createAction, handleActions } from 'redux-actions';
import { takeLatest } from 'redux-saga/effects';
import createRequestSaga, {
  createRequestActionTypes,
} from 'lib/createRequestSaga';
import * as counterAPI from 'lib/api/counter';

const ADD_COUNTER = 'counter/ADD_COUNTER';
const [LIST_COUNTER, LIST_COUNTER_SUCCESS, LIST_COUNTER_FAILURE] =
  createRequestActionTypes('counter/LIST_COUNTER');

export const addCounter = createAction(ADD_COUNTER);
export const listCounter = createAction(LIST_COUNTER);

//사가
const addCounterSaga = createRequestSaga(ADD_COUNTER, counterAPI.add);
const listCounterSaga = createRequestSaga(LIST_COUNTER, counterAPI.list);
export function* counterSaga() {
  yield takeLatest(ADD_COUNTER, addCounterSaga);
  yield takeLatest(LIST_COUNTER, listCounterSaga);
}

const initialState = {
  list: null,
  error: null,
};

const counter = handleActions(
  {
    [LIST_COUNTER]: (state) => initialState,
    [LIST_COUNTER_SUCCESS]: (state, { payload: list }) => ({
      list,
      error: null,
    }),
    [LIST_COUNTER_FAILURE]: (state, { payload: error }) => ({
      list: null,
      error,
    }),
  },
  initialState,
);
export default counter;
