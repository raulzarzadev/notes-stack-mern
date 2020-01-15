const notesCtrl = {};

const Note = require('../models/Note')


notesCtrl.getNotes = async (req, res) => {
    const notes = await Note.find()
    res.json(notes)
};

notesCtrl.getNote = async (req, res) => {
    const note = await Note.findById(req.params.id)
    res.json(note)
};

notesCtrl.createNote = async (req, res) => {
    const { title, description, author, date } = req.body
    const newNote = new Note({
        title: title,
        description: description,
        author : author,
        date: date
    })
    await newNote.save()
    res.json(newNote)
};

notesCtrl.deleteNote = async (req, res) => {
    await Note.findByIdAndRemove(req.params.id)
    res.json({message: 'nota eliminada'})
};

notesCtrl.updateNote = async (req, res) => {
    const {title, description, author} = req.body
    await Note.findByIdAndUpdate(req.params.id, {
        title,
        description,
        author
    })
    res.json({ message: 'Actualizando nota' })
};

module.exports = notesCtrl