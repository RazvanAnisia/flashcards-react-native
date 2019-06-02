import { View, StyleSheet, AsyncStorage } from 'react-native'

 
function generateID () {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
  }


export function newDeck (deckTitle) {
    return {
        deckTitle: {
            title: deckTitle,
            questions: [
                
            ]
        }
    }
}


//Async Storage



const decks = {
  React: {
    title: 'React',
    questions: [
      {
        question: 'What is React?',
        answer: 'A library for managing user interfaces'
      },
      {
        question: 'Where do you make Ajax requests in React?',
        answer: 'The componentDidMount lifecycle event'
      }
    ]
  },
  JavaScript: {
    title: 'JavaScript',
    questions: [
      {
        question: 'What is a closure?',
        answer: 'The combination of a function and the lexical environment within which that function was declared.'
      }
    ]
  },
  Arrays: {
    title: 'Arrays',
    questions: [
      {
        question: 'What JS array method can filter elements?',
        answer: 'The combination of a function and the lexical environment within which that function was declared.'
      },
      {
        question: 'What JS array method can filter elements?',
        answer: 'The combination of a function and the lexical environment within which that function was declared.'
      },
      {
        question: 'What JS array method can filter elements?',
        answer: 'The combination of a function and the lexical environment within which that function was declared.'
      }
    ]
  },
  Angular: {
    title: 'Angular',
    questions: [
      {
        question: 'What is React?',
        answer: 'A library for managing user interfaces'
      },
      {
        question: 'Where do you make Ajax requests in React?',
        answer: 'The componentDidMount lifecycle event'
      }
    ]
  },
  PHP: {
    title: 'PHP',
    questions: [
      {
        question: 'What is a closure?',
        answer: 'The combination of a function and the lexical environment within which that function was declared.'
      }
    ]
  },
  Node: {
    title: 'Node',
    questions: [
      {
        question: 'What JS array method can filter elements?',
        answer: 'The combination of a function and the lexical environment within which that function was declared.'
      },
      {
        question: 'What JS array method can filter elements?',
        answer: 'The combination of a function and the lexical environment within which that function was declared.'
      },
      {
        question: 'What JS array method can filter elements?',
        answer: 'The combination of a function and the lexical environment within which that function was declared.'
      }
    ]
  }
}

export function getDecks() {
    //return all the decks along with their titles
    return decks;
}

export function getDeck () {
 //get a specific deck
}

export  function saveDeckTitle( title, card) {
    // take in two arguments, title and card, and will add the card to the list of questions for the deck with the associated title. 

}

export function addNewCard(deckTitle, newCard) {
  for (var property in decks) {
    if(property === deckTitle) {
       //decks[property].questions.concat(newCard)
       decks[property].questions.push(newCard)
      //console.log(decks[property]) 
    }
  }
}


//Notifications
export function clearLocalNotification () {
    return AsyncStorage.removeItem(NOTIFICATION_KEY)
      .then(Notifications.cancelAllScheduledNotificationsAsync)
}

export function createNotification () {
    return {
      id: generateID(),
      title: 'Study time!',
      body: "Want to do a bit of studing today?",
      ios: {
        sound: true,
      },
      android: {
        sound: true,
        priority: 'high',
        sticky: false,
        vibrate: true,
      }
    }
  }