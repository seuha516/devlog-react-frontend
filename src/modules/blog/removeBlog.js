import { createAction, handleActions } from 'redux-actions';
import { takeLatest } from 'redux-saga/effects';
import createRequestSaga, {
  createRequestActionTypes,
} from 'lib/createRequestSaga';
import * as postAPI from 'lib/api/post';

const [
  REMOVE_POST,
  REMOVE_POST_SUCCESS,
  REMOVE_POST_FAILURE,
] = createRequestActionTypes('removeBlog/REMOVE_POST');
const INIT_REMOVE = 'removeBlog/INIT_REMOVE';

export const removePost = createAction(REMOVE_POST, (id) => id);
export const initRemove = createAction(INIT_REMOVE);

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
    [REMOVE_POST_FAILURE]: (state, { payload: error }) => ({
      remove: false,
      error,
    }),
    [INIT_REMOVE]: () => initialState,
  },
  initialState,
);

export default readBlog;
