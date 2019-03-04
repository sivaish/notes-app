const fs = require('fs')
const chalk = require('chalk')

debugger

const addNotes = (title, body) => {
    const notes = loadNotes()
    const duplicateNotes = notes.find( (note) => note.title === title)

    if (!duplicateNotes) {
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

const removeNote = (title) => {
    const notes = loadNotes()
    const notesToKeep = notes.filter( (note) => note.title !== title)
    
    if (notes.length > notesToKeep.length) {
        console.log(chalk.inverse.green(`Title ${title} removed from the notes`))
        saveNotes(notesToKeep)
    } else {
       console.log(chalk.inverse.red(`Title - ${title} not found in the notes`))
    }
}

const listTheNote = (title) => {
    const notes = loadNotes()
    const noteList = notes.filter( (note) => {
        return note.title === title
    })
    console.log(noteList)
}

const readAllNotes = () => {
    if (readAllNotes.length < 1) {
        console.log(chalk.inverse.red(`Notes empty!!`))
    } else {
        console.log(loadNotes());
    }
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes-arrow-ec2.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch (e) {
        return []
    }
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes-arrow-ec2.json', dataJSON)

}

module.exports = {
    addNotes: addNotes,
    removeNote: removeNote,
    listTheNote: listTheNote,
    readAllNotes: readAllNotes
}