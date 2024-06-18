let button = ["red", "blue", "green", "yellow"];

let gamePattern = [];
let userClickPattern = [];

let gameStarted = false;
let level = 0;



// GAME START

let levelTitle = document.querySelector("#level-title");

document.addEventListener("keypress", () => {

    if (!gameStarted) {
        gameSequence();
        gameStarted = true;
    }

});




// RESPONSIVE JS

// DEFINE MEDIA QUERIES

let smallScreen = window.matchMedia('(max-width: 420px)');

function myRespFunc() {

	// IF MEDIA QUERY MATCHES

    if (smallScreen.matches) {

        if (!gameStarted) {
            gameSequence();
            gameStarted = true;
        }
    }
}

// CALL LISTENER FUNCTION ON JS LOAD

myRespFunc();

// ATTACH LISTENER FUNCTION ON STATE CHANGES

smallScreen.addEventListener("change", myRespFunc);




// CREATE USER CLICK PATTERN SEQUENCE TO CHECK IT WITH GAME SEQUENCE

for (let i = 0; i < 4; i++) {

    document.querySelectorAll(".btn")[i].addEventListener("click", function () {
    
	let userChosenColour = this.attributes.id.value;
    
	userClickPattern.push(userChosenColour);

        playSound(userChosenColour);
        pressButtonAnimation(userChosenColour);
        checkGameSequencePattern(userClickPattern.length - 1);

    });
}




// CREATE PATTERN SEQUENCE FOR GAME

function gameSequence() {

    userClickPattern = [];

    level++;

    levelTitle.textContent = "Level " + level;

    let randomNumber = Math.floor(Math.random() * 4);

    let randomChosenColour = button[randomNumber];

    gamePattern.push(randomChosenColour);

    document.querySelector("#" + randomChosenColour).classList.add("fadeInOut");

    playSound(randomChosenColour);

    setTimeout(function () {
        document.querySelector("#" + randomChosenColour).classList.remove("fadeInOut");
    }, 200);
}




// BUTTON SOUND CREATION

function playSound(name) {

    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();

}




// CHECK GAME PATTERN MATCH THE USER CLICK PATTERN

function checkGameSequencePattern(currentLevel) {

    if (gamePattern[currentLevel] === userClickPattern[currentLevel]) {

        if (userClickPattern.length === gamePattern.length) {

            setTimeout(function () {
                gameSequence();
            }, 1000);

        }

    } 
	
	else {

        playSound("wrong");

        document.querySelector("body").classList.add("game-over");

        if (smallScreen.matches) {	
            levelTitle.textContent = "Game Over! Refresh Page to Restart the Game";
        } 
		
		else {
            levelTitle.textContent = "Game Over! Press any key to Restart the Game";
        }

        setTimeout(function () {
            document.querySelector("body").classList.remove("game-over");
        }, 200);

        startOver();
    }
}




// ANIMATE BUTTON WHEN PRESSED

function pressButtonAnimation(currentColor) {

    document.querySelector("#" + currentColor).classList.add("pressed");

    setTimeout(function () {
        document.querySelector("#" + currentColor).classList.remove("pressed");
    }, 100);

}




// GAME RESTART ON KEYPRESS IF PATTERN IS WRONG

function startOver() {

    level = 0;
    gamePattern = [];
    gameStarted = false;
	
}
