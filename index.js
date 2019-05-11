//class
class Deck{
  constructor(){
    this.deck = [];
    this.reset();
    this.shuffle();
  }

  reset(){
    this.deck = [];
    i = 0;
    const suits = ['H', 'S', 'C', 'D'];
    const values = ['A', 2, 3, 4, 5, 6, 7, 8, 9, 'T', 'J', 'Q', 'K'];

    for (let suit in suits) {
      for (let value in values) {
        this.deck.push(`${values[value]}${suits[suit]}`);
      }
    }


  }

  shuffle(){
    const { deck } = this;
    let m = deck.length, i;

    while(m){
      i = Math.floor(Math.random() * m--);

      [deck[m], deck[i]] = [deck[i], deck[m]];
    }

    return this;
  }

  deal(){
    var cardDealed = this.deck.pop();
    return cardDealed;
  }
}



//code
const deck1 = new Deck();
var i = 0;
var playerHand = 0;
var dealerHand = 0;
var valueOfCard = 0;
var dealerSecondCard = '';

var origbalance = parseInt(prompt("Please enter your starting balance:"));
var balance = origbalance;
var bet = parseInt(prompt("Please enter the amount you would like to bet each hand:"));





function startNewHand(){
  while (balance >= bet) {

    document.getElementById("button1").disabled = false;
    document.getElementById("button2").disabled = false;
    console.log(balance);
  balance = balance - bet;

  document.getElementById("balance").innerHTML = '<span><button id="button3" type="button" class="btn btn-primary hidebutton" onclick="addFunds()">Add Funds</button></span> Current Balance: ' + balance;
  document.getElementById("bet").innerHTML = "Bet per Hand: " + bet;
  document.getElementById("result").innerHTML = "";
  $(".startgame").removeClass("startgame");
  document.getElementById("button3").disabled = true;

    var j = 0;
    while (j < i + 1) {
      $("#img" + j).remove();
      j++;
    }

    $(".hidebutton").removeClass("hidebutton");
    $(".start").addClass("hidebutton");

    deck1.reset();
    deck1.shuffle();

    playerHand = 0;
    dealerHand = 0;
    valueOfCard = 0;

    var card = deck1.deal();
    displayHandPlayer(card);
    var cardValue = card.charAt(0);
    playerHand += checkValueOfCard(cardValue);

    card = deck1.deal();
    displayHandDealer(card);
    cardValue = card.charAt(0);
    dealerHand += checkValueOfCard(cardValue);

    card = deck1.deal();
    displayHandPlayer(card);
    cardValue = card.charAt(0);
    playerHand += checkValueOfCard(cardValue);

    updateOutputs(dealerHand, playerHand);
    checkIfBlackJack(playerHand);
    console.log(dealerHand);
    console.log(playerHand);

    document.getElementById("dealer").innerHTML += '<img id="img' + i + '" src="" class="img-fluid visible dealersecond">';
    document.getElementById("img" + i).src = 'PNG/gray_back.png';

    var dealerSecondCard = deck1.deal();
    console.log(dealerSecondCard);
    i++;
    return dealerSecondCard;

  }

  alert("no money!");
  document.getElementById("button3").disabled = false;
  }

function hit(){
  var x = deck1.deal();
  displayHandPlayer(x);
  var maybeAce = checkValueOfCard(x.charAt(0));
  if (playerHand > 10 && maybeAce == 11) {
    playerHand += 1;
  } else {
    playerHand += maybeAce;
  }
  console.log(playerHand);
  updateOutputs(dealerHand, playerHand);
  checkPlayerHand(playerHand);
}

function displayHandPlayer(cardDealed){
  document.getElementById("hand").innerHTML += '<img id="img' + i + '" src="" class="img-fluid">';
  document.getElementById("img" + i).src = 'PNG/' + cardDealed + '.png';
  var element = document.getElementById("img" + i);
  element.classList.add("visible");
  i++;

}

function displayHandDealer(cardDealed){
  document.getElementById("dealer").innerHTML += '<img id="img' + i + '" src="" class="img-fluid">';
  document.getElementById("img" + i).src = 'PNG/' + cardDealed + '.png';
  var element = document.getElementById("img" + i);
  element.classList.add("visible");
  i++;

}

function checkPlayerHand(playerHand){
  if (playerHand > 21) {
    displayResult(4);
    document.getElementById("button1").disabled = true;
    document.getElementById("button2").disabled = true;
  }
}

function checkIfBlackJack(playerHand){

  updateOutputs(dealerHand, playerHand);
  if (playerHand == 21 && dealerHand != 21) {
    card = deck1.deal();
    displayHandDealer(card);
    cardValue = card.charAt(0);
    dealerHand += checkValueOfCard(cardValue);
    displayResult(3);
    document.getElementById("button1").disabled = true;
    document.getElementById("button2").disabled = true;

  } else if (playerHand == 22){
    playerHand = 2;
  }
}

function stand(dealerHand, dealerSecondCard){

  document.getElementById("button1").disabled = true;
  document.getElementById("button2").disabled = true;

  card = deck1.deal();
  document.getElementById("img3").src = 'PNG/' + card + '.png';
  cardValue = card.charAt(0);
  dealerHand += checkValueOfCard(cardValue);


  while (dealerHand < 17) {
    card = deck1.deal();

    displayHandDealer(card);
    cardValue = card.charAt(0);
    var maybeAce2 = checkValueOfCard(cardValue);
    if (dealerHand > 10 && maybeAce2 == 11) {
      dealerHand += 1;
    } else {
      dealerHand += maybeAce2;
    }
    console.log(dealerHand);
  }
  updateOutputs(dealerHand, playerHand);
  checkWinner(dealerHand, playerHand);
}

function checkWinner(dealerHand, playerHand){
  if (dealerHand > 21) {
    displayResult(1);

  } else if (dealerHand > playerHand) {
    displayResult(0);

  } else if (playerHand > dealerHand) {
    displayResult(1);

  } else if (dealerHand == playerHand) {
    displayResult(2);

  }


}


function checkValueOfCard(cardValue){
  switch (cardValue) {
      case "2":
        valueOfCard = 2;
        break;
      case "3":
        valueOfCard = 3;
        break;
      case "4":
        valueOfCard = 4;
        break;
      case "5":
        valueOfCard = 5;
        break;
      case "6":
        valueOfCard = 6;
        break;
      case "7":
        valueOfCard = 7;
        break;
      case "8":
        valueOfCard = 8;
        break;
      case "9":
        valueOfCard = 9;
        break;
      case "T":
        valueOfCard = 10;
        break;
      case "A":
        valueOfCard = 11;
        break;
      case "K":
      case "Q":
      case "J":
        valueOfCard = 10;
        break;
    }
    return valueOfCard;
}


function updateOutputs(dealerHand, playerHand){
  document.getElementById("dealerHand").innerHTML = dealerHand;
  document.getElementById("playerHand").innerHTML = playerHand;
}



function displayResult(x){

  if (x == 0) {
    document.getElementById("result").innerHTML = "You lost!";
    document.getElementById("result").classList.add("result");

    setTimeout(startNewHand, 3000);

  } else if (x == 1){
    document.getElementById("result").innerHTML = "You won!";
    document.getElementById("result").classList.add("result");
    balance = balance + bet*2;
    setTimeout(startNewHand, 3000);

  } else if (x == 2){
    document.getElementById("result").innerHTML = "You pushed!";
    document.getElementById("result").classList.add("result");
    balance = balance + bet;
    setTimeout(startNewHand, 3000);

  } else if (x == 3){
    document.getElementById("result").innerHTML = "You Won! BlackJack!";
    document.getElementById("result").classList.add("result");
    balance = balance + bet + (bet*1.5);
    setTimeout(startNewHand, 3000);

  } else if (x == 4){
    document.getElementById("result").innerHTML = "Bust! You lost";
    document.getElementById("result").classList.add("result");

    setTimeout(startNewHand, 3000);

  }


}

function addFunds(){
  balance = origbalance;
  startNewHand();
  alert("Added Original Balance");
}
