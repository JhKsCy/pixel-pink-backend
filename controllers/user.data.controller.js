const User = require('./../models/UserData')

const createUserData = async(req, res) => {
    const { name, lastName, phone, state, city, addres, postalCode } = req.body
    try {
        const dbUserData = new UsersData({
            name: name,
            lastName: lastName,
            phone: phone,
            state: state,
            city: city,
            addres: addres,
            postalCode: postalCode
        })
        await dbUserData.save()

        return res.status(201).json({
            ok: true,
            msg: 'Data created successfully'
        })
    } catch(error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: 'Please contact our support'
        })
    }
}

module.exports = {
    createUserData
}
