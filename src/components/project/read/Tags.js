import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { IoIosPricetags } from 'react-icons/io';

const FlexRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;
const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const Wrapper = styled(FlexColumn)`
  width: 100%;
  max-width: 700px;
  margin-top: 40px;
`;
const Title = styled(FlexRow)`
  width: 100%;
  height: 65px;
  font-size: 30px;
  font-family: 'Noto Sans KR', sans-serif;
  svg {
    width: 35px;
    height: 35px;
    margin: 10px 10px 0 0;
  }
`;
const TagBox = styled(FlexRow)`
  width: 100%;
  padding: 15px 10px;
  flex-wrap: wrap;
  font-size: 20px;
  line-height: 22.5px;
  background-color: #363636;
`;
const Tag = styled(Link)`
  font-size: 18px;
  cursor: pointer;
  margin: 7.5px;
`;

const Tags = ({ tags }) => {
  return (
    <Wrapper>
      <Title>
        <IoIosPricetags /> Tags
      </Title>
      <TagBox>
        {tags.map((tag) => (
          <Tag
            key={tag.tag}
            style={{ color: tag.color }}
            to={`/project/list?tag=${tag.tag}`}
          >
            {`#${tag.tag}`}
          </Tag>
        ))}
      </TagBox>
    </Wrapper>
  );
};

export default Tags;
