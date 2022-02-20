import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';

import loading from 'modules/loading';
import user, { userSaga } from 'modules/user';
import counter, { counterSaga } from 'modules/counter';

import writeBlog, { writeBlogSaga } from 'modules/blog/writeBlog';
import listBlog, { listBlogSaga } from 'modules/blog/listBlog';
import readBlog, { readBlogSaga } from 'modules/blog/readBlog';
import removeBlog, { removeBlogSaga } from 'modules/blog/removeBlog';
import seriesBlog, { seriesBlogSaga } from 'modules/blog/seriesBlog';
import getlistBlog, { getlistBlogSaga } from 'modules/blog/getlistBlog';

import writeProjects, {
  writeProjectsSaga,
} from 'modules/projects/writeProjects';
import listProjects, { listProjectsSaga } from 'modules/projects/listProjects';
import readProjects, { readProjectsSaga } from 'modules/projects/readProjects';
import removeProjects, {
  removeProjectsSaga,
} from 'modules/projects/removeProjects';
import getlistProjects, {
  getlistProjectsSaga,
} from 'modules/projects/getlistProjects';

const rootReducer = combineReducers({
  loading,
  user,
  counter,
  writeBlog,
  listBlog,
  readBlog,
  removeBlog,
  seriesBlog,
  getlistBlog,
  writeProjects,
  listProjects,
  readProjects,
  removeProjects,
  getlistProjects,
});

export function* rootSaga() {
  yield all([
    userSaga(),
    counterSaga(),
    writeBlogSaga(),
    listBlogSaga(),
    readBlogSaga(),
    removeBlogSaga(),
    seriesBlogSaga(),
    getlistBlogSaga(),
    writeProjectsSaga(),
    listProjectsSaga(),
    readProjectsSaga(),
    removeProjectsSaga(),
    getlistProjectsSaga(),
  ]);
}

export default rootReducer;
