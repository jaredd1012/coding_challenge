/*
* i3logix Code Challenge
*
* Please refer to the README.md for challenge questions and complete your challenge below.
*/
export default class PokerHand {
  
  constructor(hand) {
    this.hand = hand;
  }

  /**
   * @method getRank
   *
   * handles current string of pocker hand variable, sanitizes string to consumable object
   * checks stanized string values to determine why type of poker hand was passed to it 
   *
   * * @return {String} return string value of pocker hand 
   */
  getRank = () => {
    const rank = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
    const sanitisedCards = this.santizeCards(this.hand);
    const rankedCards = this.rankCards(sanitisedCards, rank);
    const isStraight = this.isStraight(rankedCards, rank);
    const isFlush = this.isFlush(sanitisedCards, rank);
  
    switch(true) {
      case isStraight && isFlush && rankedCards[0][0].type == 'A':
        return 'Royal Flush';
      case isStraight && isFlush: 
        return 'Straight Flush';
      case isFlush: 
        return 'Flush';
      case isStraight: 
      return 'Straight';
      case rankedCards[0].length === 3 && rankedCards[1].length === 2:
        return 'Full House';
      case rankedCards[0].length === 4:
        return 'Four of a Kind';
      case rankedCards[0].length === 3:
        return 'Three of a Kind';
      case rankedCards[0].length === 2 && rankedCards[1].length === 2:
        return 'Two Pair';
      case rankedCards[0].length === 2:
        return 'One Pair';
      default:
          return 'High Card';
    }
  };

 /**
   * @method santizeCards
   *
   * handles string value of current pocker hand, creates array from string value
   * maps over newly created array and creates array card objects
   * 
   * @param {string} string value of current card hand 
   * @return {cardObj[]} returns an array of card objects 
  */
  santizeCards = (cards) => {
    const cardsArray = cards.split(" ");
    const sanitizedCards = cardsArray.map((card) => {
      let cardObj = {};
      cardObj = {
        type: card.substring(0, card.length - 1),
        suit: card.slice(-1),
      };
      return cardObj;
    })
    return sanitizedCards;
  }

  /**
   * @method rankCards
   *
   * takes array of cardObjects and creates a new array of cardObjects order in rank of their type 
   * new array of card objects with be returned in an order of highest to lowest in ranking
   * 
   * @param {cardObj[], string[]} array of sanitized card objects and card rankings
   * @return {cardObj[]} returns an array of card objects 
  */
  rankCards = (cards, cardRankings) => {
    let rankArray = [];

    cards.map((card) => {
      let cardRank = cardRankings.indexOf(card.type);
      rankArray[cardRank] = rankArray[cardRank] || [];
      rankArray[cardRank].push(card);
    })

    rankArray = rankArray.filter((cardRank) =>  (cardRank === 0) ? false : true);
    rankArray.reverse();
    rankArray.sort((rankArray1, rankArray2) => {
      return rankArray1.length > rankArray2.length ? -1 : rankArray1.length < rankArray2.length ? 1 : 0;
    });
    return rankArray;
  }

  /**
   * @method isFlush
   *
   * checks to determine if array of card objects all have the same type of suit
   * 
   * @param {cardObj[]} array of sanitized card objects
   * @return {booelan} returns whether array of cards meet criteria of straight 
  */
  isFlush = (cards) => {
    const cardCompareSuit = cards[0].suit;

    for (let card of cards) {
      if (card.suit != cardCompareSuit) {
        return false;
      }
    }

    return true;
  }

  /**
   * @method isStraight
   *
   * checks to determine if array of card objects to see if card types are in numerical order
   * check for "wheel" with Ace being low card as well
   * 
   * @param {cardObj[], string[]} array of sanitized card objects and card rankings
   * @return {boolean} returns whether array of cards meet criteria of straight 
  */
  isStraight = (cards, cardRanks) => {
    const cardLength = 4
    if (!cards[cardLength]) {
      return false;
    }

    if (cards[0][0].type === 'A' && cards[1][0].type === '5' && cards[4][0].type === '2') {
      return true;
    }

    
    let firstRankedCard = cardRanks.indexOf(cards[0][0].type);
    let lastRankedCard = cardRanks.indexOf(cards[4][0].type);
    return (firstRankedCard - lastRankedCard) === cardLength;
  }
}
