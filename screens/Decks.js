import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Animated,
  ActivityIndicator
} from "react-native";

import { getDecks } from "../utils/helpers";
import { connect } from "react-redux";
import { receiveDecks } from "../actions";

class Decks extends React.Component {
  state = {
    decks: "",
    currentDeck: null,
    fadeAnim: new Animated.Value(1),
    ready: false
  };

  componentDidMount() {
    //async
    getDecks()
      .then(res => {
        this.props.dispatch(receiveDecks(res));
      })
      .then(() => this.setState({ ready: true }));
  }

  currentDeck = newDeck => {
    this.setState({ currentDeck: newDeck });
    this.props.navigation.navigate("Deck", { currentDeck: newDeck });
  };

  render() {
    let { fadeAnim } = this.state;
    const decks = (
      <ScrollView style={styles.container}>
        <View style={[{ alignItems: "center" }, { opacity: fadeAnim }]}>
          {Object.values(this.props.decks).map((deck, index) => (
            <TouchableOpacity
              onPress={() => this.currentDeck(deck)}
              key={index}
              style={styles.card}
            >
              <Text style={styles.cardTitle}> {deck.title}</Text>
              <Text style={styles.cardNumber}>
                {" "}
                {deck.questions.length} cards
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    );
    return (
      <View style={{ flex: 1 }}>
        {this.state.ready ? (
          decks
        ) : (
          <ActivityIndicator
            size="large"
            color="#f4511e"
            style={{ marginTop: 300 }}
          />
        )}
      </View>
    );
  }
}

function mapStateToProps(state) {
  return { decks: state };
}

export default connect(mapStateToProps)(Decks);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eee",
    paddingTop: 20
  },
  card: {
    flex: 1,
    width: "75%",
    height: 120,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: "#ffffff",
    borderWidth: 2,
    borderColor: "#f4511e"
  },
  cardTitle: {
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 20,
    color: "#f4511e"
  },
  cardNumber: {
    textAlign: "center",
    fontSize: 20
  }
});
