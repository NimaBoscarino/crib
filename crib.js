class Deck {
  constructor() {
    this.cards = [...Array(52).keys()].map(i => new Card(i))
  }

  shuffle() {
    const deck = this.cards
    for (let i = deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [deck[i], deck[j]] = [deck[j], deck[i]];
    }
  }

  deal(player) {
    player.cards.push(this.cards.pop())
  }

  insert(...cards) {
    this.cards.push(...cards)
  }

  cut() {
    const index = Math.floor(Math.random() * this.cards.length)
    return this.cards.splice(index, 1)[0]
  }

}

class Card {
  constructor(id) {
    this.id = id
    this.suit = id % 4 // 0, 1, 2, 3 -> diamond, heart, club, spade
    this.value = (id % 13) + 1 // 1..13 -> 1..10,J,Q,K
  }

  display() {
    let suit
    switch (this.sui) {
      case 0:
        suit = 'Diamonds'
        break;
      case 1:
        suit = 'Hearts'
        break;
      case 2:
        suit = 'Clubs'
        break;
      case 3:
        suit = 'Spades'
        break;
                    
      default:
        break;
    }
  }
}

class Player {
  constructor(name) {
    this.name = name
    this.cards = []
    this.points = 0
    this.table = []
  }

  reveal(index) {
    this.table.push(this.cards.splice(index, 1)[0])
  }

  countPoints(surpriseCard) {
    this.points += 1 // hardcoded to 1 right now
    // I think it would be fun to make players state the points that they claim
  } 
}

class Game {
  constructor(name1, name2) {
    this.players = [new Player(name1), new Player(name2)]
    this.player1 = null
    this.player2 = null
    this.crib = []
    this.surpriseCard = null
    this.deck = new Deck()
  }

  initialize() {
    const {deck} = this
    let {player1, player2} = this

    deck.shuffle()

    // this is what I'm naming the first and second players :)
    const [sadie, nima] = this.players
    while (!player1 && !player2) {
      console.log('heyoooo')
      deck.deal(sadie)
      deck.deal(nima)
      
      if (sadie.cards[0].value !== nima.cards[0].value) {
        sadie.cards[0].value < nima.cards[0].value ? (player1 = sadie) : (player1 = nima)
        player2 = player1 === sadie ? nima : sadie
      }
    
      deck.insert(sadie.cards.pop(), nima.cards.pop())
      deck.shuffle()
    }

    this.player1 = player1
    this.player2 = player2
  }

  dealCards() {
    for (let i = 0; i < 6; i++) {
      this.deck.deal(this.player1)
      this.deck.deal(this.player2)
    }    
  }

  cribSelect() {
    // Player 1 and 2 put cards in crib (this would be done by the players)
    this.crib.push(this.player1.cards.pop(), this.player1.cards.pop())
    this.crib.push(this.player2.cards.pop(), this.player2.cards.pop())
  }

  revealSurprise() {
    // reveal surprise card!
    this.surpriseCard = this.deck.cut()
  }

  playersPlaceCards() {
    // each player puts down cards... done by their choice...
    for (let i = 0; i < 4; i++) {
      this.player1.reveal(0)
      this.player2.reveal(0)
      // points happen in here...

    }

  }

  playersPickUpCards() {
    // players pick up their cards again
    this.player1.cards.push(...this.player1.table.splice(0, 4))
    this.player2.cards.push(...this.player2.table.splice(0, 4))
  }

  playersCountPoints() {
    // players count points...
    this.player1.countPoints(this.surpriseCard)
    this.player2.countPoints(this.surpriseCard)
  }

  playersPutCardsBackInDeck() {
    // players put cards back in deck
    this.deck.insert(...this.player1.cards.splice(0, 4))
    this.deck.insert(...this.player2.cards.splice(0, 4))
  }

  countPointsWithCrib() {
    const {player1, player2, crib, deck} = this
    let {surpriseCard} = this

    // player1 counts points with crib
    player1.cards.push(...crib.splice(0, 4))
    player1.countPoints(surpriseCard)

    // players 1 put cards  back in deck
    deck.insert(...player1.cards.splice(0, 4))

    // surprise card back in deck
    deck.insert(surpriseCard)
    this.surpriseCard = null
  }

  swapPlayers() {
    // swap player 1 and player 2
    this.player2 = [this.player1, this.player1 = this.player2][0];
  }

  round() {
    this.dealCards()
    this.cribSelect()
    this.revealSurprise()
    this.playersPlaceCards()
    this.playersPickUpCards()
    this.playersCountPoints()
    this.playersPutCardsBackInDeck()
    this.countPointsWithCrib()
    this.swapPlayers()    
  }
}

module.exports = {
  Game
}