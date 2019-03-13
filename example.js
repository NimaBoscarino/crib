// const crib = require('@nima/crib')
const crib = require('./crib')

const game = new crib.Game('Sadie', 'Nima')

game.initialize()

let winner

while (!winner) {
  winner = game.round()
}

console.log("WINNER!", winner)


