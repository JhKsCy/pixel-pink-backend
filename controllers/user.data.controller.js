const UserData = require('./../models/UserData')

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

const updateUserData = async(req, res) => {
    const { name, lastName, phone, state, city, addres, postalCode } = req.body
    const { id } = req.params;
    try{
        const updatedData = {};
        if (name) updatedData.name = name;
        if (lastName) updatedData.lastName = lastName;
        if (phone) updatedData.phone = phone;
        if (state) updatedData.state = state;
        if (city) updatedData.city = city;
        if (addres) updatedData.addres = addres;
        if (postalCode) updatedData.postalCode = postalCode;
        const user = await UserData.updateMany({ id: id }, updateUserData)
        if (!user) return res.status(404).json({
            ok: false,
            msg: 'User not found'
        })

        return res.status(200).json({
            ok: true,
            msg: 'Data updated successfully',
        })
    } catch(error){
        console.log(error)
        return res.status(500).json({
            ok:false,
            msg: 'Please contact our support'
        })
    }
}

const deleteUserData = async(req, res) => {
    const { id } = req.params;
    try {
        const dbUserData = await UserData.findOneAndDelete({ _id: id });
        if (dbUserData) return res.status(200).json({
            ok: true,
            msg: 'Data deleted successfully'
        })

        return res.status(404).json({
            ok: false,
            msg: 'Data not found'
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
    createUserData,
    updateUserData,
    deleteUserData
}
