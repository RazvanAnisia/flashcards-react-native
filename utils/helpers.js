import { AsyncStorage } from 'react-native'
import { Notifications, Permissions } from "expo";

function generateID () {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
  }


const decks = {
  React: {
    title: 'React',
    questions: [
      { id:generateID(),
        question: 'What is React?',
        answer: 'A library for managing user interfaces'
      },
      { id:generateID(),
        question: 'Where do you make Ajax requests in React?',
        answer: 'The componentDidMount lifecycle event'
      }
    ]
  },
  JavaScript: {
    title: 'JavaScript',
    questions: [
      { id:generateID(),
        question: 'What is a closure?',
        answer: 'The combination of a function and the lexical environment within which that function was declared.'
      },
      { id:generateID(),
        question: 'What JS array method can filter elements?',
        answer: 'The combination of a function and the lexical environment within which that function was declared.'
      },
    ]
  },
  
  Angular: {
    title: 'Angular',
    questions: [
      { id:generateID(),
        question: 'What is Angular?',
        answer: 'A library for managing user interfaces'
      },
      { id:generateID(),
        question: 'Who created Angular?',
        answer: 'Google'
      }
    ]
  },
  Java: {
    title: 'Java',
    questions: [
      
    ]
  },
  PHP: {
    title: 'PHP',
    questions: [
      { id:generateID(),
        question: 'What is PHP?',
        answer: 'A backend language'
      },
      { id:generateID(),
        question: 'Where is it used?',
        answer: 'On the server'
      }
    ]
  },

}

//Async Storage

// Set Initiate data
AsyncStorage.setItem('decks', JSON.stringify(decks))


export function getDecks() {
    //return all the decks along with their titles
    return  AsyncStorage.getItem('decks').then((decks) => JSON.parse(decks)).then((res) => res)
   
}

export function getDeck (deckTitle) {
 //get a specific deck
 return AsyncStorage.getItem('decks').then((decks) => JSON.parse(decks))
 .then((decks) => decks[deckTitle])
 .catch((err) => alert(err))
}

export  function saveDeckTitle( deckTitle) {
    // take in two arguments, title and card, and will add the card to the list of questions for the deck with the associated title. 
   return AsyncStorage.getItem('decks').then((decks) => JSON.parse(decks))
    .then((decks) =>  {
      decks[deckTitle]={
        title:deckTitle,
        questions:[]
      }
      return decks;
    })
    .then((newDeck) => AsyncStorage.setItem('decks', JSON.stringify(newDeck)).then( AsyncStorage.getItem('decks').then((res) =>JSON.parse(res)).then(res =>res)) )
    .catch((err) => alert(err))
}

export function addNewCard(deckTitle, newCard) {
  
  return  AsyncStorage.getItem('decks').then((decks) => JSON.parse(decks))
  .then((decks) =>  {
     decks[deckTitle].questions.push(newCard)    
     return decks;
  })
  .then((newCard) => AsyncStorage.setItem('decks', JSON.stringify(newCard)).then( AsyncStorage.getItem('decks').then((res) =>JSON.parse(res)).then(res => res )) )
  .catch((err) => alert(err))
   
}



//Notifications

const NOTIFICATION_KEY = "StudyCards:notifications"

export function clearLocalNotification () {
    return AsyncStorage.removeItem()
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

  export const setLocalNotification = () => {  
    AsyncStorage.getItem(NOTIFICATION_KEY)
      .then(JSON.parse)
      .then(data => {
        if (data === null) {
          Permissions.askAsync(Permissions.NOTIFICATIONS).then(({ status }) => {
            if (status === "granted") {
              Notifications.cancelAllScheduledNotificationsAsync();
              let tomorrow = new Date();
              tomorrow.setDate(tomorrow.getDate() + 1);
              tomorrow.setHours(12);
              tomorrow.setMinutes(30);
              
              Notifications.scheduleLocalNotificationAsync(createNotification(), {
                time: tomorrow,
                repeat: "day"
              });
  
              AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true));
            }
          });
        }
      });
}