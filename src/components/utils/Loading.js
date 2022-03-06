import React from 'react';
import styled from 'styled-components';

const FlexBox = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const LoadingComponent = styled.div`
  width: ${(props) => props.r};
  height: ${(props) => props.r};
  border: 3px solid #ff3f3f;
  border-top-color: white;
  border-right-color: white;
  border-radius: 100%;
  -ms-user-select: none;
  -moz-user-select: -moz-none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  user-select: none;
  animation: spin 1s infinite linear;
  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(359deg);
    }
  }
`;

const Loading = ({ r }) => {
  return (
    <FlexBox>
      <LoadingComponent r={r ? r : '80px'} />
    </FlexBox>
  );
};

export default Loading;
