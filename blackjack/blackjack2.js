/* Dealing the cards */

$(document).ready(function () {
  $('#deal-button').click(function () {
    dealACard(playerHand, '#player-hand');
    dealACard(dealerHand, '#dealer-hand');
    dealACard(playerHand, '#player-hand');
    dealACard(dealerHand, '#dealer-hand');

    console.log('playerHand', playerHand);
    console.log('dealerHand', dealerHand);



  $('#hit-button').click(function () {
    dealACard(playerHand, '#player-hand');

});

    /* Building a deck */

    // var jackOfHearts = { point: 11,  suit: 'hearts'};
    // var jackOfDiamonds = { point: 11,  suit: 'diamonds'};
    // var jackOfSpades = { point: 11,  suit: 'spades'};
    // var jackOfClubs = { point: 11,  suit: 'clubs' };
    //
    // var queenOfHearts =  { point: 12, suit: 'hearts'};
    // var queenOfDiamonds =  { point: 12, suit: 'diamonds'};
    // var queenOfSpades =  { point: 12, suit: 'spades'};
    // var queenOfClubs =  { point: 12, suit: 'clubs'};
    //
    // var kingOfHearts =  { point: 13, suit: 'hearts'};
    // var kingOfDiamonds =  { point: 13, suit: 'diamonds'};
    // var kingOfSpades =  { point: 13, suit: 'spades'};
    // var kingOfClubs =  { point: 13, suit: 'clubs'};
    //
    // var aceOfHearts = { point: 1,  suit: 'hearts'};
    // var aceOfDiamonds = { point: 1,  suit: 'diamonds'};
    // var aceOfSpades = { point: 1,  suit: 'spades'};
    // var aceOfClubs = { point: 1,  suit: 'clubs'};
    // ... (continue until you get all 52 cards.)

    // Building a deck:
    function buildDeck() {
      var cards = [];
      var point = ['2','3','4','5','6','7','8','9','10','jack','queen','king','ace'];
      var suit = ['hearts', 'diamonds', 'spades', 'clubs'];
      point.forEach(function(point) {
        suit.forEach(function (suit) {
          cards.push({'point': point, 'suit': suit})
        });
      });
      return cards;
    }

    // Getting the card image:
    function getCardImageUrl(card) {
      var cardName;
      if (card.point === 1) {
        cardName = 'ace';
      } else if (card.point === 11) {
        cardName = 'jack';
      } else if (card.point === 12) {
        cardName = 'queen';
      } else if (card.point === 13) {
        cardName = 'king';
      } else {
        cardName = card.point;
      }
      return 'images/' + cardName + '_of_' + card.suit + '.png';
    }

      // 7. Deal the deck
        //1. Taking away a card from it each time a card is dealt.
      function dealACard(handArray, elementSelector) {
        card = deck.pop();
        handArray.push(card);
        cardUrl = getCardImageUrl(card);
        $(elementSelector).append(
          '<img src="' + cardUrl + '">'
        );
        updateScoreDisplay();
      }

  // Taking away dealt cards:
  var dealtCards = []
