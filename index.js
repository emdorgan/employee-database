// <----------- Pseudocode

// Dependencies
const cTable = require('console.table');
const inquirer = require('inquirer');
const mysql = require('mysql2');

// connect to the database
const db = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'employee_db',
        password: 'password'
        },
    console.log(`Connected to the employee_db database.`)
);