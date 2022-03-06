import { createAction, handleActions } from 'redux-actions';
import { takeLatest } from 'redux-saga/effects';
import createRequestSaga, { createRequestActionTypes } from 'lib/createRequestSaga';
import * as postAPI from 'lib/api/post';

const [CATALOG_POST, CATALOG_POST_SUCCESS, CATALOG_POST_FAILURE] = createRequestActionTypes(
  'catalogBlog/CATALOG_POST',
);

export const catalogPost = createAction(CATALOG_POST);

const catalogPostSaga = createRequestSaga(CATALOG_POST, postAPI.catalog);

export function* catalogBlogSaga() {
  yield takeLatest(CATALOG_POST, catalogPostSaga);
}

const initialState = {
  titles: null,
  series: null,
  tags: null,
  error: null,
};

const catalogBlog = handleActions(
  {
    [CATALOG_POST]: () => initialState,
    [CATALOG_POST_SUCCESS]: (state, { payload: { titles, series, tags } }) => ({
      ...state,
      titles,
      series,
      tags,
    }),
    [CATALOG_POST_FAILURE]: (state, { payload: error }) => {
      alert(error.response.data.message);
      return {
        ...state,
        error,
      };
    },
  },
  initialState,
);

export default catalogBlog;
