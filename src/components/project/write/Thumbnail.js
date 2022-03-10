import React from 'react';
import { useDispatch } from 'react-redux';
import { AiOutlineFolder } from 'react-icons/ai';
import styled from 'styled-components';
import axios from 'axios';
import { changeField } from 'modules/projects/writeProjects';

const Wrapper = styled.div`
  width: 100%;
  max-width: 450px;
  aspect-ratio: 16 / 9;
`;
const ImageWrapper = styled.div`
  width: 100%;
  aspect-ratio: 16 / 9;
`;
const Image = styled.img`
  width: 100%;
  height: 100%;
  aspect-ratio: 16 / 9;
  object-fit: cover;
`;

const Text = styled.div`
  width: calc(100% - 82px);
  max-width: 450px;
  height: 48px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  padding: 0px min(150px, calc(50% - 116px));
  position: absolute;
  background: #000000b8;
  margin-top: -49px;
  color: white;
  font-size: 25px;
  font-family: 'Ubuntu', sans-serif;
  cursor: pointer;
`;
const InputWrapper = styled.div`
  width: calc(100% - 82px);
  max-width: 450px;
  height: 48px;
  position: absolute;
  margin-top: -49px;
  margin-left: 0;
`;
const Input = styled.input`
  width: 100%;
  height: 100%;
  outline: none;
  opacity: 0;
  cursor: pointer;
  &::-webkit-file-upload-button {
    cursor: pointer;
  }
`;

const Thumbnail = ({ thumbnail }) => {
  const dispatch = useDispatch();

  const onChange = async (e) => {
    const thumbnailImage = e.target.files[0];
    const formData = new FormData();
    formData.append('image', thumbnailImage);
    await axios
      .post(process.env.REACT_APP_API_IMAGE, formData, {
        withCredentials: true,
      })
      .then((response) => {
        dispatch(changeField({ key: 'thumbnail', value: response.data }));
      })
      .catch((error) => {
        alert('이미지 업로드 실패');
      });
  };

  return (
    <Wrapper>
      <ImageWrapper>
        <Image
          src={
            thumbnail === ''
              ? '/images/Project/Default.png'
              : `${process.env.REACT_APP_API_IMAGE}/${thumbnail}`
          }
          alt="thumbnail"
        />
      </ImageWrapper>
      <Text>
        <AiOutlineFolder />
        Upload
      </Text>
      <InputWrapper>
        <Input type="file" onChange={onChange} />
      </InputWrapper>
    </Wrapper>
  );
};

export default Thumbnail;
