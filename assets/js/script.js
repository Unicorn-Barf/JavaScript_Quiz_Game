var startButton = $("#start-button");
var gameH1 = $("#game-h1");
var questEl = $('#question');
var ansOl = $("#answers");
var hsForm = $("#hs-form");
var ansAlert = $("#ans-alert");
var highS;
var timeLeft;
var quizIndex;
var correctInput;
var incorrectInput;


// Load Highscores from local storage
highS = JSON.parse(localStorage.getItem("high-scores"));
if (highS !== null) {
    for (i=0; i<8 && i<highS.length; i++){
        let scoreLi = $("<li>");
        scoreLi.text(`${highS[i].name}: ${highS[i].score}`);
        $("#highscore").append(scoreLi);
    };
}


// Write a game init function for when start is pressed
// create and append a p ol for questions and ans
function gameInit() {
    // Load Highscores from local storage
    highS = JSON.parse(localStorage.getItem("high-scores"));
    // Set scores back to 0
    correctInput = 0;
    incorrectInput = 0;
    // Init quiz index to 0
    quizIndex = 0;
    // Set timer
    timeLeft = 30;
    // Remove start button
    startButton.css("display", "none");
    // display first question
    displayQuestion(quizObj[quizIndex]);
    // start timer
    timer();
}


// Function uses myObject parameter to display a question and answers
function displayQuestion(myObject) {

    // Display question in questEl
    questEl.text(myObject.question);

    // for loop to randomly order answers
    let order = Math.round(Math.random() * 3);
    for (i=0; i<3; i++) {
        let ansTrue = $("<li>").addClass("li-answer");
        let ansWrong = $("<li>").addClass("li-answer");
        // if statement to randomly place the true answer
        if (order === i && order < 3) {
            ansTrue.text(myObject.true);
            ansOl.append(ansTrue);
            // access index of wrong answer and append to ol
            ansWrong.text(myObject.wrong[i]);
            ansOl.append(ansWrong);
        }
        else if (order === 3 && i === 2) {
            // access index of wrong answer and append to ol
            ansWrong.text(myObject.wrong[i]);
            ansOl.append(ansWrong);
            // append true last for else case
            ansTrue.text(myObject.true);
            ansOl.append(ansTrue);
        }
        else {
            // access index of wrong answer and append to ol
            ansWrong.text(myObject.wrong[i]);
            ansOl.append(ansWrong);
        }
    }
}


// Timer function
function timer() {
    // Make a timer element show on HTML game-h1
    gameH1.text(`You have ${timeLeft} seconds left.`);

    var timeInterval = setInterval(function () {

        if (timeLeft > 0 && quizIndex !== quizObj.length){
            // Update timer message every interval
            gameH1.text(`You have ${timeLeft} seconds left.`);
            timeLeft--;
        }
        
        // Finished questions or ran out of time
        else if (timeLeft === 0 || quizIndex === quizObj.length) {

            // Check if not null, and call highScores if correctInput is a top 8 score
            if (highS !== null) {
                if (highS.length < 8 || correctInput > highS[7].score) {
                    highScores();
                }
            }

            // if highS is null, call highScore function
            else if (highS === null) {
                highScores();
                console.log("This is the timer calling highScores()");
            };

            // delete question
            questEl.text(`You got ${correctInput} answers right and ${incorrectInput} answers wrong.`);
            // delete ansOl items
            ansOl.html('');
            // remove answer alert
            ansAlert.text('');
            // remove timer text
            gameH1.text('FINISHED');
            // put back start button
            startButton.css("display", "block");
            // set variables back to zero
            // set quizindex back to 0
            quizIndex = 0;

            // clear timer function
            clearInterval(timeInterval);
        }
    },1000);
}

function highScores() {
    // show the highscores form
    hsForm.show();
};

// Highscores name input event listener
$("#hs-form").on("click", "#hs-button", function (event) {
    event.preventDefault();
    // Get name value from initials input and store in variable name
    let name = $("#initials").val();
    // clear input field
    $("#initials").text('');
    // Create an object with the name and corresponding score
    let myScoreObj = {
        name: name,
        score: correctInput,
    };
    console.log(`my score object ${myScoreObj.name} ${myScoreObj.score}`);
    // if no highscores exist in local storage
    if (highS === null) {
        highS = [myScoreObj];
    }

    // else highscores exist in local storage
    else {
        let scoreIndex = highS.length;
        console.log("before loop");
        // store name and score to highscores object
        for (let i = 0; i < scoreIndex; i++) {
            // Place value in order of highest to lowest score
            if (correctInput >= highS[i].score) {
                highS.splice(i, 0, myScoreObj);
                break;
            }
            else if (i === highS.length - 1 && correctInput < highS[i].score) {
                highS.push(myScoreObj);
                break;
            }
        };
    };

    // store to local storage
    localStorage.clear();
    localStorage.setItem("high-scores", JSON.stringify(highS));
    console.log(highS);
    hsForm.hide();
    // update Highscore Container
    $("#highscore").empty();
    for (i = 0; i < 8 && i < highS.length; i++) {
        let scoreLi = $("<li>").css("text-decoration", "none");
        scoreLi.text(`${highS[i].name}: ${highS[i].score}`);
        $("#highscore").append(scoreLi);
    };
});



// Write an event listener for start button
// Start button will initialize game
startButton.on("click", function(event) {
    // make sure the start button is target of event with if statement
    let element = event.target;
    if (element.matches("button") === true) {
        // Call functions to initialize game
        gameInit();
    }
})

// Write an event listener for answer selection
ansOl.on("click", function(event) {
    // Make sure an <li> was clicked
    let element = event.target;
    if (element.matches("li") === true) {


        // Check the answer
        if (element.textContent === quizObj[quizIndex].true) {
            correctInput++;
            // Increment the quiz object index
            quizIndex++;
            // alert for correct answer
            ansAlert.text("That was CORRECT!");
        }
        else if (element.textContent !== quizObj[quizIndex].true) {
            incorrectInput++;
            // Increment the quiz object index
            quizIndex++;
            // Alert wrong answer
            ansAlert.text("That was WRONG!");
            // subtract time from clock
            timeLeft -= 5;
        }

        // move on to next quiz question
        if (quizIndex < quizObj.length) {
            // delete question
            questEl.text('');
            // delete ansOl items
            ansOl.html('');
            displayQuestion(quizObj[quizIndex]);
        };
    };
});