import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listPost } from 'modules/blog/listBlog';

import Error from 'components/utils/Error';
import Loading from 'components/utils/Loading';
import PostList from 'components/blog/list/PostList';
import TagList from 'components/blog/list/TagList';
import SeriesList from 'components/blog/list/SeriesList';

const List = ({ location, history }) => {
  const dispatch = useDispatch();
  const { posts, postCount, tags, series, error, loading, user } = useSelector(
    ({ listBlog, loading, user }) => ({
      posts: listBlog.posts,
      postCount: listBlog.postCount,
      tags: listBlog.tags,
      series: listBlog.series,
      error: listBlog.error,
      loading: loading['listBlog/LIST_POST'],
      user: user.user,
    }),
  );
  useEffect(() => {
    const htmlTitle = document.querySelector('title');
    htmlTitle.innerHTML = 'Devlog - Posts';
    return () => {
      htmlTitle.innerHTML = 'Devlog';
    };
  }, []);
  useEffect(() => {
    dispatch(listPost(location.search));
  }, [dispatch, location.search]);
  useEffect(() => {
    if (location.pathname === '/blog/list/tags') {
      setPage(0);
      history.push('/blog/list');
    }
    if (location.pathname === '/blog/list/series') {
      setPage(2);
      history.push('/blog/list');
    }
  }, [location.pathname, history]);

  const [page, setPage] = useState(1);

  if (error) {
    return <Error />;
  }
  if (loading) {
    return <Loading />;
  }
  return (
    <>
      {page === 0 ? (
        <TagList tags={tags} location={location} setPage={setPage} />
      ) : page === 1 ? (
        <PostList
          posts={posts}
          postCount={postCount}
          location={location}
          user={user}
          setPage={setPage}
        />
      ) : (
        <SeriesList series={series} setPage={setPage} />
      )}
    </>
  );
};

export default List;
