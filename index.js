// Dependencies
const cTable = require('console.table');
const { restoreDefaultPrompts } = require('inquirer');
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

function getAllEmployees(){
    db.query("SELECT * FROM employee", async function(err, results){
        const fullTable = await results;
        console.log(fullTable);
        return fullTable;
    });
};

function addDept(deptData){
    const sql = `INSERT INTO department (department_name)
                VALUES (?)`;
    const params = deptData;
    db.query(sql, params, async function(err, results){
        if(err){
            console.log(err);
        }
    });
}

// expected format for addRole object
// addRole({
//     title:'test role',
//     salary: 1000000000,
//     department_id: 1
// })

function addRole(roleData){
    const sql = `INSERT INTO employee_role (title, salary, department_id)
                VALUES (?, ?, ?)`;
    const params = [roleData.title, roleData.salary, roleData.department_id];
    db.query(sql, params, async function(err, results){
        if(err){
            console.log(err);
        }
        await getAllRoles();
    });
}

// expected format for addEmployee object
// addEmployee({
//     first_name: 'Ryne',
//     last_name: 'Waters',
//     role_id: 10,
//     manager_id: 9
// });

function addEmployee(employeeData){
    const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id)
                VALUES (?, ?, ?, ?)`;
    const params = [employeeData.first_name, 
                    employeeData.last_name, 
                    employeeData.role_id,
                    employeeData.manager_id];
    db.query(sql, params, async function(err, results){
        if(err){
            console.log(err);
        }
        await getAllEmployees();
    });
}

// expected format for changeRole function
// changeRole(3, 14);

function changeRole(newRole_id, employee_id){
    const sql = `UPDATE employee SET role_id = ? WHERE id = ?`
    const params = [newRole_id, employee_id];

    db.query(sql, params, async function(err, results){
        if(err){
            console.log(err);
        }
        await getAllEmployees();
    });
}

const questions = [
    {
        type: 'list',
        name: 'userSelection',
        message: "Welcome to the employee Database, please choose from the following options:",
        choices: [
                    'view all departments', 
                    'view all roles',
                    'view all employees',
                    'add a department',
                    'add a role',
                    'add an employee',
                    'update an employee'
                ],
        when: (answers) => answers.exit !== "exit"
    },
    {
        type: 'input',
        name: 'dept_name',
        message: "please enter the name of the department to add",
        when: (answers) => answers.userSelection === "add a department"
    }
];


// main function, calls the inquirer (in prompt.js) and processes the recieved data from user
function init(){
    inquirer
    .prompt(questions)
    .then((response) => {
        console.log(response);
        if(response.userSelection === 'view all departments'){
            getAllDept();
        }
        else if(response.userSelection === 'view all roles'){
            getAllRoles();
        }
        else if(response.userSelection === 'view all employees'){
            getAllEmployees();
        }
        else if(response.userSelection === 'add a department'){
            addDept(response.dept_name);
            getAllDept();
        }
        else if(response.userSelection === 'add a role'){
            console.log("feature coming soon");
        }
        else if(response.userSelection === 'add an employee'){
            console.log("feature coming soon");
        }
        else if(response.userSelection === 'update an employee'){
            console.log("feature coming soon");
        }
    });
}

init();