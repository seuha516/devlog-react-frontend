import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AiOutlineReload } from 'react-icons/ai';
import { BiCodeAlt } from 'react-icons/bi';
import { BsBook } from 'react-icons/bs';
import styled from 'styled-components';

import Loading from 'components/utils/Loading';
import { changeField, catalogPost } from 'modules/blog/writeBlog';

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
  margin: 20px 0 35px 0;
`;
const Text = styled.div`
  font-weight: 600;
  color: #808080;
  margin-bottom: 5px;
  -ms-user-select: none;
  -moz-user-select: -moz-none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  user-select: none;
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

const Series = ({ series, project, titleList, seriesList, catalogLoading, catalogError }) => {
  const dispatch = useDispatch();
  const [newSeries, setNewSeries] = useState(false);

  const onChangeProject = (e) => {
    dispatch(changeField({ key: 'project', value: e.target.value === 'None' ? '' : e.target.value }));
  };
  const onChangeSeries = (e) => {
    if (e.target.value === 'New Series') {
      setNewSeries(true);
      dispatch(changeField({ key: 'series', value: '' }));
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
        {catalogLoading ? (
          <div style={{ width: '50px', height: '50px', margin: '10px' }}>
            <Loading r="30px" />
          </div>
        ) : catalogError ? (
          <FlexRow>
            <div style={{ margin: '10px' }}>Error</div>
            <AiOutlineReload style={{ cursor: 'pointer' }} onClick={() => dispatch(catalogPost())} />
          </FlexRow>
        ) : (
          <>
            <BiCodeAlt style={{ width: '30px', height: '30px', marginRight: '5px' }} />
            <Select defaultValue={project} onChange={onChangeProject}>
              <option>None</option>
              {titleList && titleList.map((i) => <option key={i}>{i}</option>)}
            </Select>
          </>
        )}
      </FlexRow>
      <FlexRow>
        {catalogLoading ? (
          <div style={{ width: '50px', height: '50px', margin: '10px' }}>
            <Loading r="30px" />
          </div>
        ) : catalogError ? (
          <FlexRow>
            <div style={{ margin: '10px' }}>Error</div>
            <AiOutlineReload style={{ cursor: 'pointer' }} onClick={() => dispatch(catalogPost())} />
          </FlexRow>
        ) : (
          <>
            <BsBook style={{ width: '30px', height: '30px', marginRight: '5px' }} />
            {newSeries && <Input onChange={(e) => dispatch(changeField({ key: 'series', value: e.target.value }))} />}
            <Select defaultValue={series} onChange={onChangeSeries}>
              <option>None</option>
              <option>New Series</option>
              {seriesList && seriesList.map((i) => <option key={i}>{i}</option>)}
            </Select>
          </>
        )}
      </FlexRow>
    </Wrapper>
  );
};

export default Series;
