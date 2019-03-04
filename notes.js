const fs = require('fs')
const chalk = require('chalk')

const getNotes = function (notes) {
    return notes
}

const addNotes = function (title, body) {
    const notes = loadNotes()
    const duplicateNotes = notes.filter(function (note) {
        return note.title === title
    })

    if (duplicateNotes.length === 0) {
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log(chalk.inverse.green('Note added to the list'));
    } else {
        console.log(chalk.inverse.red('Note title already exist'));
    }
}

const removeNote = function (title) {
    const notes = loadNotes()
    const notesToKeep = notes.filter(function (note) {
        return note.title !== title
    })
    
    if (notes.length > notesToKeep.length) {
        console.log(chalk.inverse.green(`Title ${title} removed from the notes`))
        saveNotes(notesToKeep)
    } else {
       console.log(chalk.inverse.red(`Title - ${title} not found in the notes`))
    }
}

const listTheNote = function(title) {
    const notes = loadNotes()
    const noteList = notes.filter(function (note) {
        return note.title === title
    })
    console.log(noteList)
}

const readAllNotes = function () {
    if (readAllNotes.length < 1) {
        console.log(chalk.inverse.red(`Notes empty!!`))
    } else {
        console.log(loadNotes());
    }
}

const loadNotes = function () {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch (e) {
        return []
    }
}

const saveNotes = function (notes) {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)

}

module.exports = {
    getNotes: getNotes,
    addNotes: addNotes,
    removeNote: removeNote,
    listTheNote: listTheNote,
    readAllNotes: readAllNotes
}