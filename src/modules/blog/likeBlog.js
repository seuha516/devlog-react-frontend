import { createAction, handleActions } from 'redux-actions';
import { takeLatest } from 'redux-saga/effects';
import createRequestSaga, { createRequestActionTypes } from 'lib/createRequestSaga';
import * as postAPI from 'lib/api/post';

const [LIKE_POST, LIKE_POST_SUCCESS, LIKE_POST_FAILURE] =
  createRequestActionTypes('likeBlog/LIKE_POST');
const INIT_LIKE_POST = 'likeBlog/INIT_LIKE_POST';

export const likePost = createAction(LIKE_POST, (id) => id);
export const initLikePost = createAction(INIT_LIKE_POST);

const likePostSaga = createRequestSaga(LIKE_POST, postAPI.like);

export function* likeBlogSaga() {
  yield takeLatest(LIKE_POST, likePostSaga);
}

const initialState = {
  like: false,
  error: null,
};

const likeBlog = handleActions(
  {
    [LIKE_POST]: () => initialState,
    [LIKE_POST_SUCCESS]: (state) => ({
      like: true,
      error: null,
    }),
    [LIKE_POST_FAILURE]: (state, { payload: error }) => {
      alert(error.response.data.message);
      return {
        ...state,
        error,
      };
    },
    [INIT_LIKE_POST]: () => initialState,
  },
  initialState,
);

export default likeBlog;
