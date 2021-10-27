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

// Makes a query to the database to get back all departments 
async function getAllDept(){
        const fullTable = await db.promise().query("SELECT department_name AS department, department.id AS department_id FROM department");
        console.log('----------------------------------------');
        console.table(fullTable[0]);
        // main function is called again after the query is performed
        init();
};

// Makes a query to the database to get back all roles
async function getAllRoles(){
    const fullTable = await db.promise().query("SELECT title AS job_title, employee_role.id AS role_id, department_name, salary FROM employee_role JOIN department ON employee_role.department_id = department.id");
        console.log('---------------------------------------------------------');
        console.table(fullTable[0]);
        init();
};

// Makes a query to the database to get back all employees and their relevant role, salary, department and manager (using three seperate JOIN statements)
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

// makes an insert query to add a department to database
async function addDept(deptData){
    const sql = `INSERT INTO department (department_name)
                VALUES (?)`;
    const params = deptData;
    const addedDept = await db.promise().query(sql, params);
    console.log('new department added!');
    init();
}

// makes an insert query to add a role to the database
async function addRole(role, salary, department){
    const sql = `INSERT INTO employee_role (title, salary, department_id)
                VALUES (?, ?, ?)`;
    const params = [role, salary, department];
    const addedRole = await db.promise().query(sql, params);
    console.log('new role added!');
    init();
}

// makes an insert query to add an employee to the database
async function addEmployee(firstName, lastName, roleId, managerId){
    const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id)
                VALUES (?, ?, ?, ?)`;
    const params = [firstName, lastName, roleId, managerId];
    const addedEmployee = await db.promise().query(sql, params);
    console.log('new employee added!');
    init();
}

// makes an update query to change the role of a certain employee
async function changeRole(newRoleId, employeeId){
    const sql = `UPDATE employee SET role_id = ? WHERE id = ?`
    const params = [newRoleId, employeeId];

    const updatedEmployee = await db.promise().query(sql, params);
    console.log("employee role updated");
    init();
}

// makes a query to the database that gets returns all salaries of employees in a given department 
async function viewBudget(deptData, deptName){
    const sql = `SELECT SUM(salary) AS budget 
                    FROM employee
                    JOIN employee_role ON employee_role.id = employee.role_id
                    JOIN department ON employee_role.department_id = department.id
                    WHERE department.id = ?;`;
    const params = deptData;
    const budget = await db.promise().query(sql, params);
    console.log('---------------------------');
    console.log(deptName);
    console.table(budget[0]);
    init();
}

// The following queries are made before inquirer runs, since we need this data to ask the user questions
// makes a query to the database to get the current names of all departments
async function getDeptChoices(){
    const deptList = await db.promise().query(`SELECT department_name FROM department;`)
    const sortedDepts = [];
    deptList[0].forEach(element => {
        sortedDepts.push(element.department_name);
    })
    return sortedDepts;
}

// makes a query to the database to get the current names of all roles
async function getRoleChoices(){
    const roleList = await db.promise().query(`SELECT title FROM employee_role;`)
    const sortedRoles = [];
    roleList[0].forEach(element => {
        sortedRoles.push(element.title);
    })
    return sortedRoles;
}

// makes a query to the database to get the current names and associated IDs of all employees with a 'null' manager value indicating that they are themselves managers
async function getManagers(){
    let managerList = await db.promise().query(`SELECT CONCAT(first_name, ' ', last_name) AS manager, employee.id FROM employee WHERE manager_id IS NULL;`)
    managerList = managerList[0];
    return managerList;
}

// makes a query to the database to get the current names of all employees concated together
async function getEmployees(){
    const employeeList = await db.promise().query(`SELECT CONCAT(first_name, ' ', last_name) AS employee FROM employee ORDER BY employee.id;`);
    const sortedRoles = [];
    employeeList[0].forEach(element => {
        sortedRoles.push(element.employee);
    })
    return sortedRoles;
}



// main function has to be declared async so that we can use await on the database queries to populate inqurirer
async function init(){

    // make some database calls to populate user prompts with an array based on the database query
    const deptChoices = await getDeptChoices();
    const roleChoices = await getRoleChoices();
    const managerList = await getManagers();
    const employeeChoices = await getEmployees();

    // because managers aren't in sequential order, we get back an object (which we will use later) and we create the prompt array here
    const managerNames = [];
    managerList.forEach(element => managerNames.push(element.manager))

    // inqurier prompts, note that the fields are dynamic filled by our database queries which update as new dept, roles and employees are added
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
                        'view department budget',
                        'exit application'
                    ],
        },
        {
            type: 'input',
            name: 'deptName',
            message: "please enter the name of the department to add",
            when: (answers) => answers.userSelection === "add a department"
        },
        {
            type: 'input',
            name: 'roleName',
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
            message: "please enter the department that the role belongs to",
            choices: deptChoices,
            when: (answers) => answers.userSelection === "add a role"
        },
        {
            type: 'input',
            name: 'firstName',
            message: "please enter the first name of the employee to add",
            when: (answers) => answers.userSelection === "add an employee"
        },
        {
            type: 'input',
            name: 'lastName',
            message: "please enter the last name of the employee to add",
            when: (answers) => answers.userSelection === "add an employee"
        },
        {
            type: 'list',
            name: 'role',
            message: "please select the role of the employee to add",
            choices: roleChoices,
            when: (answers) => answers.userSelection === "add an employee"
        },
        {
            type: 'list',
            name: 'manager',
            message: "please select the manager of the employee to add",
            choices: managerNames,
            when: (answers) => answers.userSelection === "add an employee"
        },
        {
            type: 'list',
            name: 'employee',
            message: "please choose the employee that you would like to update",
            choices: employeeChoices,
            when: (answers) => answers.userSelection === "update an employee"
        },
        {
            type: 'list',
            name: 'newRole',
            message: "please enter the employee's new role",
            choices: roleChoices,
            when: (answers) => answers.userSelection === "update an employee"
        },
        {
            type: 'list',
            name: 'budget',
            message: "please enter the department you want to view the budget of",
            choices: deptChoices,
            when: (answers) => answers.userSelection === "view department budget"
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
            addDept(response.deptName);
        }
        else if(response.userSelection === 'add a role'){
            // because the order is presevered, we can use indexOf method to get the department id associated with the dept the user entered
            // we do +1 since arrays start at 0 but databases start at 1 to prevent OffByOne error
            const id = deptChoices.indexOf(response.dept) + 1;
            addRole(response.roleName, response.salary, id);
        }
        else if(response.userSelection === 'add an employee'){
            // same as above for employee role, but for manager column we need to find their employee id
            // we use the array of manager objects {name: , id: } to find the manager id associated with the name the user picked
            const id = roleChoices.indexOf(response.role) + 1;
            const myManager = managerList.find(element => element.manager === response.manager);
            addEmployee(response.firstName, response.lastName, id, myManager.id);
        }
        else if(response.userSelection === 'update an employee'){
            const employeeId = employeeChoices.indexOf(response.employee) + 1;
            const newRoleId = roleChoices.indexOf(response.newRole) + 1;
            changeRole(newRoleId, employeeId);

        }
        else if(response.userSelection === 'view department budget'){
            const id = deptChoices.indexOf(response.budget) + 1;
            viewBudget(id, response.budget);
        }
        else{
            console.log("Exiting app. Goodbye!")
            process.exit();
        }
    });
}

init();