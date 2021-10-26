-- all queries that were tested in workbench
-- note: some of these don't work or don't give back good data but were used to build the index.js queries

SELECT * FROM department;

SELECT employee_role.id, title, salary, department_name FROM employee_role JOIN department ON employee_role.department_id = department.id;

SELECT title, employee_role.id AS role_id, department_name, salary FROM employee_role JOIN department ON employee_role.department_id = department.id;

SELECT CONCAT(first_name, ' ', last_name) AS manager, employee.id FROM employee WHERE manager_id IS NULL;

SELECT title FROM employee_role;

INSERT INTO employee SET first_name="Tom", last_name="Riddle", role_id=1, manager_id=1;

SELECT * FROM employee;

SELECT * FROM employee JOIN employee_role ON employee_role.id = employee.role_id;

SELECT SUM(salary) AS budget FROM employee_role JOIN department ON employee_role.department_id = department.id WHERE department.id = 2;

SELECT e.first_name, e.last_name, e.id, employee_role.title, department.department_name, IFNULL(CONCAT (m.first_name, ' ', m.last_name), 'N/A') AS manager 
	FROM employee m 
    RIGHT JOIN employee e ON m.id = e.manager_id
    JOIN employee_role ON employee_role.id = e.role_id
    JOIN department ON employee_role.department_id = department.id
    ORDER BY e.id;
    
SELECT SUM(salary) AS budget 
	FROM employee
    JOIN employee_role ON employee_role.id = employee.role_id
    JOIN department ON employee_role.department_id = department.id
    WHERE department.id = 4;
    
SELECT e.first_name, e.last_name, e.id, employee_role.title, department.department_name, employee_role.salary 
	FROM employee m 
    RIGHT JOIN employee e ON m.id = e.manager_id
    JOIN employee_role ON employee_role.id = e.role_id
    JOIN department ON employee_role.department_id = department.id
    ORDER BY e.id;

UPDATE employee SET first_name="Tommy" WHERE id = 14;

DELETE FROM employee WHERE id = 14;

SELECT title, id, salary FROM employee_role;

SELECT department.id FROM department WHERE department_name ="Administration";

SELECT title FROM employee_role;

SELECT CONCAT(first_name, ' ', last_name) AS employee FROM employee ORDER BY employee.id;