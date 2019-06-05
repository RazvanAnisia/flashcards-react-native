import React from 'react';
import { StatusBar, StyleSheet, View,} from 'react-native';
import AppNavigator from './navigation/AppNavigator';
import { createStore } from "redux";
import { Provider } from "react-redux";
import reducer from './reducers'
import { setLocalNotification } from "./utils/helpers";

export default class App extends React.Component {
   componentDidMount(){
    setLocalNotification();
  }
   render(){
     return (
        <Provider store={createStore(reducer)}>
          <View style={styles.container}>
            <StatusBar backgroundColor="#000000" barStyle="light-content"/>
            <AppNavigator screenProps={{test:'test'}}/>
          </View>
        </Provider>
      );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
