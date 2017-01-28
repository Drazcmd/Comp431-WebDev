'use strict'
var imgCardIds = [
	"imgcard1",
	"imgcard2",
	"imgcard3",
	"imgcard4",
	"imgcard5",
	"imgcard6",
	"imgcard7"
]

function createImageCards(){
	console.log("Hello World")
	imgCardIds.forEach(function test(card) {
		console.log(document.getElementById(card))
	})
}
/* TODO - consider launching this here
window.onload = function() {
	createImageCards()
}*/
