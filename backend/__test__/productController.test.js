const request = require('supertest')
const app = require('./../index')
const mongoose = require('mongoose')
const Product = require('./../models/Product')

describe('Product controller testing', () => {
    beforeEach(async () => {
        await Product.deleteMany({})
        console.log('beforeEach ejecutado')
    }, 10000)

    afterAll(async () => {
        await Product.deleteMany({})
        await mongoose.connection.close()
        console.log('afterAll ejecutado y conexión cerrada')
    })

    it('Deberia eliminar un producto por ID', async () => {
        const producto = await new Product({
                name: 'Elimiar',
                price: 123,
                description: 'descripción',
                clotheCollection: 'Cualquiera',
                category: 'Cualquiera',
                available: true,
                imgA: '1',
                imgB: '2',
                imgC: '3'
            }).save()

        const response = await request(app)
            .delete(`/api/delete-product/${producto._id}`)

        expect(response.statusCode).toBe(200)
        expect(response.body).toHaveProperty('ok', true)
        expect(response.body).toHaveProperty('msg', 'Product deleted successfully') 
    })

    it('Debería traer todos los productos', async () => {
        const response = await request(app)
        .get('/api/get-all-products')

        expect(response.statusCode).toBe(200)
        expect(response.body).toHaveProperty('ok', true)
        expect(response.body).toHaveProperty('msg', 'products found')
    })
})