import { useEffect, useState } from "react";

const Chat = () => {
  const [response, setResponse] = useState(undefined);
  const { Configuration, OpenAIApi } = require("openai");

  const configuration = new Configuration({
    apiKey: process.env.REACT_APP_API_KEY,
  });
  const openai = new OpenAIApi(configuration);

  const fetchAnswer = async (question: string) => {
      await openai.createCompletion({
      model: "text-davinci-003",
      prompt: question,
      temperature: 0.7,
      max_tokens: 48,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    }).then((res: any) => console.log(res.data.choices[0].text))
  };
  
  return <div onClick={() => fetchAnswer("where are you from?")}>아아</div>;
};

export default Chat;