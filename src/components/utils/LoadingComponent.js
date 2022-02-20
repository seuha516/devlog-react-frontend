import React from 'react';
import styled from 'styled-components';

const Loading = styled.div`
  width: 100%;
  height: 100%;
  max-width: 75px;
  max-height: 75px;
  border: 5px solid #ff3f3f;
  border-top-color: white;
  border-right-color: white;
  border-radius: 100%;
  animation: spin 1s infinite linear;
  -ms-user-select: none;
  -moz-user-select: -moz-none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  user-select: none;
  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(359deg);
    }
  }
`;

const LoadingComponent = () => {
  return <Loading />;
};

export default LoadingComponent;
