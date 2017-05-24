/*BLACKJACK GAME*/
  // html page (index.html)
  // sytle (style.css)
$(function game() {
  // Creating cards:
  var cards = []
  for (var i = 1; i <= 13; i++) {
    cards.push({ point: i, suit: 'spades' }); // change to Card constructor
    cards.push({ point: i, suit: 'hearts' });
    cards.push({ point: i, suit: 'clubs' });
    cards.push({ point: i, suit: 'diamonds' });
  }

  function getImage(card){
    var pointConversion = {
      1:'ace',
      11:'jack',
      12:'queen',
      13:'king'
    };
    var point;
    if(card.point in pointConversion){
      point = pointConversion[card.point];
    }
    else{
      point = card.point;
    }
    return("/images/" + point + "_of_" + card.suit + ".png");
  }

  // Creating and dealing a deck of cards (Shuffle cards)
  var deck = [];
  function random(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }
  function shuffle(array){
    for(x=0; x<52; x++){
      deck.push(array.splice(random(0,array.length),1));
    }
  }






  function calculatePoints(array){
    var points = 0;
    for(x=0; x<array.length; x++){
      if(array[x][0].point == 1){
        if((21-points)<11){
          points += 1;
        } else {
          points += 11;
        }
      }else if(array[x][0].point > 10){
        points += 10;
      }else{
        points += array[x][0].point;
      }
    }
    return points;
  }
  function determineWinner(){
    if(calculatePoints(dealerHand) > calculatePoints(playerHand)){
      $('#messages').text('You lose!');
    }else if(calculatePoints(playerHand) > calculatePoints(dealerHand)){
      $('#messages').text('You win!');
    }else{
      $('#messages').text("It's a draw!");
    }
  }

  $('#play-again').hide();

  // Deal the deck
  var dealerHand = [];
  var playerHand = [];
  var hitCount = 0;
  var standCount = 0;
  var cards2 = cards.slice();

  shuffle(cards2);
  $('#deal-button').click(function(){
    dealerHand = [deck.pop(), deck.pop()];
    playerHand = [deck.pop(), deck.pop()];
    $('#dealer-hand').append('<img src="' + getImage(dealerHand[0][0]) + '"/><img src="' + getImage(dealerHand[1][0]) + '"/>');
    $('#player-hand').append('<img src="' + getImage(playerHand[0][0]) + '"/><img src="' + getImage(playerHand[1][0]) + '"/>');
    $('#dealer-points').text(calculatePoints(dealerHand));
    $('#player-points').text(calculatePoints(playerHand));
    $('#deal-button').hide();
  });
  $('#hit-button').click(function(){
    playerHand.push(deck.pop());
    $('#player-hand').append('<img src="' + getImage(playerHand[hitCount][0]) + '"/>');
    $('#player-points').text(calculatePoints(playerHand));
    if(calculatePoints(playerHand)>21){
      $('#messages').text("You've busted! Dealer wins.");
      $('#hit-button').hide();
      $('#stand-button').hide();
      $('#play-again').show();
    }
    hitCount += 1;
  });

  $('#stand-button').click(function(){
    $('#hit-button').hide();
    while(calculatePoints(dealerHand)<17){
      dealerHand.push(deck.pop());
      $('#dealer-hand').append('<img src="' + getImage(dealerHand[standCount][0]) + '"/>');
      $('#dealer-points').text(calculatePoints(dealerHand));
      standCount += 1;
    }
    if(calculatePoints(dealerHand)>21){
        $('#messages').text("Dealer has busted! You win!");
    } else {
      determineWinner();
    }
    $('#stand-button').hide();
    $('#play-again').show();
  });

  //Restarting the game:
  function restart(){
    cards2 = cards.slice();
    deck = [];
    shuffle(cards2);
    // hitCount = 2;
    // standCount = 2;
    dealerHand = [];
    playerHand = [];
    $('#dealer-hand').html('');
    $('#player-hand').html('');
    $('#dealer-points').text('');
    $('#player-points').text('');
    $('#messages').text('');
    $('#play-again').hide();
    $('#deal-button').show();
    $('#hit-button').show();
    $('#stand-button').show();
  }

  $('#play-again').click(function(){
    restart();
  });

});
