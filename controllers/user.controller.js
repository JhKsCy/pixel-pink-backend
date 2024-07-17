const User = require('./../models/User')
const bcrypt = require('bcrypt')
const { generateToken } = require('./../middlewares/jwtGenerate')

const createUser = async(req, res) => {
    const { email, password } = req.body
    try {
        const user = await User.findOne({ email: email });
        if(user) return res.status(400).json({
            ok: false,
            msg: `${email} has already been used`
        })

        const salt = bcrypt.genSaltSync()
        const dbUser = new User({
            email: email,
            password: password
        })
        dbUser.password = bcrypt.hashSync( password, salt )
        await dbUser.save()

        return res.status(201).json({

            ok: true,
            msg: 'User created successfully'
        })
    } catch(error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: 'Please contact our support'
        })
    }
}

const loginUser = async (req, res) => {
    const { email, password } = req.body
    try {
        const dbUser = await User.findOne ({ email });
        if(!dbuser) return res.status(400).json({
            ok: false,
            msg: "User doesn't exist"
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
    createUser
}
