const User = require('./../models/Suscribe')

const SuscribeUser = async(req, res) => {
    const { name, email } = req.body
    try {
        const user = await User.findOne({ email: email });
        if(user) return res.status(400).json({
            ok: false,
            msg: `${email} has already been used`
        })

        const dbUserSuscribed = new UserSuscribed({
            name: name,
            email: email
        })
        await dbUserSuscribed.save()

        return res.status(201).json({
            ok: true,
            msg: 'User suscribed successfully'
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
    SuscribeUser
}