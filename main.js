class Card {
    constructor(suit, rank, value) {
        this.suit = suit;
        this.rank = rank;
        this.value = value;
    }
    get color(){
      return this.suit === '♣︎' || this.suit === '♠︎' ? 'black': 'red'
    }
    getHTML(step) {
      const cardDiv = document.createElement('div')
      cardDiv.innerText = this.suit
      if (step%4 == 2 && step!=0) {
        cardDiv.classList.add("card", this.color, "rotate1")
      } else if (step%4 == 3 && step!=0) {
        cardDiv.classList.add("card", this.color, "rotate2")
      } else if (step%4 == 0 && step!=0) {
        cardDiv.classList.add("card", this.color, "rotate3")
      } else {
        cardDiv.classList.add("card", this.color)
      }
      cardDiv.dataset.value = `${this.rank}${this.suit}`
      cardDiv.id = ("newcard" + step.toString())
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

document.getElementById("new game").onclick = function() {new_game()};

function draw_card() {
  step++
  MiddleGrid = document.querySelector('.grid-item.middle')
  if (d.cards.length===0){
    const oocardDiv = document.createElement('div')
    oocardDiv.innerText = ""
    oocardDiv.classList.add("emptycard")
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
  emptycardDiv.classList.add("emptycard_pl")
  emptycardDiv.id = ("ecardslot" + step.toString())
  players[(step-1)%4].appendChild(emptycardDiv);
  MiddleGrid.appendChild(d.cards[0].getHTML(step))
  var elem = document.getElementById("newcard" + step.toString());
  var diffX = emptycardDiv.getBoundingClientRect().left - elem.getBoundingClientRect().left;
  var diffY = emptycardDiv.getBoundingClientRect().top - elem.getBoundingClientRect().top;
  var dx = diffX / 20;
  var dy = diffY / 20;
  var pos = 0;
  var id = setInterval(frame, 5);
  function frame() {
       if (pos == 20) {
       clearInterval(id);
   } else {
        pos++;
        elem.style.top = (parseFloat(elem.style.top)||0) + dy + 'px';
        elem.style.left = (parseFloat(elem.style.left)||0) + dx + 'px';
    }
  }
  d.cards.shift()
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
  MiddleGrid = document.querySelector('.grid-item.middle')
  PlayerCardSlot1 = document.querySelector('.player1-card-slot')
  PlayerCardSlot2 = document.querySelector('.player2-card-slot')
  PlayerCardSlot3 = document.querySelector('.player3-card-slot')
  PlayerCardSlot4 = document.querySelector('.player4-card-slot')
  removeChildren(MiddleGrid);
  const deckDiv = document.createElement('div')
  deckDiv.innerText = ""
  deckDiv.classList.add("deck")
  deckDiv.id = "new card"
  deckDiv.onclick = function() {draw_card()};
  const cardslotDiv = document.createElement('div')
  cardslotDiv.innerText = ""
  cardslotDiv.classList.add("card-slot")
  MiddleGrid.appendChild(deckDiv);
  MiddleGrid.appendChild(cardslotDiv);
  CardSlot = document.querySelector('.card-slot')
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
    CardSlot.appendChild(d.cards[0].getHTML(step));
    d.cards.shift()
  } else {
    d.createDeck();
    d.shuffleDeck();
    CardSlot.appendChild(d.cards[0].getHTML(step));
    d.cards.shift()
    }
}

let PlayerCardSlot1, PlayerCardSlot2, PlayerCardSlot3, PlayerCardSlot4
let CardSlot, MiddleGrid, d, step
