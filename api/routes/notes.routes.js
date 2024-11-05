const {Router} = require('express')

// controllers
// note controllers
const {
    getAllNotes,
    addNewNote,
    deleteNote,
} = require('../controllers/notes.controllers')

// middlewares
// images upload
const {imagesUpload} = require('../middlewares/file.upload.middlewares')

// router
const router = Router()

// get all notes
router.get('/',getAllNotes)

// add new note
router.post('/new',imagesUpload.array('images'),addNewNote)

// delete note
router.delete('/delete/:_id',deleteNote)

// exports
module.exports = router