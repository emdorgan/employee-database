-- seed data for the demonstration, using FFXIV characters

INSERT INTO department (department_name)
VALUES  ("Administration"),
        ("Engineering"),
        ("Research"),
        ("Sales");

INSERT INTO employee_role (title, salary, department_id)
VALUES  ("CEO", 150000, 1),
        ("Outside Consultant", 90000, 1),
        ("Communications Officer", 75000, 4),
        ("Lead Aetherologist", 100000, 3),
        ("Assistant Researcher", 60000, 3),
        ("Marketing Director", 80000, 4),
        ("Designer", 99000, 2),
        ("Junior Engineer", 85000, 2),
        ("Lead Engineer", 120000, 2),
        ("Client Fulfillment", 70000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES  ("Y'shtola", "Rhul", 4, null),
        ("Tataru", "Taru", 1, null),
        ("Fourchenault", "Leveilleur", 2, 2),
        ("Thancred", "Waters", 10, 1),
        ("Krile", "Mayer Baldesion", 5, 2),
        ("Urianger", "Augurelt", 9, null),
        ("Minfilia", "Warde", 6, null),
        ("G'raha", "Tia", 7, 6),
        ("Lysephria", "Maromyr", 3, null),
        ("Alphinaud", "Leveilleur", 3, 9),
        ("Lyse", "Hext", 3, 9),
        ("Papalymo", "Totolymo", 5, 1),
        ("Alisae", "Leveilleur", 8, 6);