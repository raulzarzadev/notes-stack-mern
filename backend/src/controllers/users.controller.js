const User = require('../models/User')
const usersCtrl = {}

usersCtrl.getUsers = async (req, res) => {
    const users = await User.find()
    res.json(users)
};



usersCtrl.createUser = (req, res) => {
    const { username } = req.body
    const newUser = new User ({
        username
    })
    res.json(newUser    )
    newUser.save();
}


usersCtrl.deleteUser = async(req, res) => {
    await User.findByIdAndDelete(req.params.id)
    res.json({ message: 'eliminando usuario' })
}


usersCtrl.updateUser = (req, res) => res.json({ message: 'actualizando usuario' })

module.exports = usersCtrl