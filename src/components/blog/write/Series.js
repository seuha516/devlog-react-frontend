import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { AiOutlineReload } from 'react-icons/ai';
import { BiCodeAlt } from 'react-icons/bi';
import { BsBook } from 'react-icons/bs';
import { changeField } from 'modules/blog/writeBlog';
import { getlistPost } from 'modules/blog/getlistBlog';
import LoadingComponent from 'components/utils/LoadingComponent';

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
  margin-bottom: 10px;
`;
const Select = styled.select`
  height: 30px;
  margin: 10px;
  padding: 5px;
`;
const Input = styled.input`
  height: 30px;
  margin: 10px;
  padding: 5px;
  text-align: center;
`;

const Series = () => {
  const dispatch = useDispatch();
  const series = useSelector((store) => store.writeBlog.series);
  const getlist = useSelector((store) => store.getlistBlog);
  const loading = useSelector(
    (store) => store.loading['getlistBlog/GETLIST_POST'],
  );

  const [state, setState] = useState(series);
  const [newseries, setNewseries] = useState(false);

  const onChangeProject = (e) => {
    const name = e.target.value === 'None' ? '' : e.target.value;
    let id = '';
    for (let i = 0; i < getlist.titles.length; i++) {
      if (getlist.titles[i].title === name) {
        id = getlist.titles[i]._id;
        break;
      }
    }
    setState({
      ...state,
      project: {
        name,
        id,
      },
    });
  };
  const onChangeSeries = (e) => {
    if (e.target.value === 'New Series') {
      setNewseries(true);
      setState({
        ...state,
        name: '',
      });
    } else {
      setNewseries(false);
      if (e.target.value === 'None') {
        setState({
          ...state,
          name: '',
        });
      } else {
        setState({
          ...state,
          name: e.target.value,
        });
      }
    }
  };
  const onChangeInput = (e) => {
    setState({
      ...state,
      name: e.target.value,
    });
  };

  useEffect(() => {
    dispatch(changeField({ key: 'series', value: state }));
  }, [state, dispatch]);

  useEffect(() => {
    dispatch(getlistPost());
  }, [dispatch]);

  return (
    <Wrapper>
      <Text>시리즈</Text>
      <FlexRow>
        {loading ? (
          <div style={{ width: '50px', height: '50px', margin: '10px' }}>
            <LoadingComponent />
          </div>
        ) : getlist.error ? (
          <FlexRow>
            <div style={{ margin: '10px' }}>Error</div>
            <AiOutlineReload
              style={{ cursor: 'pointer' }}
              onClick={() => dispatch(getlistPost())}
            />
          </FlexRow>
        ) : (
          <>
            <BiCodeAlt
              style={{ width: '30px', height: '30px', marginRight: '5px' }}
            />
            <Select
              defaultValue={series.project.name}
              onChange={onChangeProject}
            >
              {getlist.titles && (
                <>
                  <option>None</option>
                  {getlist.titles.map((title) => (
                    <option key={title._id}>{title.title}</option>
                  ))}
                </>
              )}
            </Select>
          </>
        )}
      </FlexRow>
      <FlexRow>
        {loading ? (
          <div style={{ width: '50px', height: '50px', margin: '10px' }}>
            <LoadingComponent />
          </div>
        ) : getlist.error ? (
          <FlexRow>
            <div style={{ margin: '10px' }}>Error</div>
            <AiOutlineReload
              style={{ cursor: 'pointer' }}
              onClick={() => dispatch(getlistPost())}
            />
          </FlexRow>
        ) : (
          <>
            <BsBook
              style={{ width: '30px', height: '30px', marginRight: '5px' }}
            />
            {newseries && <Input onChange={onChangeInput} />}
            <Select defaultValue={series.name} onChange={onChangeSeries}>
              {getlist.series && (
                <>
                  <option>None</option>
                  <option>New Series</option>
                  {getlist.series.map((series) => (
                    <option key={series}>{series}</option>
                  ))}
                </>
              )}
            </Select>
          </>
        )}
      </FlexRow>
    </Wrapper>
  );
};

export default Series;
