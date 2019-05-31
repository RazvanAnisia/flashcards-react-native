import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';

export default class AddDeck extends React.Component {
  static navigationOptions = {
    title: 'Add Deck',
    headerStyle: {
      backgroundColor: '#f4511e',
    },
    headerTitleStyle: {
      textAlign: 'center'      
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };

  render() {
    return (
      <ScrollView style={styles.container}>
      
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});
