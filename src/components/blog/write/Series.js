import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AiOutlineReload } from 'react-icons/ai';
import { BiCodeAlt } from 'react-icons/bi';
import { BsBook } from 'react-icons/bs';
import styled from 'styled-components';

import Loading from 'components/utils/Loading';
import { changeField } from 'modules/blog/writeBlog';
import { catalogPost } from 'modules/blog/catalogBlog';

const FlexRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;
const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  margin: 20px 0;
`;
const Text = styled.div`
  font-weight: 600;
  color: #808080;
  margin-bottom: 5px;
`;
const Select = styled.select`
  min-width: 150px;
  height: 30px;
  margin: 10px;
  padding: 5px;
`;
const Input = styled.input`
  height: 30px;
  margin: 10px;
  padding: 5px;
`;

const Series = () => {
  const { series, project, catalog, loading } = useSelector(
    ({ writeBlog, catalogBlog, loading }) => ({
      series: writeBlog.series,
      project: writeBlog.project,
      catalog: catalogBlog,
      loading: loading['catalogBlog/CATALOG_POST'],
    }),
  );
  const dispatch = useDispatch();
  const [newSeries, setNewSeries] = useState(false);

  const onChangeProject = (e) => {
    const name = e.target.value === 'None' ? '' : e.target.value;
    dispatch(changeField({ key: 'project', value: name }));
  };
  const onChangeSeries = (e) => {
    if (e.target.value === 'New Series') {
      setNewSeries(true);
    } else {
      setNewSeries(false);
      if (e.target.value === 'None') {
        dispatch(changeField({ key: 'series', value: '' }));
      } else {
        dispatch(changeField({ key: 'series', value: e.target.value }));
      }
    }
  };

  return (
    <Wrapper>
      <Text>카테고리</Text>
      <FlexRow>
        {loading ? (
          <div style={{ width: '50px', height: '50px', margin: '10px' }}>
            <Loading r="30px" />
          </div>
        ) : catalog.error ? (
          <FlexRow>
            <div style={{ margin: '10px' }}>Error</div>
            <AiOutlineReload
              style={{ cursor: 'pointer' }}
              onClick={() => dispatch(catalogPost())}
            />
          </FlexRow>
        ) : (
          <>
            <BiCodeAlt style={{ width: '30px', height: '30px', marginRight: '5px' }} />
            <Select defaultValue={project} onChange={onChangeProject}>
              <option>None</option>
              {catalog.titles && catalog.titles.map((i) => <option key={i._id}>{i.title}</option>)}
            </Select>
          </>
        )}
      </FlexRow>
      <FlexRow>
        {loading ? (
          <div style={{ width: '50px', height: '50px', margin: '10px' }}>
            <Loading r="30px" />
          </div>
        ) : catalog.error ? (
          <FlexRow>
            <div style={{ margin: '10px' }}>Error</div>
            <AiOutlineReload
              style={{ cursor: 'pointer' }}
              onClick={() => dispatch(catalogPost())}
            />
          </FlexRow>
        ) : (
          <>
            <BsBook style={{ width: '30px', height: '30px', marginRight: '5px' }} />
            {newSeries && (
              <Input
                onChange={(e) => dispatch(changeField({ key: 'series', value: e.target.value }))}
              />
            )}
            <Select defaultValue={series} onChange={onChangeSeries}>
              <option>None</option>
              <option>New Series</option>
              {catalog.series && catalog.series.map((i) => <option key={i}>{i}</option>)}
            </Select>
          </>
        )}
      </FlexRow>
    </Wrapper>
  );
};

export default Series;
