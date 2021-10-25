INSERT INTO department (department_name)
VALUES  ("Administration"),
        ("Engineering"),
        ("Research"),
        ("Sales");

INSERT INTO employee_role (title, salary, department_id)
VALUES  ("Accountant", 120000, 1),
        ("Outside Consultant", 90000, 1),
        ("Client Outreach", 75000, 4),
        ("Lead Aetherologist", 100000, 3),
        ("Assistant Researcher", 50000, 3),
        ("Marketing", 80000, 4),
        ("Designer", 99000, 2),
        ("Junior Engineer", 85000, 2),
        ("Lead Engineer", 125000, 2);

-- INSERT INTO employee (first_name, last_name, role_id, manager_id)
-- VALUES  ("")