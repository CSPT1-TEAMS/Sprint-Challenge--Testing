const mongoose = require('mongoose')

const Game = require('./Game')

describe('Game Model', () => {
  beforeAll(() =>
    mongoose
      .connect('mongodb://localhost/test')
      .then(() => console.log('\n=== connected to TEST DB ==='))
      .catch(err => {
        console.log('error connecting to TEST database, is MongoDB running?')
      })
  )

  afterAll(() =>
    mongoose
      .disconnect()
      .then(() => console.log('\n=== disconnected from TEST DB ==='))
  )

  afterEach(async () => await Game.remove())

  let goodGame = new Game({
    title: 'Marvel vs. Capcom: Infinite',
    genre: 'Fighting',
    releaseDate: 'September 19, 2017',
  })

  it('Creates a Game instance with the expected properties', () => {
    expect(goodGame.title).toBe('Marvel vs. Capcom: Infinite')
    expect(goodGame.genre).toBe('Fighting')
    expect(goodGame.releaseDate).toBe('September 19, 2017')
    expect(goodGame._id).toBeTruthy()
  })

  it('Instance method `getGameTitle` returns game title', () => {
    expect(goodGame.getGameTitle()).toBe('Marvel vs. Capcom: Infinite')
  })

  it('Saving game without required fields results in an error', () => {
    let badGame = new Game({ genre: 'Fighting', releaseDate: 'Dec 5' })

    badGame.save((err) => {
      errorMessage = err
      expect(err).toBeTruthy()
      expect(err.message).toBe('Game validation failed: title: Path `title` is required.')
    })
  })
})
