let button = ["red", "blue", "green", "yellow"];

let gamePattern = [];
let userClickPattern = [];

let gameStarted = false;
let level = 0;



// Game Start

let levelTitle = document.querySelector("#level-title")

document.addEventListener("keypress", () => {
	if (!gameStarted) {
		gameSequence();
		gameStarted = true;
	}
});



//Create User Click Pattern Sequence to Check it with Game Sequence

for (let i = 0; i < 4; i++) {
	document.querySelectorAll(".btn")[i].addEventListener("click", function() {
		let userChosenColour = this.attributes.id.value;
		userClickPattern.push(userChosenColour);

		playSound(userChosenColour);
		pressButtonAnimation(userChosenColour);
		checkGameSequencePattern(userClickPattern.length - 1);
	});
}



//Create Pattern Sequence for Game

function gameSequence() {
	userClickPattern = [];
	level++;
	levelTitle.textContent = "Level " + level;
	let randomNumber = Math.floor(Math.random() * 4);
	let randomChosenColour = button[randomNumber];
	gamePattern.push(randomChosenColour);

	document.querySelector("#" + randomChosenColour).classList.add("fadeInOut");
	playSound(randomChosenColour);

	setTimeout(function() {
		document.querySelector("#" + randomChosenColour).classList.remove("fadeInOut");
	}, 200);
}



// Button Sound Creation

function playSound(name) {
	var audio = new Audio("sounds/" + name + ".mp3");
	audio.play();
}



// Check Game pattern Match the user click Pattern

function checkGameSequencePattern(currentLevel) {
	if (gamePattern[currentLevel] === userClickPattern[currentLevel]) {
		if (userClickPattern.length === gamePattern.length) {
			setTimeout(function() {
				gameSequence();
			}, 1000);
		}

	} else {
		playSound("wrong");
		document.querySelector("body").classList.add("game-over");
		levelTitle.textContent = "Game Over! " + "Press Any key to Restart the Game";

		setTimeout(function() {
			document.querySelector("body").classList.remove("game-over");
		}, 200);

		startOver();

	}
}



// Animate Button When Pressed

function pressButtonAnimation(currentColor) {
	document.querySelector("#" + currentColor).classList.add("pressed");
	setTimeout(function() {
		document.querySelector("#" + currentColor).classList.remove("pressed");
	}, 100);
}



// Game Restart on keypress if Pattern is wrong

function startOver() {
	level = 0;
	gamePattern = [];
	gameStarted = false;
}