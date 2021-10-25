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

function addDept(deptData){
    const sql = `INSERT INTO department (department_name)
                VALUES (?)`
    const params = deptData;
    db.query(sql, params, async function(err, results){
        if(err){
            console.log(err);
        }
    });
}

// takes in an object(?) as a variable
function addRole(roleData){
    const sql = `INSERT INTO employee_role (title, salary, department_id)
                VALUES (?, ?, ?)`
    const params = [roleData.title, roleData.salary, roleData.department_id];
    db.query(sql, params, async function(err, results){
        if(err){
            console.log(err);
        }
        await getAllRoles();
    });
}

addRole({
    title:'test role',
    salary: 1000000000,
    department_id: 1
})