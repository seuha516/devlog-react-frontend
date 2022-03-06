import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';

import loading from 'modules/loading';

import user, { userSaga } from 'modules/user';

import writeBlog, { writeBlogSaga } from 'modules/blog/writeBlog';
import listBlog, { listBlogSaga } from 'modules/blog/listBlog';
import readBlog, { readBlogSaga } from 'modules/blog/readBlog';
import removeBlog, { removeBlogSaga } from 'modules/blog/removeBlog';
import catalogBlog, { catalogBlogSaga } from 'modules/blog/catalogBlog';
import likeBlog, { likeBlogSaga } from 'modules/blog/likeBlog';

import writeProjects, { writeProjectsSaga } from 'modules/projects/writeProjects';
import listProjects, { listProjectsSaga } from 'modules/projects/listProjects';
import readProjects, { readProjectsSaga } from 'modules/projects/readProjects';
import removeProjects, { removeProjectsSaga } from 'modules/projects/removeProjects';
import catalogProjects, { catalogProjectsSaga } from 'modules/projects/catalogProjects';

const rootReducer = combineReducers({
  loading,
  user,
  writeBlog,
  listBlog,
  readBlog,
  removeBlog,
  catalogBlog,
  likeBlog,
  writeProjects,
  listProjects,
  readProjects,
  removeProjects,
  catalogProjects,
});

export function* rootSaga() {
  yield all([
    userSaga(),
    writeBlogSaga(),
    listBlogSaga(),
    readBlogSaga(),
    removeBlogSaga(),
    catalogBlogSaga(),
    likeBlogSaga(),
    writeProjectsSaga(),
    listProjectsSaga(),
    readProjectsSaga(),
    removeProjectsSaga(),
    catalogProjectsSaga(),
  ]);
}

export default rootReducer;
