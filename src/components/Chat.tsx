import { useState } from "react";
import styled from "styled-components";

import chatGPTimg from "../chatGPTimg.png"

interface Props {
  content: string
}

const Chat = ({content}: Props) => {
  
  return (
    <Chatwrapper>
      <img src={chatGPTimg} />
      <TextWrapper>
        <div className="name">chatAi</div>
        <div className="content ">
          {content}
          {/* {content.split("\n").map((el, idx) => (
            <span key={idx}>
              {el}
              <br />
            </span>
          ))} */}
        </div>
      </TextWrapper>
    </Chatwrapper>
  )
};

const Chatwrapper = styled.div`
  border: 1px solid #e9e3d9;
  border-radius: 20px;
  background-color: #1d2f27;
  max-width: 270px;
  display: flex;
  align-items: flex-start;
  font-size: 12px;
  color: #e9e3d9;
  padding: 8px;
  line-height: 16px;
  margin-top: 18px;
  > img {
    border-radius: 30px;
    width: 20px;
    height: 20px;
    margin-right: 8px;
  }
`;

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  .content {
    font-family: "mainL";
  }
  > .name {
    font-size: 10px;
  }
`;

export default Chat;