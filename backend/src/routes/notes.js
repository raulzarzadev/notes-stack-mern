const { Router } = require('express')
const { getNotes, createNote, deleteNote, getNote, updateNote} = require('../controllers/notes.controller')
const router = Router();

router.route('/')
    .get(getNotes)
    .post(createNote)

router.route('/:id')
    .get(getNote)
    .delete(deleteNote)
    .put(updateNote)

    
module.exports = router;