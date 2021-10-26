// Dependencies
const cTable = require('console.table');
const { restoreDefaultPrompts } = require('inquirer');
const inquirer = require('inquirer');
const mysql = require('mysql2');
const Role = require('./lib/role');
const Employee = require('./lib/employee');

// connect to the database
const db = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'employee_db',
        password: 'password'
        },
    console.log(`Connected to the employee_db database.`)
);

async function getAllDept(){
        const fullTable = await db.promise().query("SELECT department_name AS department, department.id AS department_id FROM department");
        console.log('----------------------------------------');
        console.table(fullTable[0]);
        init();
};

async function getAllRoles(){
    const fullTable = await db.promise().query("SELECT title AS job_title, employee_role.id AS role_id, department_name, salary FROM employee_role JOIN department ON employee_role.department_id = department.id");
        console.log('---------------------------------------------------------');
        console.table(fullTable[0]);
        init();
};

async function getAllEmployees(){
    const fullTable = await db.promise().query(`SELECT e.first_name, e.last_name, e.id AS employee_id, employee_role.title AS job_title, department.department_name, employee_role.salary, IFNULL(CONCAT (m.first_name, ' ', m.last_name), 'N/A') AS manager 
                                                    FROM employee m 
                                                    RIGHT JOIN employee e ON m.id = e.manager_id
                                                    JOIN employee_role ON employee_role.id = e.role_id
                                                    JOIN department ON employee_role.department_id = department.id
                                                    ORDER BY e.id`);
        console.log('-----------------------------------------------------------------------------------------------------------');
        console.table(fullTable[0]);
        init();
};

async function addDept(deptData){
    const sql = `INSERT INTO department (department_name)
                VALUES (?)`;
    const params = deptData;
    const addedDept = await db.promise().query(sql, params);
    console.log('new department added!');
    init();
}

// expected format for addRole object
// addRole({
//     title:'test role',
//     salary: 1000000000,
//     department_id: 1
// })



async function addRole(role, salary, department){

    // const deptId = await db.promise().query(`SELECT department.id FROM department WHERE department_name =?`, department);

    const sql = `INSERT INTO employee_role (title, salary, department_id)
                VALUES (?, ?, ?)`;
    const params = [role, salary, department];
    const addedRole = await db.promise().query(sql, params);
    console.log('new role added!');
    init();
}

// expected format for addEmployee object
// addEmployee({
//     first_name: 'Ryne',
//     last_name: 'Waters',
//     role_id: 10,
//     manager_id: 9
// });

async function addEmployee(employeeData){
    const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id)
                VALUES (?, ?, ?, ?)`;
    const params = [employeeData.first_name, 
                    employeeData.last_name, 
                    employeeData.role_id,
                    employeeData.manager_id];
    const addedEmployee = await db.promise().query(sql, params);
    console.log('new employee added!');
}

// expected format for changeRole function
// changeRole(3, 14);

async function changeRole(newRole_id, employee_id){
    const sql = `UPDATE employee SET role_id = ? WHERE id = ?`
    const params = [newRole_id, employee_id];

    const updatedEmployee = await db.promise().query(sql, params);
    console.log("employee role updated");
}

async function getDeptChoices(){
    const deptList = await db.promise().query(`SELECT department_name FROM department;`)
    const sortedArray = [];
    deptList[0].forEach(element => {
        sortedArray.push(element.department_name);
    })
    return sortedArray;
}


// main function, calls the inquirer (in prompt.js) and processes the recieved data from user
async function init(){
    const DeptChoices = await getDeptChoices();
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
                        'update an employee',
                        'exit application'
                    ],
        },
        {
            type: 'input',
            name: 'dept_name',
            message: "please enter the name of the department to add",
            when: (answers) => answers.userSelection === "add a department"
        },
        {
            type: 'input',
            name: 'role_name',
            message: "please enter the name of the role to add",
            when: (answers) => answers.userSelection === "add a role"
        },
        {
            type: 'input',
            name: 'salary',
            message: "please enter the salary of the role to add",
            when: (answers) => answers.userSelection === "add a role"
        },
        {
            type: 'list',
            name: 'dept',
            message: "please enter the department of the role to add",
            choices: DeptChoices,
            when: (answers) => answers.userSelection === "add a role"
        }
    ];
    inquirer
    .prompt(questions)
    .then((response) => {
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
        }
        else if(response.userSelection === 'add a role'){
            const ID = DeptChoices.indexOf(response.dept) + 1;
            console.log(ID);
            addRole(response.role_name, response.salary, ID);
        }
        else if(response.userSelection === 'add an employee'){
            console.log("feature coming soon");
        }
        else if(response.userSelection === 'update an employee'){
            console.log("feature coming soon");
        }
        else{
            console.log("Exiting app. Goodbye!")
            process.exit();
        }
    });
}

init();