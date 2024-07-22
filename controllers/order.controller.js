const mongoose = require('mongoose');
const Order = require('./models/Order'); // Importamos el modelo de Pedido

mongoose.connect('mongodb://localhost:27017/tienda', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(async () => {
  console.log('Conexión a MongoDB establecida');

  // Crear una nueva orden con información detallada
  const nuevaOrden = await Order.create({
    products: [
      { productId: 'ID_DEL_PRODUCTO_1', quantity: 2 },
      { productId: 'ID_DEL_PRODUCTO_2', quantity: 1 }
    ],
    totalAmount: 89.99,
    status: 'pending',
    customerInfo: {
      name: 'Juan Pérez',
      email: 'juan.perez@example.com',
      phone: '555-1234567',
      address: {
        street: 'Calle Principal 123',
        city: 'Ciudad de Ejemplo',
        state: 'Estado Ejemplo',
        postalCode: '12345'
      }
    },
    paymentMethod: 'Tarjeta de crédito',
    shippingAddress: {
      street: 'Calle de Envío 456',
      city: 'Otra Ciudad',
      state: 'Otro Estado',
      postalCode: '54321'
    }
  });

  console.log('Orden creada:', nuevaOrden);
})
.catch(error => {
  console.error('Error al conectar con MongoDB:', error);
})
.finally(() => {
  mongoose.disconnect();
});
