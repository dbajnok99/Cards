class Card {
    constructor(suit, rank, value) {
        this.suit = suit;
        this.rank = rank;
        this.value = value;
    }
    get color(){
      return this.suit === '♣︎' || this.suit === '♠︎' ? 'black': 'red'
    }
    getHTML() {
      const cardDiv = document.createElement('div')
      cartDiv.id = "new_card";
      cardDiv.innerText = this.suit
      cardDiv.classList.add("card", this.color)
      cardDiv.dataset.value = `${this.rank}${this.suit}`
      return cardDiv
    }
}

class Deck {
    constructor() {
        this.cards = [];
    }

    createDeck() {
    let suits = ['♣︎', '♦︎', '♥︎', '♠︎'];
    let ranks = ['A', '2', '3', '4', '5', '6', '7', '8',
                 '9', '10', 'J', 'Q', 'K'];
    let values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
    for (let i = 0; i < suits.length; i++) {
        for (let j = 0; j < ranks.length; j++) {
            this.cards.push(new Card(suits[i], ranks[j], values[j]));
        }
    }
}
    shuffleDeck() {
           let location1, location2, tmp;
           for (let i = 0; i < 1000; i++) {
               location1 = Math.floor((Math.random() * this.cards.length));
               location2 = Math.floor((Math.random() * this.cards.length));
               tmp = this.cards[location1];
               this.cards[location1] = this.cards[location2];
               this.cards[location2] = tmp;
               }
    }
}

class Board {
    constructor() {
        this.cardsInMiddle = [];
        this.players = [];
    }
    start(playerOneName, playerTwoName) {
        this.players.push(new Player(playerOneName));
        this.players.push(new Player(playerTwoName));
        let d = new Deck();
        d.createDeck();
        d.shuffleDeck();
        this.players[0].playerCards = d.cards.slice(0, 26);
        this.players[1].playerCards = d.cards.slice(26, 52);
    }
}
class Player {
    constructor(name) {
        this.playerName = name;
        this.playerCards = [];
    }
}

document.getElementById("new game").onclick = function() {new_game()};
document.getElementById("new card").onclick = function() {draw_card()};

function draw_card() {
  if (d.cards.length===0){
    const oocardDiv = document.createElement('div')
    oocardDiv.innerText = ""
    oocardDiv.classList.add("emptycard")
    MiddleGrid = document.querySelector('.grid-item.middle')
    MiddleGrid.appendChild(oocardDiv)
    window.alert("Out of cards!");
  } else {
  PlayerCardSlot1 = document.querySelector('.player1-card-slot')
  PlayerCardSlot2 = document.querySelector('.player2-card-slot')
  PlayerCardSlot3 = document.querySelector('.player3-card-slot')
  PlayerCardSlot4 = document.querySelector('.player4-card-slot')
  let players = [PlayerCardSlot1, PlayerCardSlot2,
                 PlayerCardSlot3, PlayerCardSlot4]
  const emptycardDiv = document.createElement('div')
  emptycardDiv.innerText = ""
  emptycardDiv.classList.add("emptycard")
  emptycardDiv.id = 'ecardslot'
  players[step%4].appendChild(emptycardDiv);
  
  d.cards.shift()
  step++
  }
}

function removeChildren(slot){
  if (slot.hasChildNodes()){
    const length = slot.childNodes.length
    for (let i = 0; i < length; i++) {
      slot.removeChild(slot.childNodes[0]);
      }
    }
}

function new_game() {
  CardSlot = document.querySelector('.card-slot')
  MiddleGrid = document.querySelector('.grid-item.middle')
  PlayerCardSlot1 = document.querySelector('.player1-card-slot')
  PlayerCardSlot2 = document.querySelector('.player2-card-slot')
  PlayerCardSlot3 = document.querySelector('.player3-card-slot')
  PlayerCardSlot4 = document.querySelector('.player4-card-slot')
  if(MiddleGrid.childNodes.length===6){
    MiddleGrid.removeChild(MiddleGrid.childNodes[5]);
  }
  step = 0;
  d = new Deck();
  if (CardSlot.hasChildNodes()) {
    CardSlot.removeChild(CardSlot.childNodes[0]);
    removeChildren(PlayerCardSlot1);
    removeChildren(PlayerCardSlot2);
    removeChildren(PlayerCardSlot3);
    removeChildren(PlayerCardSlot4);
    d.createDeck();
    d.shuffleDeck();
    CardSlot.appendChild(d.cards[0].getHTML());
    d.cards.shift()
  } else {
    d.createDeck();
    d.shuffleDeck();
    CardSlot.appendChild(d.cards[0].getHTML());
    d.cards.shift()
    }
}

let PlayerCardSlot1, PlayerCardSlot2, PlayerCardSlot3, PlayerCardSlot4
let CardSlot, MiddleGrid, d, step
