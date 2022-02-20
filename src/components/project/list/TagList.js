import React from 'react';
import styled from 'styled-components';

import TagInfo from 'components/project/list/tags/TagInfo';
import TagMovePage from 'components/project/list/tags/TagMovePage';
import Tags from 'components/project/list/tags/Tags';

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  animation: appear 0.3s ease-out;
  -ms-user-select: none;
  -moz-user-select: -moz-none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  user-select: none;
  @keyframes appear {
    from {
      opacity: 0;
      margin-top: 60px;
    }
    to {
      opacity: 1;
      margin-top: 0px;
    }
  }
`;

const TagList = ({ tags, location, setPage }) => {
  return (
    <Wrapper>
      <TagInfo tagCount={tags.length} />
      <TagMovePage setPage={setPage} />
      <Tags tags={tags} location={location} setPage={setPage} />
    </Wrapper>
  );
};

export default TagList;
