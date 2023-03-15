const { prompt } = require("inquirer");
const logo = require("asciiart-logo");
const db = require("./db");
require("console.table");

init();

function init() {
    const logoText = logo({ name: "Employee Manager" }).render();

    console.log(logoText);

    loadMainPrompts();
}

function loadMainPrompts() {
    prompt([
        {
            type: "list",
            name: "choice",
            message: "What would you like to do?",
            choices: [
                {
                    name: "View All Employees",
                    value: "VIEW_EMPLOYEES"
                },
                {
                    name: "View All Employees By Department",
                    value: "VIEW_EMPLOYEES_BY_DEPARTMENT"
                },
                {
                    name: "View All Employees By Manager",
                    value: "VIEW_EMPLOYEES_BY_MANAGER"
                },
                {
                    name: "Add Employee",
                    value: "ADD_EMPLOYEE"
                },
                {
                    name: "Remove Employee",
                    value: "REMOVE_EMPLOYEE"
                },
                {
                    name: "Update Employee Role",
                    value: "UPDATE_EMPLOYEE_ROLE"
                },
                {
                    name: "Update Employee Manager",
                    value: "UPDATE_EMPLOYEE_MANAGER"
                },
                {
                    name: "View All Roles",
                    value: "VIEW_ROLES"
                },
                {
                    name: "Add Role",
                    value: "ADD_ROLE"
                },
                {
                    name: "Remove Role",
                    value: "REMOVE_ROLE"
                },
                {
                    name: "View All Departments",
                    value: "VIEW_DEPARTMENTS"
                },
                {
                    name: "Add Department",
                    value: "ADD_DEPARTMENT"
                },
                {
                    name: "Remove Department",
                    value: "REMOVE_DEPARTMENT"
                },
                {
                    name: "Quit",
                    value: "QUIT"
                }
            ]
        }
    ]).then(res => {
        let choice = res.choice;
        switch (choice) {
            case "VIEW_EMPLOYEES":
                return viewEmployees();
            case "VIEW_EMPLOYEES_BY_DEPARTMENT":
                return viewEmployeesByDepartment();
            case "VIEW_EMPLOYEES_BY_MANAGER":
                return viewEmployeesByManager();
            case "ADD_EMPLOYEE":
                return addEmployee();
            case "REMOVE_EMPLOYEE":
                return removeEmployee();
            case "UPDATE_EMPLOYEE_ROLE":
                return updateEmployeeRole();
            case "UPDATE_EMPLOYEE_MANAGER":
                return updateEmployeeManager();
            case "VIEW_ROLES":
                return viewRoles();
            case "ADD_ROLE":
                return addRole();
            case "REMOVE_ROLE":
                return removeRole();
            case "VIEW_DEPARTMENTS":
                return viewDepartments();
            case "ADD_DEPARTMENT":
                return addDepartment();
            case "REMOVE_DEPARTMENT":
                return removeDepartment();
            default:
                return quit();
        }
    })
}

function viewEmployees() {
    db.findAllEmployees().then(([rows]) => {
        let employees = rows;
        console.log("\n");
        console.table(employees);
    })
        .then(() => loadMainPrompts());
}

function viewEmployeesByDepartment() {
    db.findAllDepartments().then(([rows]) => {
        const departments = rows;
        const departmentChoices = departments.map(({ id, name }) => ({
            name: name,
            value: id
        }));

        prompt([
            {
                type: "list",
                name: "departmentId",
                message: "Which department would you like to see employees for?",
                choices: departmentChoices
            }
        ]).then(res => db.findAllEmployeesByDepartment(res.departmentId))
            .then(([rows]) => {
                let employees = rows;
                console.log("\n");
                console.table(employees);
            })
            .then(() => loadMainPrompts())
    });

function viewEmployeesByManager() {
            db.findAllEmployees().then(([rows]) => {
                const employees = rows;
                const managerChoices = employees.map(({ id, first_name, last_name }) => ({
                    name: `${first_name} ${last_name}`,
                    value: id
                }));

                prompt([
                    {
                        type: "list",
                        name: "managerId",
                        message: "Which manager would you like to see employees for?",
                        choices: managerChoices
                    }
                ]).then(res => db.findAllEmployeesByManager(res.managerId))
                    .then(([rows]) => {
                        let employees = rows;
                        console.log("\n");
                        console.table(employees);
                    })
                    .then(() => loadMainPrompts())
            });
        }

function removeEmployee() {
                    db.findAllEmployees().then(([rows]) => {
                        let employees = rows;
                        const employeeChoices = employees.map(({ id, first_name, last_name }) => ({
                            name: `${first_name} ${last_name}`,
                            value: id
                        }));

                        prompt([
                            {
                                type: "list",
                                name: "employeeId",
                                message: "Which employee would you like to remove?",
                                choices: employeeChoices
                            }
                        ]).then(res => db.removeEmployee(res.employeeId))
                            .then(() => console.log("Removed employee from the database"))
                            .then(() => loadMainPrompts());
                    });
                }

function updateEmployeeRole() {
                    db.findAllEmployees().then(([rows]) => {
                        let employees = rows;
                        const employeeChoices = employees.map(({ id, first_name, last_name }) => ({
                            name: `${first_name} ${last_name}`,
                            value: id
                        }));

                        const roles = db.findAllRoles();

                        let roleChoices = roles.map(role => ({
                            name: role.title,
                            value: role.id
                        }));

                        prompt([
                            {
                                type: "list",
                                name: "employeeId",
                                message: "Which employee's role do you want to update?",
                                choices: employeeChoices
                            },
                            {
                                type: "list",
                                name: "roleId",
                                message: "Which role do you want to assign the selected employee?",
                                choices: roleChoices
                            }
                        ]).then(res => db.updateEmployeeRole(res))
                            .then(() => console.log("Updated employee's role"))
                            .then(() => loadMainPrompts());
                    });
                }

function updateEmployeeManager() {
                    db.findAllEmployees().then(([rows]) => {
                        let employees = rows;
                        const employeeChoices = employees.map(({ id, first_name, last_name }) => ({
                            name: `${first_name} ${last_name}`,
                            value: id
                        }));

                        prompt([
                            {
                                type: "list",
                                name: "employeeId",
                                message: "Which employee's manager do you want to update?",
                                choices: employeeChoices
                            },
                            {
                                type: "list",
                                name: "managerId",
                                message: "Which employee do you want to set as manager?",
                                choices: employeeChoices
                            }
                        ]).then(res => db.updateEmployeeManager(res))
                            .then(() => console.log("Updated employee's manager"))
                            .then(() => loadMainPrompts());
                    });
                }
            
function viewRoles() {
                    db.findAllRoles().then(([rows]) => {
                        let roles = rows;
                        console.log("\n");
                        console.table(roles);
                    })
                        .then(() => loadMainPrompts());
                }

function addRole() {
                    db.findAllDepartments().then(([rows]) => {
                        let departments = rows;
                        const departmentChoices = departments.map(({ id, name }) => ({
                            name: name,
                            value: id
                        }));

                        prompt([
                            {
                                name: "title",
                                message: "What is the name of the role?"
                            },
                            {
                                name: "salary",
                                message: "What is the salary of the role?"
                            },
                            {
                                type: "list",
                                name: "department_id",
                                message: "Which department does the role belong to?",
                                choices: departmentChoices
                            }
                        ]).then(role => db.createRole(role))
                            .then(() => console.log(`Added a new role to the database`))
                            .then(() => loadMainPrompts());
                    });
                }

function removeRole() {
                    db.findAllRoles().then(([rows]) => {
                        let roles = rows;
                        const roleChoices = roles.map(({ id, title }) => ({
                            name: title,
                            value: id
                        }));

                        prompt([
                            {
                                type: "list",
                                name: "roleId",
                                message: "Which role would you like to remove?",
                                choices: roleChoices
                            }
                        ]).then(res => db.removeRole(res.roleId))
                            .then(() => console.log("Removed role from the database"))
                            .then(() => loadMainPrompts());
                    });
                }

function viewDepartments() {
                    db.findAllDepartments().then(([rows]) => {
                        let departments = rows;
                        console.log("\n");
                        console.table(departments);
                    })
                        .then(() => loadMainPrompts());
                }

function addDepartment() {
                    prompt([
                        {
                            name: "name",
                            message: "What is the name of the department?"
                        }
                    ]).then(department => db.createDepartment(department))
                        .then(() => console.log(`Added a new department to the database`))
                        .then(() => loadMainPrompts());
                }

function removeDepartment() {
                    db.findAllDepartments().then(([rows]) => {
                        let departments = rows;
                        const departmentChoices = departments.map(({ id, name }) => ({
                            name: name,
                            value: id
                        }));

                        prompt([
                            {
                                type: "list",
                                name: "departmentId",
                                message: "Which department would you like to remove?",
                                choices: departmentChoices
                            }
                        ]).then(res => db.removeDepartment(res.departmentId))
                            .then(() => console.log("Removed department from the database"))
                            .then(() => loadMainPrompts());
                    });
                }

function viewBudget() {
                    db.findAllDepartments().then(([rows]) => {
                        let departments = rows;
                        const departmentChoices = departments.map(({ id, name }) => ({
                            name: name,
                            value: id
                        }));

                        prompt([
                            {
                                type: "list",
                                name: "departmentId",
                                message: "Which department's budget would you like to view?",
                                choices: departmentChoices
                            }
                        ]).then(res => db.viewBudget(res.departmentId))
                            .then(([rows]) => {
                                let budget = rows;
                                console.log("\n");
                                console.table(budget);
                            })
                            .then(() => loadMainPrompts());
                    });
                }

                function addEmployee() {
                    prompt([
                        {
                            name: "first_name",
                            message: "What is the employee's first name?"
                        },
                        {
                            name: "last_name",
                            message: "What is the employee's last name?"
                        }
                    ])
                        .then(res => {
                            let firstName = res.first_name;
                            let lastName = res.last_name;

                            db.findAllRoles()
                                .then(([rows]) => {
                                    let roles = rows;
                                    const roleChoices = roles.map(({ id, title }) => ({
                                        name: title,
                                        value: id
                                    }));

                                    prompt({
                                        type: "list",
                                        name: "roleId",
                                        message: "What is the employee's role?",
                                        choices: roleChoices
                                    })
                                        .then(res => {
                                            let roleId = res.roleId;

                                            db.findAllEmployees()
                                                .then(([rows]) => {
                                                    let employees = rows;
                                                    const managerChoices = employees.map(({ id, first_name, last_name }) => ({
                                                        name: `${first_name} ${last_name}`,
                                                        value: id
                                                    }));

                                                    managerChoices.unshift({ name: "None", value: null });

                                                    prompt({
                                                        type: "list",
                                                        name: "managerId",
                                                        message: "Who is the employee's manager?",
                                                        choices: managerChoices
                                                    })
                                                        .then(res => {
                                                            let employee = {
                                                                manager_id: res.managerId,
                                                                role_id: roleId,
                                                                first_name: firstName,
                                                                last_name: lastName
                                                            }

                                                            db.createEmployee(employee);
                                                        })
                                                        .then(() => console.log(
                                                            `Added ${firstName} ${lastName} to the database`
                                                        ))
                                                        .then(() => loadMainPrompts())
                                                })
                                        })
                                })
                        })
                }

                    function quit() {
                    console.log("Goodbye!");
                    process.exit();
                }};