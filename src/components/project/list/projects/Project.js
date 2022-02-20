import React from "react";
import styled from "styled-components";
import { BsFillPersonFill, BsPencilSquare } from "react-icons/bs";
import { MdGroup } from "react-icons/md";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { VscDebugRestart } from "react-icons/vsc";
import { Link } from "react-router-dom";

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
const Wrapper = styled(FlexRow)`
    width: 100%;
    max-width: 1500px;
    flex-wrap: wrap;
    justify-content: center;
    margin-bottom: 35px;
    padding: 0 10px;
`;

const ProjectWrapper = styled(Link)`
    display: flex;
    flex-direction: column;
    width: 400px;
    height: 320px;
    border-radius: 10px;
    margin: 15px;
    justify-content: flex-start;
    align-items: flex-start;
    background-color: gray;
    box-shadow: 1px 1px 1px 1px black;
    transition: all 0.2s linear;
    &:hover {
        box-shadow: 1px 1px 1px 1px gray;
    }
    @media all and (max-width: 470px) {
        width: 85vw;
        height: 68vw;
        margin: 15px 0;
    }
`;
const Thumbnail = styled.img`
    width: 100%;
    height: calc(100% / 320 * 225);
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
`;
const TextWrapper = styled(FlexColumn)`
    width: 100%;
    height: calc(100% / 320 * 95);
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    background-color: #363636;
    color: white;
    justify-content: space-evenly;
`;
const Title = styled.div`
    font-size: 25px;
    font-weight: 600;
    font-family: "Noto Serif KR", serif;
    letter-spacing: 1px;
    @media all and (max-width: 470px) {
        font-size: calc(85vw * 25 / 400);
        font-weight: 500;
        letter-spacing: 0.5px;
    }
`;
const Tags = styled(FlexRow)`
    max-width: 95%;
    height: 25px;
    overflow: hidden;
`;
const Tag = styled.div`
    font-size: 18px;
    & + & {
        margin-left: 10px;
    }
    @media all and (max-width: 470px) {
        font-size: calc(85vw * 18 / 400);
        & + & {
            margin-left: calc(85vw * 10 / 400);
        }
    }
`;
const TagsText = styled.div`
    font-size: 18px;
    color: white;
    margin-left: 10px;
    @media all and (max-width: 470px) {
        font-size: calc(85vw * 18 / 400);
        margin-left: calc(85vw * 10 / 400);
    }
`;
const ProjectClassWrapper = styled(FlexRow)`
    position: absolute;
    margin: 3px;
    width: 110px;
    height: 40px;
    border-radius: 10px;
    opacity: 0.7;
    color: white;
    font-size: 18px;
    font-family: "PT Sans", sans-serif;
    svg {
        width: 25px;
        height: 25px;
        margin-right: 5px;
    }
    @media all and (max-width: 470px) {
        margin: calc(85vw * 3 / 400);
        width: calc(85vw * 110 / 400);
        height: calc(85vw * 40 / 400);
        border-radius: calc(85vw * 10 / 400);
        font-size: calc(85vw * 18 / 400);
        svg {
            width: calc(85vw * 25 / 400);
            height: calc(85vw * 25 / 400);
            margin-right: calc(85vw * 5 / 400);
        }
    }
`;
const DevelopStateWrapper = styled(FlexRow)`
    position: absolute;
    margin-left: 290px;
    margin-top: 190px;
    width: 110px;
    height: 35px;
    opacity: 1;
    color: ${(props) => props.color};
    background-color: black;
    font-size: 15px;
    font-family: "PT Sans", sans-serif;
    svg {
        width: 21px;
        height: 21px;
        margin-right: 4px;
    }
    @media all and (max-width: 470px) {
        width: calc(85vw * 110 / 400);
        height: calc(85vw * 35 / 400);
        font-size: calc(85vw * 15 / 400);
        margin-left: calc(85vw * 290 / 400);
        margin-top: calc(85vw * 190 / 400);
        svg {
            width: calc(85vw * 21 / 400);
            height: calc(85vw * 21 / 400);
            margin-right: calc(85vw * 4 / 400);
        }
    }
`;

const Project = ({ projects }) => {
    return (
        <Wrapper>
            {projects &&
                projects.map((project) => (
                    <ProjectWrapper
                        key={project._id}
                        to={`/project/read/${project._id}`}
                    >
                        <Thumbnail
                            src={
                                project.thumbnail === ""
                                    ? "images/Project/Default.png"
                                    : `${process.env.REACT_APP_API_URL}/get/${project.thumbnail}`
                            }
                        />
                        <TextWrapper>
                            <Title>{project.title}</Title>
                            <Tags>
                                {project.tags.map((tag, index) => {
                                    if (index < 3) {
                                        return (
                                            <Tag
                                                key={tag.tag}
                                                style={{ color: tag.color }}
                                            >{`#${tag.tag}`}</Tag>
                                        );
                                    } else if (index === 3) {
                                        return (
                                            <TagsText key={tag.tag}>{` + ${
                                                project.tags.length - 3
                                            }`}</TagsText>
                                        );
                                    } else return null;
                                })}
                            </Tags>
                        </TextWrapper>
                        <ProjectClass
                            projectClass={project.moreInfo.projectClass}
                        />
                        <DevelopState
                            developState={project.moreInfo.developState}
                        />
                    </ProjectWrapper>
                ))}
        </Wrapper>
    );
};
const ProjectClass = ({ projectClass }) => {
    const ClassList = {
        "Group Project": {
            text: "Group",
            icon: <MdGroup />,
            color: "#8d006f",
        },
        "Personal Project": {
            text: "Personal",
            icon: <BsFillPersonFill />,
            color: "#000b8d",
        },
        Practice: {
            text: "Practice",
            icon: <BsPencilSquare />,
            color: "#141414",
        },
    };
    return (
        <ProjectClassWrapper
            style={{ backgroundColor: ClassList[projectClass].color }}
        >
            {ClassList[projectClass].icon}
            {ClassList[projectClass].text}
        </ProjectClassWrapper>
    );
};
const DevelopState = ({ developState }) => {
    const StateList = {
        "In Progress": {
            text: "In Progress",
            icon: <VscDebugRestart />,
            color: "#ecc38a",
        },
        Complete: {
            text: "Complete",
            icon: <AiOutlineCheckCircle />,
            color: "#9effa4",
        },
    };
    return (
        <DevelopStateWrapper color={StateList[developState].color}>
            {StateList[developState].icon}
            {StateList[developState].text}
        </DevelopStateWrapper>
    );
};

export default Project;
