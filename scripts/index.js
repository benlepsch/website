//JavaScript code will go here!

/*

	Temp. Structure:
	-----------------------------------
	1. opens the file and reads the previous high score
	2. updates the website with the information
	3. lets the user interact with the website
		3a. click on a box
		3b. print the number of times clicked on the box
		3c. make something so if it's over 100 it gets highlighted in red or something idk
	4. if the 'update high score' button is pressed, it updates the high score BOTH ON THE WEBPAGE AND IN THE FILE
	5. let the user clicc

*/

var currentScore = 0
var highScore = 0

var currentScore_display = document.getElementById('score_display')
var highScore_display = document.getElementById('highscore_display')

function getFileFromServer(url, doneCallback) {
	var xhr

	xhr = new XMLHttpRequest()
	xhr.onreadystatechange = handleStateChange
	xhr.open("GET", url, true)
	xhr.send()

	function handleStateChange() {
		if(xhr.readyState === 4) {
			doneCallback(xhr.status == 200 ? xhr.responseText : null)
		}
	}
}

function writeFileToServer(url, doneCallback) {
	var xhr

	xhr = new XMLHttpRequest()
	xhr.onreadystatechange = handleStateChange
	xhr.open("POST", url, true)
	xhr.send()

	function handleStateChange() {
		if(xhr.readyState === 4) {
			doneCallback(xhr.status == 200 ? xhr.responseText : null)
		}
	}
}

function readFile() {
	getFileFromServer("scripts/data.txt", function(text) {
		if (text === null) {
			//error
		} else {
			highScore = text
			highScore_display.innerHTML = "Highscore: " + highScore
		}
	})
}

function writeFile(value) {
	writeFileToServer("scripts/data.txt", function(text) { text = value })
}

function isClicked() {
	currentScore = currentScore + 1

	if(currentScore >= highScore) {
		highScore = currentScore
	}

	currentScore_display.innerHTML = "Score: " + currentScore
	highScore_display.innerHTML = "Highscore: " + highScore
}

function reset_score() {
	currentScore = 0
	currentScore_display.innerHTML = "Score: " + currentScore
}


readFile()
