import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
    width: 100%;
    max-width: 700px;
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
`;
const Title = styled.div`
    margin-bottom: 25px;
    font-size: 50px;
    font-family: "Crimson Pro", serif;
    text-align: center;
`;
const SubTitle = styled.div`
    margin-bottom: 25px;
    font-size: 27px;
    font-family: "Crimson Pro", serif;
    text-align: center;
`;
const Body = styled.textarea`
    width: 90%;
    height: 92px;
    padding: 3px;
    text-align: center;
    resize: none;
    outline: none;
    border: none;
    background-color: transparent;
    font-family: "Lato", sans-serif;
    font-size: 16px;
    overflow-x: hidden;
    &::-webkit-scrollbar {
        width: 10px;
    }
    &::-webkit-scrollbar-thumb {
        background-color: #2f3542;
        border-radius: 10px;
        background-clip: padding-box;
        border: 2px solid transparent;
    }
    &::-webkit-scrollbar-track {
        background-color: grey;
        border-radius: 10px;
        box-shadow: inset 0px 0px 5px white;
    }
`;
// const Barrier = styled.div`
//   position: absolute;
//   width: calc(90% - 37.8px);
//   max-width: 630px;
//   height: 90px;
//   margin-top: 123.6px;
//   background-color: transparent;
// `;

const Text = ({ title, subTitle, body }) => {
    return (
        <Wrapper>
            <Title>{title}</Title>
            <SubTitle>{subTitle}</SubTitle>
            {body !== "" && <Body defaultValue={body} readOnly />}
            {/* <Barrier /> */}
        </Wrapper>
    );
};

export default Text;
