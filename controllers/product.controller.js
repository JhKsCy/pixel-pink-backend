const Product = require('../models/Product')

const newProduct = async(req, res) => {
    const { name, description, price, available, img, imgDetail, imgAdd } = req.body
    try {
        const product = await Product.findOne({ name: name });
        if(product) return res.status(400).json({
            ok: false,
            msg: `${product} has already been created`
        })

        const dbproduct = new Product({
            name: name,
            description: description,
            price: price,
            available: available,
            img: img,
            imgDetail: imgDetail,
            imgAdd: imgAdd
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
    const { name, description, price, available, img, imgDetail, imgAdd } = req.body
    const { id } = req.params;
    try{
        const updatedData = {};
        if (name) updatedData.name = name;
        if (description) updatedData.description = description;
        if (price) updatedData.price = price;
        if (available) updatedData.available = available;
        if (img) updatedData.img = img;
        if (imgDetail) updatedData.imgDetail = imgDetail;
        if (imgAdd) updatedData.imgAdd = imgAdd;
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

module.exports = {
    newProduct,
    updateProduct
}