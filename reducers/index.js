import { CREATE_CARD, CREATE_DECK, RECEIVE_DECKS } from "../actions";



const decks = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_DECKS:
      return {
        ...state,
        ...action.decks
      };
    case CREATE_DECK: {      
      return {
        ...state,
        [action.title]: {
          title: action.title,
          questions: []
        }
      };
    }
    case CREATE_CARD: {
      return {
        ...state,
        [action.deckId]: {
          ...state[action.deckId],
          questions: [
            ...state[action.deckId].questions,
            { question: action.question, answer: action.answer }
          ]
        }
      };
    }
    default:
      return state;
  }
};

export default decks;