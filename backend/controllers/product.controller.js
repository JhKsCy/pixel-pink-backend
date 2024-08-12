const Product = require('../models/Product')

const newProduct = async (req, res) => {
    const { name, price, description, clotheCollection, available, imgA, imgB, imgC } = req.body;

    if (!name || !price || !description || !clotheCollection || available === undefined || !imgA || !imgB || !imgC) {
        return res.status(400).json({
            ok: false,
            msg: 'All fields are required'
        });
    }

    try {
        const product = await Product.findOne({ name });

        if (product) {
            return res.status(400).json({
                ok: false,
                msg: `Product with name ${name} has already been created`
            });
        }

        const dbProduct = new Product({
            name,
            price,
            description,
            clotheCollection,
            available,
            imgA,
            imgB,
            imgC
        });

        await dbProduct.save();

        return res.status(201).json({
            ok: true,
            msg: 'Product created successfully'
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Please contact our support'
        });
    }
};

const updateProduct = async (req, res) => {
    const { name, price, description, clotheCollection, available, imgA, imgB, imgC } = req.body;
    const { id } = req.params;

    try {
        const updatedData = {};
        if (name) updatedData.name = name;
        if (price) updatedData.price = price;
        if (description) updatedData.description = description;
        if (clotheCollection) updatedData.clotheCollection = clotheCollection;
        if (available !== undefined) updatedData.available = available;
        if (imgA) updatedData.imgA = imgA;
        if (imgB) updatedData.imgB = imgB;
        if (imgC) updatedData.imgC = imgC;

        const product = await Product.findByIdAndUpdate(id, updatedData, { new: true });

        if (!product) {
            return res.status(404).json({
                ok: false,
                msg: 'Product not found'
            });
        }

        return res.status(200).json({
            ok: true,
            msg: 'Product updated successfully',
            product
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Please contact our support'
        });
    }
};

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