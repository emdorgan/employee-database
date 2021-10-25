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

function getAllDept(){
    db.query("SELECT * FROM department", async function(err, results){
        const fullTable = await results;
        console.log(fullTable);
        return fullTable;
    });
};

function getAllRoles(){
    db.query("SELECT * FROM employee_role", async function(err, results){
        const fullTable = await results;
        console.log(fullTable);
        return fullTable;
    });
};

function getAllEmployee(){
    db.query("SELECT * FROM employee", async function(err, results){
        const fullTable = await results;
        console.log(fullTable);
        return fullTable;
    });
};