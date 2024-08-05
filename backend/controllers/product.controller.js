const Product = require('../models/Product')
const Size = require('../models/Size')

const newProduct = async(req, res) => {
    const { name, price, description, clotheCollection, available, imgA, imgB, imgC, size, quantity } = req.body
    try {
        const product = await Product.findOne({ name: name });
        if(product) return res.status(400).json({
            ok: false,
            msg: `${product} has already been created`
        })

        const dbproduct = new Product({
            name: name,
            price: price,
            description: description,
            clotheCollection: clotheCollection,
            available: available,
            imgA: imgA,
            imgB: imgB,
            imgC: imgC,
            size: size,
            quantity: quantity
        })
        await dbproduct.save()

        return res.status(201).json({
            ok: true,
            msg: 'Product created successfully'
        })
    } catch(error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: 'Please contact our support'
        })
    }
}

const updateProduct = async(req, res) => {
    const { name, price, description, clotheCollection, available, imgA, imgB, imgC, size, quantity } = req.body
    const { id } = req.params;
    try{
        const updatedData = {};
        if (name) updatedData.name = name;
        if (price) updatedData.price = price;
        if (description) updatedData.description = description;
        if (clotheCollection) updatedData.clotheCollection = clotheCollection;
        if (available) updatedData.available = available;
        if (imgA) updatedData.imgA = imgA;
        if (imgB) updatedData.imgB = imgB;
        if (imgC) updatedData.imgC = imgC;
        if (size) updatedData.size = size;
        if (quantity) updatedData.quantity = quantity;

        const product = await UserData.updateMany({ id: id }, updateProduct)
        if (!product) return res.status(404).json({
            ok: false,
            msg: 'Product not found'
        })

        return res.status(200).json({
            ok: true,
            msg: 'Product updated successfully',
        })
    } catch(error){
        console.log(error)
        return res.status(500).json({
            ok:false,
            msg: 'Please contact our support'
        })
    }
}

const getProductById = async(req, res) => {
    const {id} = req.params
    try{
        const product = await Product.findById({ _id: id });
        if(product){
            return res.status(200).json({
                ok: true,
                msg: product
            })
        }
        return res.status(404).json({
            ok: false,
            msg: 'product not found'
        })
    } catch(error) {
        console.log(error)
        return res.status(500).json({
            ok:false,
            msg: 'Please contact our support'
        })
    }
}


module.exports = {
    newProduct,
    updateProduct,
    getProductById
}