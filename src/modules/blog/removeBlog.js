import { createAction, handleActions } from 'redux-actions';
import { takeLatest } from 'redux-saga/effects';
import createRequestSaga, { createRequestActionTypes } from 'lib/createRequestSaga';
import * as postAPI from 'lib/api/post';

const [REMOVE_POST, REMOVE_POST_SUCCESS, REMOVE_POST_FAILURE] =
  createRequestActionTypes('removeBlog/REMOVE_POST');
const INIT_REMOVE_POST = 'removeBlog/INIT_REMOVE_POST';

export const removePost = createAction(REMOVE_POST, (id) => id);
export const initRemovePost = createAction(INIT_REMOVE_POST);

const removePostSaga = createRequestSaga(REMOVE_POST, postAPI.remove);

export function* removeBlogSaga() {
  yield takeLatest(REMOVE_POST, removePostSaga);
}

const initialState = {
  remove: false,
  error: null,
};

const readBlog = handleActions(
  {
    [REMOVE_POST]: () => initialState,
    [REMOVE_POST_SUCCESS]: (state) => ({
      remove: true,
      error: null,
    }),
    [REMOVE_POST_FAILURE]: (state, { payload: error }) => {
      alert(error.response.data.message);
      return {
        ...state,
        error,
      };
    },
    [INIT_REMOVE_POST]: () => initialState,
  },
  initialState,
);

export default readBlog;
