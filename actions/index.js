export const CREATE_DECK = 'CREATE_DECK'
export const CREATE_CARD = 'CREATE_CARD'
export const RECEIVE_DECKS = 'RECEIVE_DECKS'

export const createDeck = (title) => ({
    type: CREATE_DECK,
    title,   
  });
  
  export const createCard = (deckId, question, answer) => ({
    type: CREATE_CARD,
    deckId,
    question,
    answer
  });
  
  export const receiveDecks = decks => ({
    type: RECEIVE_DECKS,
    decks
  });