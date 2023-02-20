import styled from "styled-components"
import { useState, useEffect } from "react"
import { useRef } from "react"

import Chat from "./Chat"
import ChatStore from "../ZustandChat"

function ChatList(props: any) {
  const [chatContent, setChatContent] = useState('')
  const {chatData, setChatData} = ChatStore()
  const { Configuration, OpenAIApi } = require("openai");

  const configuration = new Configuration({
    apiKey: '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',
  });
  const openai = new OpenAIApi(configuration);

    // 메세지 추가시 아래로 이동
    const messageBoxRef = useRef<any>();
    const scrollToBottom = () => {
      if (messageBoxRef.current) {
        messageBoxRef.current.scrollTop = messageBoxRef.current.scrollHeight;
      }
    };
    useEffect(() => {
      scrollToBottom();
    }, [chatData]);
    
    // enter 시 메세지 전송
    const sendOnEnter = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.shiftKey && e.key === "Enter") {
        return;
      } else if (e.key === "Enter") {
        handleClickSend();
      }
    };

  const fetchAnswer = async (question: string) => {
      await openai.createCompletion({
      model: "text-davinci-003",
      prompt: question,
      temperature: 0.7,
      max_tokens: 48,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    }).then((res: any) => {
      console.log(res.data.choices[0].text)
      setChatData(false, res.data.choices[0].text)
    })
  };
  const handleClickSend = () => {
    setChatData(true, chatContent)
    fetchAnswer(chatContent)
    setChatContent("");
  }

  return (
    <ChatListWrapper>
      <div className="flex">
        <WriteChat>
          <textarea
            className="textArea"
            placeholder="Write Message here..."
            onChange={(e) => setChatContent(e.target.value)}
            value={chatContent}
            onKeyPress={sendOnEnter}
          ></textarea>
          <button onClick={handleClickSend}>Send</button>
        </WriteChat>
      </div>
      <ChatWrapper ref={messageBoxRef}>
      {chatData.map((el, idx) => 
          el.isMyChat ? 
          (<div className="myChatWrapper" key={idx}>
            <div className="myChat">{el.content}</div>
          </div>) :
          (<Chat key={idx} content={el.content} />)
        )}
      </ChatWrapper>
    </ChatListWrapper>
  );
}

const ChatListWrapper = styled.div`
  background-color: #2b463a;
  border-radius: 10px;
  width: calc(460px - 40px);
  padding: 16px 20px;
  margin: 16px 0 16px 0;
  height: 600px;
  display: flex;
  flex-direction: column-reverse;
  max-height: 635px;

  > .flex {
    width: 100%;
    display: flex;
    align-items: center;
    margin-top: 16px;
  }
  *::-webkit-scrollbar {
    width: 8px; /* 스크롤바의 너비 */
  }

  *::-webkit-scrollbar-thumb {
    height: 30%; /* 스크롤바의 길이 */
    background: rgba(255, 255, 255, 0.15); /* 스크롤바의 색상 */
    border-radius: 10px;
  }

  *::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.2); /*스크롤바 뒷 배경 색상*/
  }
`;
const WriteChat = styled.div`
  * {
    font-family: "mainL";
  }
  border: 1px solid #e9e3d9;
  border-radius: 20px;
  background-color: #2b463a;
  width: 100%;
  font-size: 12px;
  color: #e9e3d9;
  line-height: 16px;
  display: flex;
  align-items: flex-start;
  justify-content: space-around;
  padding: 8px;

  > textarea {
    background-color: #2b463a;

    border: none;
    color: #e9e3d9;
    width: 85%;
    max-height: 80px;
    resize: none;
    overflow: auto;
    padding: 8px;
  }
  > textarea:focus {
    outline: none;
  }

  > button {
    border-radius: 20px;
    background-color: #2b463a;
    border: none;
    color: #e9e3d9;
    margin-top: 4px;
    :hover {
      cursor: pointer;
      color: #1979bf;
    }
  }
`;

const ChatWrapper = styled.div`
  display: flex;
  flex-direction: column;
  overflow: auto;
  > .myChatWrapper {
    .myChat {
      font-family: "mainL";
      margin-top: 0;
    }
    border: 1px solid #e9e3d9;
    border-radius: 20px;
    background-color: #2b463a;
    max-width: 270px;
    font-size: 12px;
    color: #e9e3d9;
    padding: 8px 8px 8px 16px;
    line-height: 16px;
    margin-top: 18px;
    margin-left: calc(420px - 270px);
  }
`;

export default ChatList