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

// expected format for addRole object
// addRole({
//     title:'test role',
//     salary: 1000000000,
//     department_id: 1
// })

// expected format for addEmployee object
// addEmployee({
//     first_name: 'Ryne',
//     last_name: 'Waters',
//     role_id: 10,
//     manager_id: 9
// });

// expected format for changeRole function
// changeRole(3, 14);