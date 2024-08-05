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
        if(!dbUser) return res.status(400).json({
            ok: false,
            msg: "User doesn't exist"
        })
        const validatePassword = bcrypt.compareSync(password, dbUser.password)
        if(!validatePassword) return res.status(400).json({
            ok: false,
            msg: "Incorrect password"
        })
        const token = await generateToken(dbUser._id, dbUser.email)

        return res.status(200).json({
            ok: true,
            msg: `${dbUser.email} Bienvenido`,
            token: token
        })

    } catch(error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: 'Please contact our support'
        })
    }
}

const updateUser = async(req, res) => {
    const password = req.body.password;
    const email = req.body.email;
    try{
        const updatedData = {};
        if (password) updatedData.password = password;
        const user = await User.findOneAndUpdate({ email: email }, updatedData)
        if (!user) return res.status(404).json({
            ok: false,
            msg: 'User not found'
        })

        const salt = bcrypt.genSaltSync()
        updatedData.password = bcrypt.hashSync( password, salt )
        await updatedData.save()

        return res.status(200).json({
            ok: true,
            msg: 'Password updated successfully',
            user: user
        })
    } catch(error){
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: 'Please contact our support'
        })
    }
}


module.exports = {
    createUser,
    loginUser,
    updateUser
}
