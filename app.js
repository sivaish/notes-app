const validator = require('validator')
const chalk = require('chalk')
const yargs = require('yargs')

const notes = require('./notes')

const log = console.log;

yargs.version('1.1.0')

// add command
yargs.command({
    command: 'add',
    description: 'Add a new note',
    builder: {
        title: {
            description: 'Title of the note you want to enter',
            demandOption: true,
            type: 'string'
        },
        body: {
            description: 'Body of the title you want to enter',
            demandOption: true,
            type: 'string'
        }
    },
    handler: function (argv) {
        notes.addNotes(argv.title, argv.body)
    }
})

// remove command
yargs.command({
    command: 'remove',
    description: 'Remove a note',
    builder: {
        title: {
            description: 'Title of the note you want to remove',
            demandOption: true,
            type: 'string'
        }
    },
    handler: function (argv) {
        notes.removeNote(argv.title)
    }
})

// list command
yargs.command({
    command: 'list',
    description: 'list the specific note',
    builder: {
        title: {
            description: 'Title of the note you want to list',
            demandOption: true,
            type: 'string'
        }
    },
    handler: function (argv) {
        notes.listTheNote(argv.title)
    }
})

// read command
yargs.command({
    command: 'read',
    description: 'read all the notes',
    handler: function () {
        notes.readAllNotes()
    }
})

yargs.parse()