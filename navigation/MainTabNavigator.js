import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import TabBarIcon from '../components/TabBarIcon';
import Decks from '../screens/Decks';
import AddDeck from '../screens/AddDeck';
import { Ionicons ,  MaterialIcons } from '@expo/vector-icons';



// const HomeStack = createStackNavigator({
 
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


// navigationOptions = {
//   title: 'Study Cards',
//   headerStyle: {
//     backgroundColor: '#f4511e',
//   },
//   headerTitleStyle: {
//     textAlign: 'center'      
//   },
//   headerTintColor: '#000',
//   headerTitleStyle: {
//     fontWeight: 'bold',
//   },
// };

export default createBottomTabNavigator({
  HomeStack: {
    screen:Decks,
    navigationOptions: {
      header: null,
      tabBarOptions : {
        inactiveTintColor:'#000000',
        activeTintColor:'#ffffff',
        labelStyle:{
          fontSize:15
        },
        style: {
          backgroundColor: '#f4511e',
          height:70,
         
        }
      }, 
      tabBarLabel: 'Decks',
      tabBarIcon: ({ focused }) => (
        <MaterialIcons color={'#ffffff'} size={30}
        name='library-books'/>      
      )}
  },
  AddDeck: {
    screen:AddDeck,
    navigationOptions: {
      tabBarOptions : {
        inactiveTintColor:'#000000',
        activeTintColor:'#ffffff',
        labelStyle:{
          fontSize:15
        },
        style: {
          backgroundColor: '#f4511e',
          height:70,
         
        }
      }, 
      tabBarLabel: 'Add Deck',
      tabBarIcon: ({ focused }) => (
        <Ionicons color={'#ffffff'}  size={30}
         name='md-add-circle'/>
      ),
    }
  },
});