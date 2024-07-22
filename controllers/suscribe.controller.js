const User = require('./../models/Suscribe')

const suscribeUser = async(req, res) => {
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

const deleteSuscribedUser = async(req, res) => {
    const {email} = req.param
    try{
        const user = await User.findOneAndDelete({ email: email });
        if(user) return res.status(200).json({
            ok: true,
            msg: 'The user has been successfully removed from our subscription'
        })

        return res.status.json({
            ok: false,
            msg: `${email} is not suscribed`
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
    suscribeUser,
    deleteSuscribedUser
}