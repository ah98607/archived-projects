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

	// start connection
	connection.connect();

	// display initial stock
	connection.query("SELECT * FROM items", function (error, results, fields) {
		if (error) {
			throw error;
		}
		else {

			console.log("======== Available items ========")
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
			// ask for user"s input
	
			inquirer.prompt(
				[{
					type: "input",
					message: "Please enter the item ID.",
					name: "item_id"
				},
				{
					type: "input",
					message: "Please enter the number of the item you want to buy.",
					name: "num_item"
				}]).then(function(response) {
					var item_id = parseInt(response.item_id);
					var num_item = parseInt(response.num_item);
					if (item_id && num_item) {
						if (results[item_id - 1] && results[item_id].stock_quantity >= num_item) {
							var queryOrder = "UPDATE items SET " 
							+ "stock_quantity=stock_quantity-" 
							+ num_item 
							+ ", product_sales=product_sales+price*"
							+ num_item 
							+ " WHERE item_id=" 
							+ item_id;
							//console.log("DEBUG: " + queryOrder);
							connection.query(queryOrder, function(error, results, fields) {
								connection.end();
							});
							console.log("You successfully bought " + num_item + " " + results[item_id - 1].product_name + "(s)");
						}
						else {
							console.log("There is no such an item OR it has been sold out.");
							connection.end();
						}
					}
					else {
						console.log("Please check your input to make sure it is valid integer.");
						connection.end();
					}

				});
		}
	});
})();