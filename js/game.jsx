import React from 'react';
import Card from './card.jsx';

export default class Game extends React.Component {
  static get ranks() {
    return ['A','2','3','4','5','6','7','8','9','10','J','Q','K'];
  }

  static get suits() {
    return ['clubs', 'diamonds', 'hearts','spades'];
  }

  static getNextInList(list, searchItem) {
    return list[(list.indexOf(searchItem) + 1) % list.length];
  }

  constructor(props) {
    super(props);

    this.state = {
      rank: Game.ranks[0],
      suit: Game.suits[0]
    };

    this.nextRank = this.nextRank.bind(this);
    this.nextSuit = this.nextSuit.bind(this);
  }

  nextRank() {
    this.setState((state) => ({ rank: Game.getNextInList(Game.ranks, state.rank) }));
  }

  nextSuit() {
    this.setState((state) => ({ suit: Game.getNextInList(Game.suits, state.suit) }));
  }

  render() {
    return (
      <div>
        <Card rank={this.state.rank} suit={this.state.suit} />
        <span>{this.state.rank} of {this.state.suit}</span>
        <div onClick={this.nextRank}>Next Rank</div>
        <div onClick={this.nextSuit}>Next Suit</div>
      </div>
    );
  }
}
