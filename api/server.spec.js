const mongoose = require('mongoose')
const request = require('supertest')

const server = require('./server')
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

  beforeEach(async () => {
    savedGames = await Promise.all(testGames.games.map(game => Game.create(game)))
  })

  afterEach(() => Game.remove({}))

  // test variables:
  let gameId
  let savedGames

  let testGames = {
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

  let goodGame = {
    title: 'Ultimate Marvel vs. Capcom 3',
    genre: 'Fighting',
    releaseDate: 'November 15, 2011',
  }

  let badGame = {
    genre: 'Fighting',
    releaseDate: 'November 15, 2011',
  }

  describe('POST requests', () => {
    it('Posts a correctly formatted game', async () => {
      await request(server)
        .post(`/api/games`)
        .send(goodGame)
        .expect('Content-Type', /json/)
        .expect(201)
    })

    it('Post route returns json', async () => {
      await request(server)
        .post(`/api/games`)
        .send(goodGame)
        .expect('Content-Type', /json/)
    })

    it('Returns an error with badly formatted data', async () => {
      await request(server)
        .post(`/api/games`)
        .send(badGame)
        .expect(500)
    })
  })

  describe('GET requests', () => {
    it('Returns a status of 200', async () => {
      await request(server)
        .get(`/api/games`)
        .expect(200)
    })

    it('Returns the list of games', async () => {
      const games = await request(server)
        .get(`/api/games`)

      expect(games.body.length).toBe(3)
    })
  })

  describe('DELETE requests', () => {
    let gameToDelete
    let gamesInDatabase
    let id
    let badId = 12345

    beforeEach(async () => {
      gameToDelete = await request(server)
        .post(`/api/games`)
        .send(goodGame)
      id = gameToDelete.body._id
    })

    it('Returns a 204 status when passed a valid ID', async () => {
      await request(server)
        .delete(`/api/games/${id}`)
        .expect(204)
    })

    it('Deletes a game from the database', async () => {
      await request(server)
        .delete(`/api/games/${id}`)
      gamesInDatabase = await request(server)
        .get(`/api/games`)

      expect(gamesInDatabase.body.length).toBe(3)
    })

    it('Returns a 404 when passed a nonexistent ID', async () => {
      await request(server)
        .delete(`/api/games/${id}`)

      // try to delete already deleted game
      await request(server)
        .delete(`/api/games/${id}`)
        .expect(404)
    })

    it('Returns a 500 when passed a malformed ID', async () => {
      await request(server)
        .delete(`/api/games/${badId}`)
        .expect(500)
    })
  })
})
