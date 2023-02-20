import create from 'zustand';

interface Chatdata {
  isMyChat: boolean,
  content: string
}

interface Chat {
  chatData: Chatdata[],
  setChatData: (isMyChat: boolean, content: string) => void
}

const ChatStore = create<Chat>(set => ({
  chatData: [],
  setChatData: (isMyChat, content) => {
    set((state) => ({chatData: [...state.chatData, {isMyChat, content}]}))
  }
}))

export default ChatStore;