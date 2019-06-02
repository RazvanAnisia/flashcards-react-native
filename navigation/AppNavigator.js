
import React from 'react';
import { createStackNavigator, createAppContainer, createSwitchNavigator} from 'react-navigation';
import Deck from '../screens/Deck'
import MainTabNavigator from './MainTabNavigator';
import { white } from 'ansi-colors';
import AddCard from '../screens/AddCard'
import Decks from '../screens/Decks'
import Quiz from '../screens/Quiz'

const MainNavigator = createStackNavigator({
   Main:MainTabNavigator,
   Deck: Deck,  
   AddCard:AddCard,
   Decks:Decks,
   Quiz:Quiz
 });
 
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



 
export default createAppContainer(createSwitchNavigator({
  Main:MainNavigator
}));