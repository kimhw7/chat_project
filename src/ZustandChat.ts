import create from 'zustand';

interface Chat {
  isLoading: boolean,
  question: string
}

const useStore = create(set => ({
  isLoading: false,
  question: ''
}))