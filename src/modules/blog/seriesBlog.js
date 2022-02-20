import { createAction, handleActions } from 'redux-actions';
import { takeLatest } from 'redux-saga/effects';
import createRequestSaga, {
  createRequestActionTypes,
} from 'lib/createRequestSaga';
import * as postAPI from 'lib/api/post';

const [
  SERIES_POST,
  SERIES_POST_SUCCESS,
  SERIES_POST_FAILURE,
] = createRequestActionTypes('seriesBlog/SERIES_POST');

export const seriesPost = createAction(SERIES_POST, ({ series, query }) => ({
  series,
  query,
}));

const seriesPostSaga = createRequestSaga(SERIES_POST, postAPI.series);
export function* seriesBlogSaga() {
  yield takeLatest(SERIES_POST, seriesPostSaga);
}

const initialState = {
  posts: null,
  error: null,
};

const seriesBlog = handleActions(
  {
    [SERIES_POST]: () => initialState,
    [SERIES_POST_SUCCESS]: (state, { payload: posts }) => ({
      ...state,
      posts,
    }),
    [SERIES_POST_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
  },
  initialState,
);

export default seriesBlog;
