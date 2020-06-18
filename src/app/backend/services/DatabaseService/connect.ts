import mysql from "mysql";

const database = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    port: +(process.env.DB_PORT || 3306),
    user: process.env.DB_USER || 'application',
    password: process.env.DB_PASS || '',
    database: process.env.DB_NAME || 'szkola'
})

database.on('error', error => {
    console.error("Database connection error!", error)
    if (error.fatal) {
        const { dialog } = require('electron').remote;
        dialog.showErrorBox('Database error', `Fatal database connection error: ${error.name}\nmessage: ${error.message}\ncode: ${error.errno}`)
    }
})

database.on('enqueue', thing => {
    if(thing?.constructor.name === 'Query')
        console.log(`Executing query: ${thing.sql}`)
})

export default database;
