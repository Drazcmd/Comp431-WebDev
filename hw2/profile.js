'use strict'
/*
	We'll be iterating through each pair of input and display areas, so it
	makes sense to put them in a hashmap like this 
*/
var dom_ids = [
	"displayname",
	"email",
	"phonenum",
	"zip",
	"password",
	"passwordcnf",
]
var fieldRules = {
	"displayname" : "([a-zA-Z0-9]+)",
	"email" : "([a-zA-Z0-9]+)(\x40)([a-z]+)(\x2E)([a-z]+)",
	"phonenum" : "[0-9]{3}-[0-9]{3}-[0-9]{4}",
	"zip" : "[0-9]{5}",
	"password" :".*" ,
	"passwordcnf" :".*"
}
var acceptable_inputs = {
	"displayname" : "Any string of numbers or letters or spaces (but not only spaces!)",
	"email" : "youremailaddress@gmail.com",
	"phonenum" : "3 numbers, a hyphen, 3 more numbers, a hypher, 4 numbers",
	"zip" : " Five numbers",
	"password" :"Anything you want! Must match passwordcnf" ,
	"passwordcnf" :"Anything you want! Must match password"
}
/*
For example, looking at the id "email" we dislpay the hardcoded value 
at the paragraph with id "dispemail"
*/
function getOutputId(input_id) {
	return "disp" + input_id
}
function helloWorld(){
	console.log("hello world")
	// I chose to clear the message box each time button was pressed,
	// but I don't that I actually *had* to do so 
	var message_box = document.getElementById("alertUserLocation")
	message_box.innerHTML = ""
	var send_message = function(message_string) {
		message_box.innerHTML = message_box.innerHTML + "<p>" + message_string + "</p>"
	}

	var fields_with_input = dom_ids.filter(function(id) {
		if (document.getElementById(id).value) {
			return true
		}	
	})
	var invalid_inputs = []
	fields_with_input.forEach(function(id) {
		var pattern = new RegExp(fieldRules[id])
		if (pattern.test(document.getElementById(id).value)){
			// Had to special case password and password cnf unforutnately
			if (id == "password") {
				var password_value = document.getElementById(id).value
				var passwordcnf_value = document.getElementById("passwordcnf").value
				if (password_value != passwordcnf_value) {
					invalid_inputs.push(id)	
					invalid_inputs.push("passwordcnf")	
					return
				}
			} else if (id == "passwordcnf") {
				//Took care of password stuff already; no need to do anything here
				return
			}
			//This block does get executed with password if password == passwordcnf!
			var new_value = document.getElementById(id).value
			document.getElementById(getOutputId(id)).innerHTML = new_value
			send_message(" SUCCESS: Updated " + id + "to be " + new_value)
			//Assignment requires that we clear the input when it's accepted by our regex,
			//but only AFTER we have messaged the user
			document.getElementById(id).value = ""
		} else {
			invalid_inputs.push(id)
		}
	})

	invalid_inputs.forEach(function(id) {
		if (!id) {
			return
		}
		console.log(id)
		send_message("ERROR: "  + id + " cannot be " + document.getElementById(id).value)
		send_message("A valid entry for " + id +
		 			 " is along the lines of this: " + acceptable_inputs[id])
	})

	return true
}
