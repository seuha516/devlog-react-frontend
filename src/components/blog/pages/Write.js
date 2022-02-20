import React, { useEffect } from 'react';
import styled from 'styled-components';

import Editor from '../write/Editor';
import Thumbnail from '../write/Thumbnail';
import TagBox from '../write/TagBox';
import WriteButtons from '../write/WriteButtons';
import Series from '../write/Series';

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
`;

const Write = () => {
  useEffect(() => {
    const htmlTitle = document.querySelector('title');
    htmlTitle.innerHTML = 'Post Write';
    return () => {
      htmlTitle.innerHTML = 'Devlog';
    };
  }, []);
  return (
    <WriteWrapper>
      <Editor />
      <Thumbnail />
      <Series />
      <TagBox />
      <WriteButtons />
    </WriteWrapper>
  );
};

export default Write;