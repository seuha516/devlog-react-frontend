import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listPost } from 'modules/blog/listBlog';

import Error from 'components/utils/Error';
import Loading from 'components/utils/Loading';
import PostList from 'components/blog/list/PostList';
import TagList from 'components/blog/list/TagList';
import SeriesList from 'components/blog/list/SeriesList';

const List = ({ location, history }) => {
  const { posts, postCount, tags, series, error, loading, user } = useSelector(({ listBlog, loading, user }) => ({
    posts: listBlog.posts,
    postCount: listBlog.postCount,
    tags: listBlog.tags,
    series: listBlog.series,
    error: listBlog.error,
    loading: loading['listBlog/LIST_POST'],
    user: user.user,
  }));
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  useEffect(() => {
    const htmlTitle = document.querySelector('title');
    htmlTitle.innerHTML = 'Devlog - Posts';
    window.scrollTo(0, 0);
    if (location.pathname === '/blog/list/tags') {
      setPage(0);
      history.push('/blog/list');
    } else if (location.pathname === '/blog/list/series') {
      setPage(2);
      history.push('/blog/list');
    }
    dispatch(listPost(location.search));
    return () => {
      htmlTitle.innerHTML = 'Devlog';
    };
  }, [dispatch, history, location.pathname, location.search]);

  if (error) {
    return <Error />;
  } else if (loading) {
    return (
      <div style={{ width: '100%', height: 'calc(100vh - 62px)' }}>
        <Loading />
      </div>
    );
  }
  return (
    <>
      {page === 0
        ? tags && <TagList tags={tags} location={location} setPage={setPage} />
        : page === 1
        ? posts && <PostList posts={posts} postCount={postCount} location={location} user={user} setPage={setPage} />
        : series && <SeriesList series={series} setPage={setPage} />}
    </>
  );
};

export default List;
