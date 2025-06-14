
import { create } from 'zustand';

export interface Flashcard {
  question: string;
  answer: string;
}

interface DeckState {
  cards: Flashcard[];
  currentCardIndex: number;
  addCard: (card: Flashcard) => void;
  addCardsBulk: (cards: Flashcard[]) => void;
  deleteCard: (index: number) => void;
  nextCard: () => void;
  prevCard: () => void;
  reset: () => void;
}

export const useDeckStore = create<DeckState>((set) => ({
  cards: [
    { question: "What is the capital of France?", answer: "Paris" },
    { question: "What is 2 + 2?", answer: "4" },
    { question: "What is the largest planet in our solar system?", answer: "Jupiter" }
  ],
  currentCardIndex: 0,
  addCard: (card) => set((state) => ({ cards: [...state.cards, card] })),
  addCardsBulk: (newCards) => set((state) => ({ cards: [...state.cards, ...newCards] })),
  deleteCard: (indexToDelete) => set((state) => {
    const newCards = state.cards.filter((_, i) => i !== indexToDelete);
    let newCurrentIndex = state.currentCardIndex;

    if (newCards.length === 0) {
      return { cards: [], currentCardIndex: 0 };
    }

    if (indexToDelete < state.currentCardIndex) {
      newCurrentIndex--;
    } else if (indexToDelete === state.currentCardIndex && state.currentCardIndex >= newCards.length) {
      newCurrentIndex = newCards.length - 1;
    }

    newCurrentIndex = Math.max(0, Math.min(newCurrentIndex, newCards.length - 1));

    return {
      cards: newCards,
      currentCardIndex: newCurrentIndex,
    };
  }),
  nextCard: () => set((state) => ({
    currentCardIndex: (state.currentCardIndex + 1) % state.cards.length
  })),
  prevCard: () => set((state) => ({
    currentCardIndex: (state.currentCardIndex - 1 + state.cards.length) % state.cards.length
  })),
  reset: () => set({ currentCardIndex: 0, cards: [] }),
}));
