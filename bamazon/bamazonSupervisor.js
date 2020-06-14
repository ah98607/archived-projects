"use strict";
(function() {

	// mysql config
	var mysql = require("mysql");
	var connection = mysql.createConnection({
		host: "localhost",
		user: "root",
		password: "mysql123",
		database : "bamazon_db"
	});

	// inquirer config
	var inquirer = require("inquirer");
	var supervisorAction;
	inquirer.prompt(
		[{
			type: "checkbox",
			message: "Supervisor options",
			name: "supervisorAction",
			choices: [
			"View Product Sales by Department",
			"Create New Department"
			]
		}]).then(function(response) {
			if (response.supervisorAction.length != 1) {
				console.log("Please select only 1 option.");
				return;
			}
			supervisorAction = response.supervisorAction[0];
			//console.log(supervisorAction);
			switch(supervisorAction) {
				case "View Product Sales by Department": {
					viewProductSalesByDepartment();
					break;
				}
				case "Create New Department": {
					createNewDepartment();
					break;
				}
				default: {
					console.log("Error Selection");
					break;
				}
			}
		});

	function viewProductSalesByDepartment() {
		connection.connect();
		var queryString = "SELECT "
		+ "dp.department_id, "
		+ "dp.department_name, "
		+ "dp.over_head_costs, "
		+ "SUM(it.product_sales), " 
		+ "SUM(it.product_sales) - dp.over_head_costs "
		+ "FROM departments AS dp INNER JOIN items AS it " 
		+ "ON it.department_name = dp.department_name "
		+ "GROUP BY department_id";
		//console.log("DEBUG: " + queryString);
		connection.query(queryString, function (error, results, fields) {
			if (error) {
				throw error;
			}
			else {
				for (var i = 0; i < results.length; i++) {
					console.log("#" + results[i].department_id 
						+ " | Department: " + results[i].department_name 
						+ " | Overhead Cost: " + results[i].over_head_costs 
						+ " | Sales: " + results[i]['SUM(it.product_sales)'] 
						+ " | Profit: " + results[i]['SUM(it.product_sales) - dp.over_head_costs']);
				}
				connection.end();
			}
		});
	}
	function createNewDepartment() {
		inquirer.prompt(
		[{
			type: "input",
			message: "Please enter a new department name",
			name: "departmentName"
		},
		{
			type: "input",
			message: "Please enter an initaial over head cost",
			name: "initialTotalCost"
		}]).then(function(response) {
			var departmentName = response.departmentName;
			var initialTotalCost = parseInt(response.initialTotalCost);
			if (departmentName && initialTotalCost) {
				connection.connect();
				var queryString = "INSERT INTO departments (department_name, over_head_costs) VALUE (\"" + departmentName + "\", " + initialTotalCost + ")";
				console.log(queryString);
				connection.query(queryString, function (error, results, fields) {
					if (error) {
						throw error;
					}
					else {
						console.log("New department was added successfully")
						connection.end();
					}
				});
			}
		});
	}
})();