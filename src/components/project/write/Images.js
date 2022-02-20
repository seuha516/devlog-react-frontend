import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import styled from 'styled-components';
import { BsImages } from 'react-icons/bs';
import { RiImageAddLine } from 'react-icons/ri';
import { changeField } from 'modules/projects/writeProjects';

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
  margin-top: 30px;
`;
const Title = styled(FlexRow)`
  width: 100%;
  margin-bottom: 30px;
  font-size: 30px;
  font-family: 'Noto Sans KR', sans-serif;
  svg {
    width: 45px;
    height: 45px;
    margin: 7px 15px 0 0;
  }
`;
const Gallery = styled(FlexRow)`
  flex-wrap: wrap;
  background: transparent;
`;
const Image = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  margin: 5px;
  cursor: pointer;
  &:hover {
    filter: contrast(20%);
  }
`;
const Button = styled(FlexRow)`
  width: 100px;
  height: 40px;
  margin-top: 20px;
  background: #202020;
  color: white;
  transition: all 0.3s ease-in-out;
  svg {
    width: 25px;
    height: 25px;
    margin-right: 10px;
  }
  &:hover > svg {
    animation: turn 1s ease-in-out;
  }
  &:hover {
    background-color: #3a3a3a;
  }
  @keyframes turn {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(359deg);
    }
  }
`;
const InputWrapper = styled.div`
  width: 100px;
  height: 40px;
  position: absolute;
  margin-top: 0;
  margin-left: 0;
  background: transparent;
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

const Images = () => {
  const dispatch = useDispatch();
  const images = useSelector((store) => store.writeProjects.images);
  const [localImages, setLocalImages] = useState(images);

  const addImage = (id) => {
    const newImages = [...localImages, id];
    setLocalImages(newImages);
  };
  const removeImage = (id) => {
    const newImages = localImages.filter((image) => image !== id);
    setLocalImages(newImages);
  };
  useEffect(() => {
    dispatch(changeField({ key: 'images', value: localImages }));
  }, [dispatch, localImages]);

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
        addImage(response.data);
      })
      .catch((error) => {
        alert('이미지 업로드 실패');
        console.error(error);
      });
    loading.current = false;
  };

  return (
    <Wrapper>
      <Title>
        <BsImages /> Images
      </Title>
      <Gallery>
        {images.map((item) => (
          <Image
            key={item}
            src={`${process.env.REACT_APP_API_URL}/get/${item}`}
            alt="projectImage"
            onClick={() => removeImage(item)}
          />
        ))}
      </Gallery>
      <Button>
        <RiImageAddLine /> Add
        <InputWrapper>
          <Input type="file" onChange={onChange} />
        </InputWrapper>
      </Button>
    </Wrapper>
  );
};

export default Images;
