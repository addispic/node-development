const mongoose = require("mongoose");
const fs = require("fs");
// models
// notes
const Note = require("../models/notes.models");

// get all notes
const getAllNotes = async (req, res) => {
  try {
    const notes = await Note.find().sort({createdAt: -1});
    return res.status(200).json({ notes });
  } catch (err) {
    return res.status(400).json({ error: "get note error" });
  }
};

// add new note
const addNewNote = async (req, res) => {
  try {
    const { text } = req.body;
    let images = [];
    const files = req.files;
    if (files.length > 0) {
      files.forEach((fileItem) => images.push(fileItem.path));
    }
    const newNote = await Note.create({ text, images });
    return res.status(201).json({ newNote });
  } catch (err) {
    return res.status(400).json({ error: "add new note error" });
  }
};

// delete note
const deleteNote = async (req, res) => {
  try {
    const { _id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return res.status(400).json({ error: "invalid note _id" });
    }
    // is note exits
    const isNoteExist = await Note.findById(_id);
    if (!isNoteExist) {
      return res.status(400).json({ error: "note doesn't exist" });
    }
    if (isNoteExist.images.length > 0) {
      isNoteExist.images.forEach((imageItem) => {
        if (fs.existsSync(imageItem)) {
          fs.unlinkSync(imageItem);
        }
      });
    }
    await Note.findByIdAndDelete(_id);
    return res.status(200).json({ message: "note deleted successfully", _id });
  } catch (err) {
    return res.status(400).json({ error: "delete note error" });
  }
};

// exports
module.exports = {
  getAllNotes,
  addNewNote,
  deleteNote,
};
