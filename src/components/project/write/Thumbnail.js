import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import styled from 'styled-components';
import { AiOutlineFolder } from 'react-icons/ai';
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

const Thumbnail = () => {
  const dispatch = useDispatch();
  const thumbnail = useSelector((store) => store.writeProjects.thumbnail);

  const loading = useRef(false);
  const onChange = async (e) => {
    if (loading.current) {
      alert('업로드중입니다.');
      return;
    }
    loading.current = true;
    console.log('이미지 업로드 시작');
    const thumbnailImage = e.target.files[0];
    const formData = new FormData();
    formData.append('image', thumbnailImage);
    await axios
      .post(`${process.env.REACT_APP_API_URL}/upload`, formData, {
        withCredentials: true,
      })
      .then((response) => {
        console.log(`이미지 업로드 완료, ID: ${response.data}`);
        dispatch(changeField({ key: 'thumbnail', value: response.data }));
      })
      .catch((error) => {
        alert('이미지 업로드 실패');
        console.error(error);
      });
    loading.current = false;
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
