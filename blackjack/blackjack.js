/*BLACKJACK GAME*/
  // html page (index.html)
  // sytle (style.css)

$(function game() {
  // CREATING CARDS:
  var cards = []
  for (var i = 1; i <= 13; i++) {
    cards.push({ point: i, suit: 'spades' }); // change to Card constructor
    cards.push({ point: i, suit: 'hearts' });
    cards.push({ point: i, suit: 'clubs' });
    cards.push({ point: i, suit: 'diamonds' });
  }

  function getImage(card){
    var pointConversion = {
      //point:'card'
      1:'ace',
      11:'jack',
      12:'queen',
      13:'king'
    };
    var cardName;
    if(card.point in pointConversion){
      cardName = pointConversion[card.point];
    }
    else{
      cardName = card.point;
    }
    return("/images/" + cardName + "_of_" + card.suit + ".png");
  }

  //CREATING A DECK OF CARDS
  var deck = [];
  function random(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }
  function shuffle(cards){
    for(x=0; x<52; x++){
      deck.push(cards.splice(random(0,cards.length),1));
    }
  }

  // DEALING THE CARDS
  var dealerHand = [];
  var playerHand = [];
  var cards2 = cards.slice();

  shuffle(cards2);
  $('#deal-button').click(function(){
    dealerHand = [deck.pop(), deck.pop()];
    playerHand = [deck.pop(), deck.pop()];
    $('#dealer-hand').append('<img src="' + getImage(dealerHand[0][0]) + '"/><img src="' + getImage(dealerHand[1][0]) + '"/>');
    $('#player-hand').append('<img src="' + getImage(playerHand[0][0]) + '"/><img src="' + getImage(playerHand[1][0]) + '"/>');
    $('#dealer-points').text(calcTotalpts(dealerHand));
    $('#player-points').text(calcTotalpts(playerHand));
    $('#deal-button').hide();
  });

  // CALCULATING POINTS OF HAND
    function calcTotalpts(array){
      var totalpts = 0;
      for(x=0; x<array.length; x++){
        if(array[x][0].point == 1){
          if((21-totalpts)<11){
            totalpts += 1;
          } else {
            totalpts += 11;
          }
        }else if(array[x][0].point > 10){
          totalpts += 10;
        }else{
          totalpts += array[x][0].point;
        }
      }
      return totalpts;
    }

  //DETERMINING A WINNER
  function determineWinner(){
    if(calcTotalpts(dealerHand) > calcTotalpts(playerHand)){
      $('#messages').text('You lose!');
    }else if(calcTotalpts(playerHand) > calcTotalpts(dealerHand)){
      $('#messages').text('You win!');
    }else{
      $('#messages').text("It's a draw!");
    }
  }

  //HIT (DEALING ONE MORE CARD TO PLAYER)
  var hitCount = 0;
  $('#hit-button').click(function(){
    playerHand.push(deck.pop());
    $('#player-hand').append('<img src="' + getImage(playerHand[hitCount][0]) + '"/>');
    $('#player-points').text(calcTotalpts(playerHand));
    if(calcTotalpts(playerHand)>21){
      $('#messages').text("You've busted! Dealer wins.");
      $('#hit-button').hide();
      $('#stand-button').hide();
      $('#play-again').show();
    }
    hitCount += 1;
  });

  //STAND (DEALING MORE CARD TO DEALER)
  var standCount = 0;
  $('#stand-button').click(function(){
    $('#hit-button').hide();
    while(calcTotalpts(dealerHand)<17){
      dealerHand.push(deck.pop());
      $('#dealer-hand').append('<img src="' + getImage(dealerHand[standCount][0]) + '"/>');
      $('#dealer-points').text(calcTotalpts(dealerHand));
      standCount += 1;
    }
    if(calcTotalpts(dealerHand)>21){
        $('#messages').text("Dealer has busted! You win!");
    } else {
      determineWinner();
    }
    $('#stand-button').hide();
    $('#play-again').show();
  });

  //RESTARTING GAME
  $('#play-again').click(function(){
    restart();
  });

  function restart(){
    cards2 = cards.slice();
    deck = [];
    shuffle(cards2);
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

  $('#play-again').hide();

});
