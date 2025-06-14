
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';

export interface Flashcard {
  question: string;
  answer: string;
}

export interface Deck {
  id: string;
  name: string;
  cards: Flashcard[];
  currentCardIndex: number;
}

interface DeckState {
  decks: Deck[];
  activeDeckId: string | null;
  addDeck: (name: string) => void;
  deleteDeck: (deckId: string) => void;
  setActiveDeck: (deckId: string | null) => void;
  addCard: (card: Flashcard) => void;
  addCardsBulk: (cards: Flashcard[]) => void;
  deleteCard: (index: number) => void;
  deleteAllCards: () => void;
  nextCard: () => void;
  prevCard: () => void;
  reset: () => void;
}

export const useDeckStore = create<DeckState>()(
  persist(
    (set) => ({
      decks: [
        {
          id: 'default-deck',
          name: 'Default Deck',
          cards: [
            { question: "What is the capital of France?", answer: "Paris" },
            { question: "What is 2 + 2?", answer: "4" },
            { question: "What is the largest planet in our solar system?", answer: "Jupiter" }
          ],
          currentCardIndex: 0
        }
      ],
      activeDeckId: 'default-deck',
      addDeck: (name) => {
        const newDeck: Deck = { id: uuidv4(), name, cards: [], currentCardIndex: 0 };
        set((state) => ({ decks: [...state.decks, newDeck], activeDeckId: newDeck.id }));
      },
      deleteDeck: (deckId) => {
        set((state) => {
          const newDecks = state.decks.filter((deck) => deck.id !== deckId);
          let newActiveDeckId = state.activeDeckId;
          if (state.activeDeckId === deckId) {
            newActiveDeckId = newDecks.length > 0 ? newDecks[0].id : null;
          }
          return { decks: newDecks, activeDeckId: newActiveDeckId };
        });
      },
      setActiveDeck: (deckId) => set({ activeDeckId: deckId }),
      addCard: (card) => set((state) => {
        if (!state.activeDeckId) return {};
        const newDecks = state.decks.map(deck => {
          if (deck.id === state.activeDeckId) {
            return { ...deck, cards: [...deck.cards, card] };
          }
          return deck;
        });
        return { decks: newDecks };
      }),
      addCardsBulk: (newCards) => set((state) => {
        if (!state.activeDeckId) return {};
        const newDecks = state.decks.map(deck => {
          if (deck.id === state.activeDeckId) {
            return { ...deck, cards: [...deck.cards, ...newCards] };
          }
          return deck;
        });
        return { decks: newDecks };
      }),
      deleteCard: (indexToDelete) => set((state) => {
        if (!state.activeDeckId) return {};
        const newDecks = state.decks.map(deck => {
          if (deck.id === state.activeDeckId) {
            const newCards = deck.cards.filter((_, i) => i !== indexToDelete);
            let newCurrentIndex = deck.currentCardIndex;

            if (newCards.length === 0) {
              return { ...deck, cards: [], currentCardIndex: 0 };
            }

            if (indexToDelete < deck.currentCardIndex) {
              newCurrentIndex--;
            } else if (indexToDelete === deck.currentCardIndex && deck.currentCardIndex >= newCards.length) {
              newCurrentIndex = newCards.length - 1;
            }

            newCurrentIndex = Math.max(0, Math.min(newCurrentIndex, newCards.length - 1));

            return { ...deck, cards: newCards, currentCardIndex: newCurrentIndex };
          }
          return deck;
        });
        return { decks: newDecks };
      }),
      deleteAllCards: () => set(state => {
        if (!state.activeDeckId) return {};
        const newDecks = state.decks.map(deck => {
            if (deck.id === state.activeDeckId) {
                return { ...deck, cards: [], currentCardIndex: 0 };
            }
            return deck;
        });
        return { decks: newDecks };
      }),
      nextCard: () => set((state) => {
        if (!state.activeDeckId) return {};
        const newDecks = state.decks.map(deck => {
          if (deck.id === state.activeDeckId) {
            if (deck.cards.length === 0) return deck;
            const newIndex = (deck.currentCardIndex + 1) % deck.cards.length;
            return { ...deck, currentCardIndex: newIndex };
          }
          return deck;
        });
        return { decks: newDecks };
      }),
      prevCard: () => set((state) => {
        if (!state.activeDeckId) return {};
        const newDecks = state.decks.map(deck => {
          if (deck.id === state.activeDeckId) {
            if (deck.cards.length === 0) return deck;
            const newIndex = (deck.currentCardIndex - 1 + deck.cards.length) % deck.cards.length;
            return { ...deck, currentCardIndex: newIndex };
          }
          return deck;
        });
        return { decks: newDecks };
      }),
      reset: () => set({ decks: [], activeDeckId: null }),
    }),
    {
      name: 'flashcard-storage', // name of the item in the storage (must be unique)
    },
  ),
);
