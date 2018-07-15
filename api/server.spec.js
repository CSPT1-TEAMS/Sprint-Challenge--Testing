const mongoose = require('mongoose');
const request = require('supertest');
const server = require('./server');
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

    let mario = {
      title: 'Super Mario Bros',
      genre: 'Platform game',
      releaseDate: 'September 13, 1985'
    }
    testGame = await Game.create(mario);
  });

  afterEach(() => {
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
    await request(server)
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
    expect(response.body.title).toEqual('Duck Hunt');
  })
  it('should return an error for an incomplete game listing', async () => {
    const incomplete = {
      genre: 'shooter',
      releaseDate: 'October 18, 1985'
    }
   await request(server)
      .post('/api/games')
      .send(incomplete)
    expect(500)
    expect({ message: 'Error saving data to the DB' })
  })

  // test the GET here
  it('has a GET / endpoint that returns 200', async () => {
    await request(server)
      .get('/api/games')
      .expect(200)
  })
  it('returns a list of games after a GET request', async () => {
    const newGame = await Game.create({
      title: 'Duck Hunt',
      genre: 'shooter',
      releaseDate: 'October 18, 1985'
    })

    const response = await request(server)
      .get('/api/games')
      .expect(200)
    expect(response.body.length).toEqual(2)
  })
  // Test the DELETE here
  it('deletes a game from the database', async () => {
    const deleteGame = await Game.create({
      title: 'Frogger',
      genre: 'arcade',
      releaseDate: 'October 23, 1981'
    })

    const response = await request(server)
      .delete(`/api/games/${deleteGame._id}`)
    console.log(response)
    expect(204)
  })
  it('returns a 404 when trying to delete a removed game', async () => {
    const deleteGame = await Game.create({
      title: 'Frogger',
      genre: 'arcade',
      releaseDate: 'October 23, 1981'
    })

    await request(server)
      .delete(`/api/games/${deleteGame._id}`);
    expect(204);

    await request(server)
      .delete(`/api/games/${deleteGame._id}`);
    expect(404);
  })
  it('return a 422 if delete request sent without id', async() => {
    await request(server)
      .delete(`/api/games`);
      expect(422);
    expect({ message: 'You need to give me an ID' })
  })
});
