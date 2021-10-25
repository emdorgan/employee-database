SELECT * FROM department;

SELECT * FROM employee WHERE manager_id=1;

INSERT INTO employee SET first_name="Tom", last_name="Riddle", role_id=1, manager_id=1;

SELECT * FROM employee;

SELECT * FROM employee JOIN employee_role ON employee_role.id = employee.role_id;

UPDATE employee SET first_name="Tommy" WHERE id = 14;

DELETE FROM employee WHERE id = 14;