const request = require('supertest')
const app = require('./../index')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const User = require('./../models/User')

describe('User controller testing', () => {
    const email = 'correo@test.com';
    const password = 'Contraseña_123'

    beforeEach(async () => {
        await User.deleteMany({})
        console.log('beforeEach ejecutado')
    }, 10000)

    afterAll(async () => {
        await User.deleteMany({})
        await mongoose.connection.close()
        console.log('afterAll ejecutado y conexión cerrada')
    })

    it('Debería registrar un usuario nuevo si el correo no existe en la base de datos', async () => {
        const response = await request(app)
            .post('/api/register')
            .send({ email: email, password: password })

        expect(response.statusCode).toBe(201)
        expect(response.body).toHaveProperty('ok', true)
        expect(response.body).toHaveProperty('msg', 'User created successfully')
    })
})