import React, { useEffect, useReducer } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { login } from 'modules/user';
import Loading from 'components/utils/Loading';

const Background = styled.div`
  width: 100%;
  height: 100%;
  min-height: calc(100vh - 62px);
  display: flex;
  justify-content: center;
  align-items: center;
  background: #232323;
  background-image: url('/images/Common/Background6.png');
  padding: 35px 0;
`;
const LoginWrapper = styled.form`
  width: min(100%, 360px);
  min-height: 480px;
  background-color: #000000b2;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  padding: 0 15px;
`;
const LoginText = styled.div`
  text-align: center;
  font-size: 42.5px;
  font-family: 'Zen Dots', cursive;
  line-height: 60px;
  color: #fdfdfde6;
`;
const LoginInputWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
`;
const LoginInput = styled.input`
  width: min(100%, 300px);
  height: 60px;
  font-size: 25px;
  padding: 10px 20px;
  outline: none;
  background: #000000ba;
  border: 3px solid #242424;
  transition: 0.3s all linear;
  color: white;
  &:focus {
    background-color: black;
  }
`;
const LoginButton = styled.button`
  width: 120px;
  height: 50px;
  font-size: 20px;
  font-family: 'Josefin Sans', sans-serif;
  color: #cecece;
  background-color: #000000bf;
  outline: none;
  cursor: pointer;
  transition: 0.3s all linear;
  &:hover {
    background-color: #63636382;
  }
`;

const reducer = (state, action) => ({ ...state, [action.name]: action.value });

const Login = ({ history }) => {
  const dispatch = useDispatch();
  const { user, loading } = useSelector(
    ({ user, loading }) => ({
      user: user.user,
      loading: loading['user/LOGIN'],
    }),
    shallowEqual,
  );
  const [state, stateDispatch] = useReducer(reducer, {
    username: '',
    password: '',
  });
  const onChange = (e) => stateDispatch(e.target);
  const onSubmit = (e) => {
    e.preventDefault();
    if (state.username === '' || state.password === '') {
      alert('빈 칸을 채워주세요.');
      return;
    }
    dispatch(login(state));
  };
  useEffect(() => {
    const htmlTitle = document.querySelector('title');
    htmlTitle.innerHTML = 'Devlog - Login';
    return () => {
      htmlTitle.innerHTML = 'Devlog';
    };
  }, []);
  useEffect(() => {
    if (user) {
      history.push('/');
      try {
        localStorage.setItem('user', JSON.stringify(user));
      } catch (e) {
        console.log('localStorage is not working');
      }
    }
  }, [history, user]);
  return (
    <Background>
      {loading ? (
        <Loading />
      ) : (
        <LoginWrapper onSubmit={onSubmit}>
          <LoginText>
            Devlog
            <br />
            Admin Login
          </LoginText>
          <LoginInputWrapper>
            <LoginInput type="text" name="username" value={state.username} placeholder="ID" onChange={onChange} />
            <LoginInput type="password" name="password" value={state.password} placeholder="Password" onChange={onChange} />
          </LoginInputWrapper>
          <LoginButton onClick={onSubmit}>Login</LoginButton>
        </LoginWrapper>
      )}
    </Background>
  );
};

export default Login;
