const mongoose = require('mongoose')

const Game = require('../games/Game')

describe('The API Server', () => {
  beforeAll(() => {
    return mongoose
      .connect('mongodb://localhost/test')
      .then(() => console.log('\n=== connected to TEST DB ==='))
      .catch(err => {
        console.log('error connecting to TEST database, is MongoDB running?')
      })
  })

  afterAll(() => {
    return mongoose
      .disconnect()
      .then(() => console.log('\n=== disconnected from TEST DB ==='))
  })

  let gameId

  beforeEach(async () => {
    //   // write a beforeEach hook that will populate your test DB with data
    //   // each time this hook runs, you should save a document to your db
    //   // by saving the document you'll be able to use it in each of your `it` blocks

    const testGames = {
      games: [
        {
          title: 'X-Men vs. Street Fighter',
          genre: 'Fighting',
          releaseDate: 'September 25, 1996',
        },
        {
          title: 'Marvel Super Heroes vs. Street Fighter',
          genre: 'Fighting',
          releaseDate: 'October 22, 1998',
        },
        {
          title: 'Marvel vs. Capcom: Clash of the Super Heroes',
          genre: 'Fighting',
          releaseDate: 'January 23, 1998',
        },
      ]
    }

    let savedGames = await Promise.all(testGames.games)
  })

  afterEach(() => {
    //   // clear the games collection.
  })

  it('runs the tests', () => { })

  // test the POST here

  // test the GET here

  // Test the DELETE here
})
