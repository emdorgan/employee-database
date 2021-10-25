INSERT INTO department (department_name)
VALUES  ("Administration"),
        ("Engineering"),
        ("Research"),
        ("Sales");

INSERT INTO employee_role (title, salary, department_id)
VALUES  ("Lead Accountant", 120000, 1),
        ("Outside Consultant", 90000, 1),
        ("Client Outreach", 75000, 4),
        ("Lead Aetherologist", 100000, 3),
        ("Assistant Researcher", 60000, 3),
        ("Marketing", 80000, 4),
        ("Designer", 99000, 2),
        ("Junior Engineer", 85000, 2),
        ("Lead Engineer", 125000, 2),
        ("Client Fulfillment", 70000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES  ("Y'shtola", "Rhul", 4, 1),
        ("Tataru", "Taru", 1, 2),
        ("Fourchenault", "Leveilleur", 2, 2),
        ("Thancred", "Waters", 10, 1),
        ("Krile", "Mayer Baldesion", 5, 2),
        ("Urianger", "Augurelt", 9, 6),
        ("Minfilia", "Warde", 6, 7),
        ("G'raha", "Tia", 7, 6),
        ("Alphinaud", "Leveilleur", 3, 10),
        ("Lysephria", "Maromyr", 3, 10),
        ("Lyse", "Hext", 3, 10),
        ("Papalymo", "Totolymo", 5, )

