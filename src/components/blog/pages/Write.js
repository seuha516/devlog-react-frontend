import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import Editor from '../write/Editor';
import Thumbnail from '../write/Thumbnail';
import Series from '../write/Series';
import TagBox from '../write/TagBox';
import WriteButtons from '../write/WriteButtons';
import { catalogPost, initWritePost } from 'modules/blog/writeBlog';

const WriteWrapper = styled.div`
  width: 100%;
  max-width: 1000px;
  margin: 20px 0px;
  padding: 30px 20px;
  background-color: white;
  overflow: hidden;
  ul,
  ol {
    padding: 0;
  }
  li:not(.ql-direction-rtl)::before {
    width: 16px;
    padding: 0;
    margin-right: 8px;
  }
  @media all and (max-width: 700px) {
    padding: 30px 10px;
  }
`;

const Write = () => {
  const navigate = useNavigate();
  const { writeBlog, loading, catalogLoading, user } = useSelector(({ writeBlog, loading, user }) => ({
    writeBlog: writeBlog,
    loading: loading['writeBlog/WRITE_POST'] || loading['writeBlog/UPDATE_POST'],
    catalogLoading: loading['writeBlog/CATALOG_POST'],
    user: user.user,
  }));
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(catalogPost());
    const htmlTitle = document.querySelector('title');
    htmlTitle.innerHTML = 'Post Write';
    return () => {
      dispatch(initWritePost());
      htmlTitle.innerHTML = 'Devlog';
    };
  }, [dispatch]);
  useEffect(() => {
    if (!user) {
      navigate(`/blog/list`);
    }
    if (writeBlog.post) {
      navigate(`/blog/read/${writeBlog.post._id}`);
    }
  }, [navigate, writeBlog.post, user]);

  return (
    <WriteWrapper>
      <Editor title={writeBlog.title} subTitle={writeBlog.subTitle} body={writeBlog.body} />
      <Thumbnail thumbnail={writeBlog.thumbnail} />
      <TagBox tags={writeBlog.tags} tagList={writeBlog.catalog.tags} />
      <Series
        series={writeBlog.series}
        project={writeBlog.project}
        titleList={writeBlog.catalog.titles}
        seriesList={writeBlog.catalog.series}
        catalogLoading={catalogLoading}
        catalogError={writeBlog.catalogError}
      />
      <WriteButtons writeBlog={writeBlog} loading={loading} />
    </WriteWrapper>
  );
};

export default Write;
