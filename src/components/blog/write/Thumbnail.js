import React from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { changeField } from 'modules/blog/writeBlog';

const FlexBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`;
const Wrapper = styled(FlexBox)`
  flex-direction: column;
  align-items: flex-start;
  margin: 20px 0;
`;
const Text = styled.div`
  font-weight: 600;
  color: #808080;
  margin-bottom: 10px;
`;
const ImageWrapper = styled(FlexBox)`
  width: 100px;
  height: 100px;
  background-color: white;
  margin-right: 15px;
  box-shadow: 2px 2px 2px black;
`;
const Image = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
`;
const Input = styled.input`
  width: 75px;
`;

const Thumbnail = () => {
  const dispatch = useDispatch();
  const thumbnail = useSelector((store) => store.writeBlog.thumbnail);

  const onChange = async (e) => {
    const thumbnailImage = e.target.files[0];
    const formData = new FormData();
    formData.append('image', thumbnailImage);
    await axios
      .post(`${process.env.REACT_APP_API_URL}/upload`, formData, {
        withCredentials: true,
      })
      .then((response) => {
        console.log(response.data);
        dispatch(changeField({ key: 'thumbnail', value: response.data }));
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <Wrapper>
      <Text>썸네일</Text>
      <FlexBox>
        <ImageWrapper>
          <Image
            src={
              thumbnail === ''
                ? '/images/Project/Default.png'
                : `${process.env.REACT_APP_API_URL}/get/${thumbnail}`
            }
            alt="thumbnail"
          />
        </ImageWrapper>
        <Input type="file" onChange={onChange} />
      </FlexBox>
    </Wrapper>
  );
};

export default Thumbnail;
