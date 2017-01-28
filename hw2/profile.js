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
	"displayname" : "([a-zA-Z0-9]*)",
	"email" : "([a-zA-Z0-9]+)(\x40)([a-z]+)(\x2E)([a-z]+)",
	"phonenum" : "\d{3}-\d{3}-\d{4}",
	"zip" : "\d{5}",
	"password" :".*" ,
	"passwordcnf" :".*"
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
		console.log("SUP")
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
		console.log(id)
		console.log(pattern)
		if (pattern.test(document.getElementById(id).value)){
			var new_value = document.getElementById(id).value
			document.getElementById(getOutputId(id)).innerHTML = new_value
			send_message(" SUCCESS: Updated " + id + "to be " + new_value)
			//Assignment requires that we clear the input when it's accepted by our regex,
			//but only AFTER we have messaged the user
			document.getElementById(id).value = ""
		} else {
			invalid_inputs.push(id)
			console.log(id, "failed!")
		}
	})

	invalid_inputs.forEach(function(id) {
		message_box.innerHTML = message_box.innerHTML + " <p> " + 
								"ERROR: "  + id + " cannot be " +
								 document.getElementById(id).value + " </p> "
		 						
	})

	return true
}
