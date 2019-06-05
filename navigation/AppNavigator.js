
import React from 'react';
import { createStackNavigator, createAppContainer, createSwitchNavigator, createBottomTabNavigator} from 'react-navigation';
import Deck from '../screens/Deck'
import MainTabNavigator from './MainTabNavigator';
import { white } from 'ansi-colors';
import AddCard from '../screens/AddCard'
import Decks from '../screens/Decks'
import Quiz from '../screens/Quiz'
import AddDeck from '../screens/AddDeck';
import { Ionicons ,  MaterialIcons } from '@expo/vector-icons';

// const MainNavigator = createStackNavigator(
//   { Main:MainTabNavigator,
//     Deck: Deck,  
//     AddCard:AddCard,
//     Quiz:Quiz },
//    {  initialRouteName: "Main",
//      navigationOptions: {
//       headerTintColor: 'red',
//       headerStyle: { backgroundColor: '#ffffff' },
//       headerTitleStyle: { fontWeight: "bold" }
//      }
//   }
//  );
 
//  DeckView.navigationOptions = {
//    tabBarLabel: 'Deck',
//    tabBarIcon: ({ focused }) => (
//      <TabBarIcon
//        focused={focused}
//        name={
//          Platform.OS === 'ios'
//            ? `ios-information-circle${focused ? '' : '-outline'}`
//            : 'md-information-circle'
//        }
//      />
//    ),
//  };




const Tabs = createBottomTabNavigator(
  {
    Decks: {
      screen: Decks,
      navigationOptions: {
        tabBarOptions : {
          inactiveTintColor:'#000000',
          activeTintColor:'#ffffff',
          style: {
            backgroundColor: '#f4511e',
            height:70,
          }
        },
        tabBarLabel: "Decks",
        tabBarIcon: ({ focused }) => (
          <MaterialIcons color={'#ffffff'} size={30}
          name='library-books'/>      
        )
      }
    },
    AddDeck: {
      screen: AddDeck,
      navigationOptions: {
        tabBarOptions : {
          inactiveTintColor:'#000000',
          activeTintColor:'#ffffff',
          style: {
            backgroundColor: '#f4511e',
            height:70,
          }
        },
        tabBarLabel: "New Deck",
        tabBarIcon: ({ focused }) => (
          <Ionicons color={'#ffffff'}  size={30}
           name='md-add-circle'/>
        ),
      }
    }
  },
  {
    navigationOptions: {
      header: null
    },
    tabBarOptions: {
      activeTintColor: '#f4511e',
      style: {
        height: 60,
        backgroundColor: '#ffffff',
        shadowColor: "rgba(0, 0, 0, 0.24)",
        shadowOffset: {
          width: 0,
          height: 3
        },
        shadowRadius: 6,
        shadowOpacity: 1
      },
      labelStyle: {
        paddingTop: 3,
        fontSize: 14,
        fontWeight: "bold"
      }
    }
  }
);

const MainNavigator = createStackNavigator(
  {
    Home: Tabs,
    Deck: Deck,
    AddCard: AddCard,
    Quiz: Quiz
  },
  {
    initialRouteName: "Home",
    navigationOptions: {
      title:'Study Cards',
      headerTintColor: white,
      headerStyle: { backgroundColor: '#f4511e' },
      headerTitleStyle: { fontWeight: "bold", color:'white' }
    }
  }
);

 
export default  MainNavigator