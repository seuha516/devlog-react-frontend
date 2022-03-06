import React, { useState } from 'react';
import styled from 'styled-components';
import { BsImages } from 'react-icons/bs';

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
  margin-bottom: 20px;
`;
const Title = styled(FlexRow)`
  width: 100%;
  flex-wrap: wrap;
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
`;
const Image = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  margin: 5px;
  cursor: pointer;
  &:hover {
    filter: contrast(80%);
  }
`;
const PopupBackground = styled(FlexRow)`
  position: fixed;
  top: 0;
  width: 100vw;
  height: 100vh;
  z-index: 250;
  background-color: #000000ca;
  cursor: pointer;
`;
const PopupImage = styled.img`
  max-width: 80vmin;
  max-height: 80vmin;
  z-index: 251;
`;

const Images = ({ images }) => {
  const [state, setState] = useState(null);
  const onClick = (item) => {
    setState(state ? null : item);
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
            src={`${process.env.REACT_APP_API_IMAGE}/${item}`}
            alt="projectImage"
            onClick={() => {
              onClick(item);
            }}
          />
        ))}
      </Gallery>
      {state && (
        <PopupBackground onClick={() => setState(null)}>
          <PopupImage
            src={`${process.env.REACT_APP_API_IMAGE}/${state}`}
            alt="PopupImage"
          />
        </PopupBackground>
      )}
    </Wrapper>
  );
};

export default Images;
