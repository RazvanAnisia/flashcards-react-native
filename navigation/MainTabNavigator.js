import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import TabBarIcon from '../components/TabBarIcon';
import Decks from '../screens/Decks';
import AddDeck from '../screens/AddDeck';
import { Ionicons ,  MaterialIcons } from '@expo/vector-icons';



// const HomeStack = createStackNavigator({
//   Decks: Decks,
// });

// HomeStack.navigationOptions = {

// };

// const AddDecksStack = createStackNavigator({
//   AddDeck:AddDeck,
// });

// AddDecksStack.navigationOptions = {
//   tabBarLabel: 'Links',
//   tabBarIcon: ({ focused }) => (
//     <TabBarIcon
//       focused={focused}
//       name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'}
//     />
//   ),
// };


navigationOptions = {
  title: 'Study Cards',
  headerStyle: {
    backgroundColor: '#f4511e',
  },
  headerTitleStyle: {
    textAlign: 'center'      
  },
  headerTintColor: '#000',
  headerTitleStyle: {
    fontWeight: 'bold',
  },
};

export default createBottomTabNavigator({
  HomeStack: {
    screen:Decks,
    navigationOptions: {
      tabBarLabel: 'Decks',
      tabBarIcon: ({ focused }) => (
        <MaterialIcons  size={25}
        name='library-books'/>      
      )}
  },
  AddDeck: {
    screen:AddDeck,
    navigationOptions: {
      tabBarLabel: 'Add Deck',
      tabBarIcon: ({ focused }) => (
        <Ionicons  size={25}
         name='md-add-circle'/>
      ),
    }
  },
});