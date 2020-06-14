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
	var adminAction;
	inquirer.prompt(
		[{
			type: "checkbox",
			message: "Administrator options",
			name: "adminAction",
			choices: [
			"View Products for Sale",
			"View Low Inventory",
			"Add to Inventory",
			"Add New Product"]
		}]).then(function(response) {
			if (response.adminAction.length != 1) {
				console.log("Please select only 1 option.");
				return;
			}
			adminAction = response.adminAction[0];
			//console.log(adminAction);
			switch(adminAction) {
				case "View Products for Sale": {
					viewProductsForSale();
					break;
				}
				case "View Low Inventory": {
					viewLowInventory();
					break;
				}
				case "Add to Inventory": {
					addToInventory();
					break;
				}
				case "Add New Product": {
					addNewProduct();
					break;
				}
				default: {
					console.log("Error Selection");
					break;
				}
			}
		});

	function viewProductsForSale() {
		connection.connect();
		var queryString = "SELECT * FROM items";
		connection.query(queryString, function (error, results, fields) {
			if (error) {
				throw error;
			}
			else {
				if (results.length == 0) {
					console.log("There is no item available.");
				}
				console.log("")
				for (var i = 0; i < results.length; i++) {
					if (results[i].stock_quantity > 0) {
						console.log("Item #" + results[i].item_id 
							+ ": " + results[i].product_name 
							+ " / price: " + results[i].price 
							+ " / department: " + results[i].department_name 
							+ " / stock quantity: " + results[i].stock_quantity);
					}
				}
				console.log("");
				connection.end();
			}
		});
	}
	function viewLowInventory() {
		connection.connect();
		var queryString = "SELECT * FROM items WHERE stock_quantity < 5";
		connection.query(queryString, function (error, results, fields) {
			if (error) {
				throw error;
			}
			else {
				console.log("")
				if (results.length == 0) {
					console.log("There is no item which has a quantity lower than 5.");
				}
				for (var i = 0; i < results.length; i++) {
					if (results[i].stock_quantity > 0) {
						console.log("Item #" + results[i].item_id 
							+ ": " + results[i].product_name 
							+ " / price: " + results[i].price 
							+ " / department: " + results[i].department_name 
							+ " / stock quantity: " + results[i].stock_quantity);
					}
				}
				console.log("");
				connection.end();
			}
		});
	}
	function addToInventory() {
		inquirer.prompt(
		[{
			type: "input",
			message: "Enter item ID that you want to add",
			name: "itemId"
		},
		{
			type: "input",
			message: "Enter the quantity",
			name: "newQuantity"
		}]).then(function(response) {
			var itemId = parseInt(response.itemId);
			var newQuantity = parseInt(response.newQuantity);
			if (itemId && newQuantity) {
				connection.connect();
				var queryString = "UPDATE items SET stock_quantity="  + newQuantity + " WHERE item_id=" + itemId;
				connection.query(queryString, function (error, results, fields) {
					if (error) {
						throw error;
					}
					else {
						console.log("Quantity updated successfully");
						console.log("");
						connection.end();
					}
				});
			}
		});
	}
	function addNewProduct() {
		inquirer.prompt(
		[{
			type: "input",
			message: "Enter new product to add",
			name: "newItem"
		},
		{
			type: "input",
			message: "Enter the quantity",
			name: "quantity"
		},
		{
			type: "input",
			message: "Enter the price",
			name: "price"
		},
		{
			type: "input",
			message: "Enter the department name",
			name: "department"
		}]).then(function(response) {
			var newItem = response.newItem;
			var quantity = response.quantity;
			var price = response.price;
			var department = response.department;

			connection.connect();
			var query = "INSERT INTO items (product_name, department_name, price, stock_quantity, product_sales) VALUES (\"" 
				+ newItem + "\", \""
				+ department + "\", "
				+ price + ", " 
				+ quantity + ", " 
				+ "0)";
		console.log(query);
			connection.query(query, function (error, results, fields) {
					if (error) {
						throw error;
					}
					else {
						console.log("New item added successfully");
						connection.end()
					}
				});
			});
	}

})();