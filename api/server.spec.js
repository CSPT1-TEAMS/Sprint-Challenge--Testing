const mongoose = require('mongoose');
const request = require('supertest');
let server = require('./server');
const Game = require('../games/Game');

describe('The API Server', () => {
  beforeAll(() => {
    return mongoose
      .connect('mongodb://localhost/test')
      .then(() => console.log('\n=== connected to TEST DB ==='))
      .catch(err => {
        console.log('error connecting to TEST database, is MongoDB running?');
      });
  });

  afterAll(() => {
    return mongoose
      .disconnect()
      .then(() => console.log('\n=== disconnected from TEST DB ==='));
  });

  let gameId;
  // // hint - these wont be constants because you'll need to override them.

  beforeEach(async () => {
    //   // write a beforeEach hook that will populate your test DB with data
    //   // each time this hook runs, you should save a document to your db
    //   // by saving the document you'll be able to use it in each of your `it` blocks
    let mario = {
      title: 'Super Mario Bros',
      genre: 'Platform game',
      releaseDate: 'September 13, 1985'
    }
    testGame = await Game.create(mario);
  });

  afterEach(() => {
    //   // clear the games collection.
    return Game.remove()
  });

  it('runs the tests', () => { });

  // test the POST here
  it('should return status 201 after being saved', async () => {
    const newGame = {
      title: 'Duck Hunt',
      genre: 'shooter',
      releaseDate: 'October 18, 1985'
    }
    const response = await request(server)
      .post('/api/games', newGame)
    expect(201)
  })
  it('should return game data after being saved to db', async () => {
    const newGame = {
      title: 'Duck Hunt',
      genre: 'shooter',
      releaseDate: 'October 18, 1985'
    }
    const response = await request(server)
      .post('/api/games')
      .send(newGame)
    expect(newGame)
    expect(response.body.title).toEqual('Duck Hunt')
  })

  // test the GET here
  it('has a GET / endpoint that returns 200', async () => {
    await request(server)
      .get('/api/games')
      .expect(200)
  })
  // Test the DELETE here
});
