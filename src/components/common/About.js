import React, { useState, useRef, useEffect } from 'react';
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from 'react-icons/md';
import styled from 'styled-components';

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
const Background = styled.div`
  width: 100%;
  height: 100%;
  min-height: calc(100vh - 62px);
  display: flex;
  justify-content: center;
  background: #232323;
  background-image: url('/images/Common/Background2.jpg');
`;
const Wrapper = styled(FlexColumn)`
  width: min(100%, 1200px);
  height: 100%;
  margin-top: 50px;
  padding: 0px 20px;
  @media all and (max-width: 700px) {
    padding: 0px 10px;
  }
`;
const BackgroundWrapper = styled(FlexColumn)`
  width: 100%;
  justify-content: flex-start;
  align-items: flex-start;
  margin-bottom: 50px;
  box-shadow: 2px 2px 3px 2px black;
  -ms-user-select: none;
  -moz-user-select: -moz-none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  user-select: none;
`;
const BackgroundImg = styled.img`
  width: calc(min(100%, 1200px) - 40px);
  height: 400px;
  position: absolute;
  object-fit: cover;
  object-position: 50% ${(props) => props.defaultY};
  z-index: ${(props) => props.zIndex};
  @media all and (max-width: 700px) {
    width: calc(min(100%, 1200px) - 20px);
  }
`;
const FakeImg = styled.div`
  width: 100px;
  height: 400px;
`;
const NextButton = styled(FlexRow)`
  width: clamp(30px, 9vw, 60px);
  height: clamp(50px, 15vw, 100px);
  background-color: #000000c4;
  color: white;
  position: absolute;
  margin-top: clamp(150px, calc(200px - 7.5vw), 175px);
  margin-left: ${(props) =>
    props.position === 'left' ? '0' : 'calc(min(100%, 1200px) - 40px - clamp(30px, 9vw, 60px))'};
  z-index: 20;
  cursor: pointer;
  svg {
    width: 50px;
    height: 50px;
  }
  @media all and (max-width: 700px) {
    margin-left: ${(props) =>
      props.position === 'left' ? '0' : 'calc(min(100%, 1200px) - 20px - clamp(30px, 9vw, 60px))'};
  }
`;
const TextWrapper = styled.div`
  width: 100%;
  color: #e0e0e0;
  background-color: #101010;
`;
const Text = styled.div`
  font-family: 'Lora', serif;
  font-size: 40px;
  line-height: 60px;
  align-self: flex-start;
  margin: 30px;
`;
const InfoWrapper = styled(FlexRow)`
  width: 100%;
  height: 100%;
  margin-bottom: 50px;
  padding: 10px calc(25% - 150px);
  flex-wrap: wrap;
  justify-content: space-evenly;
  background-color: #e2e2e2ed;
  box-shadow: 2px 2px 3px 2px;
`;
const ProfileImage = styled.img`
  width: 250px;
  border-radius: 30px;
  margin: 30px 20px;
  box-shadow: 5px 5px 10px black;
  -ms-user-select: none;
  -moz-user-select: -moz-none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  user-select: none;
  @media all and (max-width: 350px) {
    width: 230px;
  }
`;
const InfoText = styled(FlexColumn)`
  width: 253px;
  height: 100%;
  margin: 25px 20px;
  color: black;
  align-items: flex-start;
`;
const Name = styled.div`
  font-family: 'Noto Serif KR', serif;
  font-size: 50px;
  margin-bottom: 35px;
`;
const Information = styled.div`
  font-size: 20px;
  font-family: 'Lato', sans-serif;
  line-height: 32px;
  @media all and (max-width: 335px) {
    letter-spacing: -0.3px;
    font-size: 18px;
  }
`;
const LinkWrapper = styled(FlexRow)`
  width: 100%;
  height: 100%;
  padding: 40px 20px;
  margin-bottom: 50px;
  flex-wrap: wrap;
  justify-content: space-evenly;
  background-color: #b1d1ffd4;
  box-shadow: 2px 2px 3px 2px;
  -ms-user-select: none;
  -moz-user-select: -moz-none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  user-select: none;
`;
const LinkIcon = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 100px;
  margin: 15px;
  box-shadow: 1px 1px 3px;
  transition: all 0.2s linear;
  cursor: pointer;
  &:hover {
    box-shadow: 3px 3px 7px;
  }
`;

const BackgroundImage = [
  { img: '/images/About/Back/Back1.jpg', y: '77.5%' },
  { img: '/images/About/Back/Back2.jpg', y: '62.5%' },
  { img: '/images/About/Back/Back3.jpg', y: '70%' },
  { img: '/images/About/Back/Back4.jpg', y: '40%' },
];
const LinkItem = [
  {
    img: '/images/About/Link/Github.png',
    link: 'https://github.com/seuha516',
  },
  {
    img: '/images/About/Link/Facebook.png',
    link: 'https://www.facebook.com/seuha516',
  },
  {
    img: '/images/About/Link/Instagram.png',
    link: 'https://www.instagram.com/jeon.seungha',
  },
  {
    img: '/images/About/Link/Boj.png',
    link: 'https://www.acmicpc.net/user/seuha516',
  },
  {
    img: '/images/About/Link/Solvedac.png',
    link: 'https://solved.ac/profile/seuha516',
  },
  {
    img: '/images/About/Link/Codeforce.png',
    link: 'https://codeforces.com/profile/seuha516',
  },
];

const About = () => {
  useEffect(() => {
    const htmlTitle = document.querySelector('title');
    htmlTitle.innerHTML = 'Devlog - About';
    return () => {
      htmlTitle.innerHTML = 'Devlog';
    };
  }, []);
  return (
    <Background>
      <Wrapper>
        <BackgroundBlock />
        <InfoBlock />
        <LinkBlock />
      </Wrapper>
    </Background>
  );
};
const BackgroundBlock = () => {
  const ImageLoading = useRef(null);
  const FrontImage = useRef(null);
  const [backgroundNumber, setBackgroundNumber] = useState([0, 0]);
  const NextPage = async (direction) => {
    if (ImageLoading.current) return;
    ImageLoading.current = true;
    const movePage = (page, add) => {
      return (page + add + BackgroundImage.length) % BackgroundImage.length;
    };
    const sleep = (t) => {
      return new Promise((resolve) => setTimeout(resolve, t));
    };
    const nextImage = movePage(backgroundNumber[1], direction);
    setBackgroundNumber([backgroundNumber[0], nextImage]);
    FrontImage.current.animate([{ opacity: 1 }, { opacity: 0 }], {
      duration: 500,
      easing: 'linear',
      fill: 'forwards',
    });
    await sleep(700);
    setBackgroundNumber([nextImage, nextImage]);
    if (FrontImage.current) FrontImage.current.opacity = 1;
    if (ImageLoading.current) ImageLoading.current = false;
  };
  return (
    <BackgroundWrapper>
      <BackgroundImg
        src={BackgroundImage[backgroundNumber[0]].img}
        alt="Background"
        defaultY={BackgroundImage[backgroundNumber[0]].y}
        zIndex="2"
        ref={FrontImage}
      />
      <BackgroundImg
        src={BackgroundImage[backgroundNumber[1]].img}
        alt="Background"
        defaultY={BackgroundImage[backgroundNumber[1]].y}
        zIndex="1"
      />
      <BackgroundImg style={{ display: 'none' }} src={BackgroundImage[2].img} alt="Background" />
      <BackgroundImg style={{ display: 'none' }} src={BackgroundImage[3].img} alt="Background" />
      <FakeImg />
      <NextButton position="left" onClick={() => NextPage(-1)}>
        <MdKeyboardArrowLeft />
      </NextButton>
      <NextButton position="right" onClick={() => NextPage(1)}>
        <MdKeyboardArrowRight />
      </NextButton>
      <TextWrapper>
        <Text>
          Hello!
          <br />
          I'm SeungHa Jeon.
        </Text>
      </TextWrapper>
    </BackgroundWrapper>
  );
};
const InfoBlock = () => {
  return (
    <InfoWrapper>
      <ProfileImage src={'/images/About/Profile/Profile1.jpg'} alt="Profile" />
      <InfoText>
        <Name>전승하</Name>
        <Information>
          {`🏫 Seoul National University`}
          <br />
          {`🏠  Gwanak-gu, Seoul`}
          <br />
          <br />
          {`📧 seuha516@naver.com`}
          <br />
          {`📬 seuha516@snu.ac.kr`}
          <br />
          {`📞 010-2824-3504`}
        </Information>
      </InfoText>
    </InfoWrapper>
  );
};
const LinkBlock = () => {
  return (
    <LinkWrapper>
      {LinkItem.map((item) => (
        <a key={item.link} href={item.link} target="_blank" rel="noopener noreferrer">
          <LinkIcon src={item.img} alt={item.link} />
        </a>
      ))}
    </LinkWrapper>
  );
};

export default About;
