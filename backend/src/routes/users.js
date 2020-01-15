const { Router } = require('express')
const { getUsers, deleteUser, updateUser, createUser } = require('../controllers/users.controller')
const router = Router();

router.route('/')
    .get(getUsers)
    .post(createUser)

router.route('/:id')
    .delete(deleteUser)
    .put(updateUser)

module.exports = router;