import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import { BsFillPersonCheckFill } from 'react-icons/bs';
import { logout } from 'modules/user';

const FlexRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;
//헤더
const HeaderWrapper = styled(FlexRow)`
  position: fixed;
  width: 100%;
  height: 62px;
  background-color: black;
  color: white;
  border-bottom: 2px solid #a5a5a58a;
  z-index: 103;
  -ms-user-select: none;
  -moz-user-select: -moz-none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  user-select: none;
`;
//타이틀 부분
const TitleWrapper = styled(FlexRow)`
  height: 60px;
`;
const TitleIcon = styled.img`
  height: 55px;
  margin: 3px 5px 2px 5px;
`;
const TitleText = styled(FlexColumn)`
  height: 45px;
  margin-bottom: 1.5px;
  align-items: flex-start;
`;
const Devlog = styled(Link)`
  font-size: 30px;
  font-family: 'Roboto Slab', serif;
`;
const SeungHa = styled(Link)`
  font-size: 12px;
  font-family: 'Merriweather', serif;
  color: #ffffffbf;
  margin-left: 2px;
`;
const UserIcon = styled(BsFillPersonCheckFill)`
  width: 30px;
  height: 60px;
  color: #39b365;
  margin: 0px 10px;
  cursor: pointer;
  transition: all 0.2s linear;
  &:hover {
    color: #ff5a5a;
  }
`;
//카테고리
const CategoryWrapper = styled(FlexRow)`
  width: 60%;
  justify-content: space-evenly;
  margin-top: 3px;
  @media all and (max-width: 445px) {
    display: none;
  }
`;
const Category = styled(NavLink)`
  font-size: 20px;
  font-weight: 600;
  font-family: 'Carrois Gothic SC', sans-serif;
  transition: all 0.2s linear;
  &.active {
    color: #fffbbf;
    margin-top: 6px;
    padding-bottom: 5px;
    border-bottom: 2px solid #fffbbf;
  }
  &:hover {
    color: #fffbbf;
  }
`;
//가짜헤더
const FakeHeader = styled.div`
  width: 100%;
  height: 62px;
`;
//메뉴
const NavbarIcon = styled.img`
  width: 55px;
  height: 55px;
  position: fixed;
  display: none;
  top: 2.5px;
  left: calc(100% - 55px);
  cursor: pointer;
  transition: all 0.2s linear;
  z-index: 110;
  transform: rotateY(
    ${(props) => (props.state === 'open' ? '0deg' : '180deg')}
  );
  filter: invert(100%);
  -ms-user-select: none;
  -moz-user-select: -moz-none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  user-select: none;
  @media all and (max-width: 445px) {
    display: block;
  }
`;
const Navbar = styled(FlexColumn)`
  width: 160px;
  height: 100vh;
  position: fixed;
  display: none;
  justify-content: flex-start;
  background: #000000ed;
  padding: 100px 0px;
  top: 0;
  right: ${(props) => (props.state === 'open' ? '0' : '-160px')};
  z-index: 107;
  transition: right 0.1s linear;
  -ms-user-select: none;
  -moz-user-select: -moz-none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  user-select: none;
  @media all and (max-width: 445px) {
    display: flex;
  }
`;
const NavbarCategory = styled(NavLink)`
  font-size: 27px;
  font-weight: 600;
  font-family: 'Carrois Gothic SC', sans-serif;
  color: #c4c4c4;
  text-shadow: 2px 2px 2px black;
  transition: all 0.2s linear;
  margin: 0px 12.5px 50px 0px;
  &.active {
    color: #fffbbf;
  }
`;
const NavbarOutside = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  display: none;
  top: 0px;
  left: 0px;
  background: #ffffff00;
  z-index: 105;
  @media all and (max-width: 445px) {
    display: ${(props) => (props.state === 'open' ? 'block' : 'none')};
  }
`;

//카테고리 목록
const Categories = [
  {
    text: 'About',
    to: '/about',
  },
  {
    text: 'Project',
    to: '/project',
  },
  {
    text: 'Blog',
    to: '/blog',
  },
];

const Header = () => {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user.user);

  const onLogout = () => {
    if (window.confirm('정말 로그아웃하시겠습니까?')) {
      dispatch(logout());
    }
  };

  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return <HeaderComponent user={user} onLogout={onLogout} />;
};
const HeaderComponent = ({ user, onLogout }) => {
  return (
    <>
      <HeaderBlock user={user} onLogout={onLogout} />
      <FakeHeader />
      <NavbarBlock user={user} onLogout={onLogout} />
    </>
  );
};
const HeaderBlock = ({ user, onLogout }) => {
  return (
    <HeaderWrapper>
      <TitleBlock user={user} onLogout={onLogout} />
      <CategoryBlock />
    </HeaderWrapper>
  );
};
const TitleBlock = ({ user, onLogout }) => {
  return (
    <TitleWrapper>
      <Link to="/" style={{ height: '60px' }}>
        <TitleIcon src="/images/Header/Main.png" />
      </Link>
      <TitleText>
        <Devlog to="/">Devlog</Devlog>
        <SeungHa to="/">SeungHa Jeon</SeungHa>
      </TitleText>
      {user && <UserIcon onClick={onLogout} />}
    </TitleWrapper>
  );
};
const CategoryBlock = () => {
  return (
    <CategoryWrapper>
      {Categories.map((c) => (
        <Category key={c.text} to={c.to} activeClassName="active">
          {c.text}
        </Category>
      ))}
    </CategoryWrapper>
  );
};
const NavbarBlock = () => {
  const [state, setState] = useState('close');
  const onClick = () => setState(state === 'close' ? 'open' : 'close');

  return (
    <>
      <NavbarIcon
        src="/images/Header/Navbar.png"
        state={state}
        onClick={onClick}
      />
      <Navbar state={state}>
        {Categories.map((c) => (
          <NavbarCategory
            key={c.text}
            to={c.to}
            activeClassName="active"
            onClick={onClick}
          >
            {c.text}
          </NavbarCategory>
        ))}
      </Navbar>
      <NavbarOutside state={state} onClick={onClick} />
    </>
  );
};

export default Header;
