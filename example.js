const crib = require('@nima/crib')
// const crib = require('./crib')

const game = new crib.Game('Sadie', 'Nima')

game.initialize()

game.round()
game.round()
game.round()

console.log(game)


