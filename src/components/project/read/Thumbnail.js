import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: 100%;
  max-width: 640px;
  aspect-ratio: 16 / 9;
`;
const Image = styled.img`
  width: 100%;
  height: 100%;
  aspect-ratio: 16 / 9;
  object-fit: cover;
`;

const Thumbnail = ({ thumbnail }) => {
  return (
    <Wrapper>
      <Image
        src={
          thumbnail === ''
            ? '/images/Project/Default.png'
            : `${process.env.REACT_APP_API_URL}/get/${thumbnail}`
        }
        alt="thumbnail"
      />
    </Wrapper>
  );
};

export default Thumbnail;
