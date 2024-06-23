// Write your tests here
const request = require('supertest')
const server = require('./server')
const db = require('../data/dbConfig')

test('sanity', () => {
  expect(true).toBe(true)
})

beforeAll( async () => {
  await db.migrate.rollback()
  await db.migrate.latest()
})

beforeEach( async () => {
  await db.seed.run()
})

test('environment is testing', () => {
  expect(process.env.NODE_ENV).toBe('testing')
})


describe('[GET] /api/jokes', () => {
  test('responds with 200 status', async () => {
    const res = await request(server).get('/api/jokes')
    expect(res.status).toBe(200)
  })
})

describe('[POST] /api/auth/register', () => {
  let newUser = {}
  test('no username or password provided = 400 status', async () => {
    const res = await request(server).post('/api/auth/register').send(newUser);
    expect(res.status).toBe(400)
    expect(res.body).toHaveProperty(
			'message',
			'username and password required'
		);
  })
  test('password must be a string', async () => {
    newUser = { username: 'Merry', password: 1234}
		const res = await request(server).post('/api/auth/register').send(newUser)
		expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('message', 'please make password a string');
	});
  test('username taken = 400 status', async () => {
    newUser = { username: 'John', password: '1234'}
		const res = await request(server).post('/api/auth/register').send(newUser);
		expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('message', 'username taken');
	});
})

describe('[POST] /api/auth/login', () => {
  let login = { username: 'Jason', password: 'yayaay' }
  test('incorrect username = 400 status', async () => {
    const res = await request(server).post('/api/auth/login').send(login)
    expect(res.status).toBe(400)
  })
  test('incorrect Password = 400 status', async () => {
    login = { username: 'John', password: 'yayaay' };
    const res = await request(server).post('/api/auth/login').send(login)
    expect(res.status).toBe(400);
  })
})
