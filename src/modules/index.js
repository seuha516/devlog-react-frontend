import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';

import loading from 'modules/loading';
import user, { userSaga } from 'modules/user';
import listBlog, { listBlogSaga } from 'modules/blog/listBlog';
import writeBlog, { writeBlogSaga } from 'modules/blog/writeBlog';
import readBlog, { readBlogSaga } from 'modules/blog/readBlog';
import listProjects, { listProjectsSaga } from 'modules/projects/listProjects';
import writeProjects, { writeProjectsSaga } from 'modules/projects/writeProjects';
import readProjects, { readProjectsSaga } from 'modules/projects/readProjects';

const rootReducer = combineReducers({
  loading,
  user,
  writeBlog,
  listBlog,
  readBlog,
  writeProjects,
  listProjects,
  readProjects,
});

export function* rootSaga() {
  yield all([
    userSaga(),
    listBlogSaga(),
    writeBlogSaga(),
    readBlogSaga(),
    listProjectsSaga(),
    writeProjectsSaga(),
    readProjectsSaga(),
  ]);
}

export default rootReducer;
