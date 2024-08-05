const Order = require('./../models/Order')

const addProductToCart = async (req, res) => {
    try {
        const { productId, quantity } = req.body;
        const product = await Product.findById(productId);
        if (!product || !product.available) {
        return res.status(404).json({ 
            ok: false,
            msg: `${product} isn't avalible`
        });
        }
        let order = await Order.findOne({ status: 'pending' });
        order.totalAmount += product.price * quantity;
        await order.save();

        res.status(200).json({
            ok: true,
            msg: 'Order created successfully'
        });
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: 'Please contact our support'
        })
    }
};

const removeProductFromCart = async (req, res) => {
    try {
        const { productId } = req.body;
        let order = await Order.findOne({ status: 'pending' });
        if (!order) {
            return res.status(404).json({ 
                ok: false,
                msg: `${order} not found`
            });
        }

        // Buscamos el producto en la orden
        const productIndex = order.products.findIndex(p => p.productId.toString() === productId);
        if (productIndex >= 0) {
        // Si el producto está en la orden, lo eliminamos y actualizamos el total
        const product = await Product.findById(productId);
        order.totalAmount -= product.price * order.products[productIndex].quantity;
        order.products.splice(productIndex, 1);
        await order.save();

        res.status(200).json({
            ok: true,
            msg: 'Order updated successfully'
        });
        } else {
            return res.status(404).json({ 
                ok: false,
                msg: `${product} not found`
            });
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: 'Please contact our support'
        })
    }
};

module.exports = {
    addProductToCart,
    removeProductFromCart
};