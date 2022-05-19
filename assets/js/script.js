var startButton = $("#start-button");
var gameH1 = $("#game-h1")
var questEl = $('#question');
var ansOl = $("#answers")
var quizObj = [{question: 'Why?', true: 'because', wrong: ['no', 'yes', 'maybe']}];

// Write a game init function for when start is pressed
// create and append a p ol for questions and ans
function gameInit() {
    // Remove start button
    startButton.css("display", "none");
    displayQuestion(quizObj[0]);
}


// Function uses myObject parameter to display a question and answers
function displayQuestion(myObject) {

    // for loop to randomly order answers
    let order = Math.round(Math.random() * 3);
    for (i = 0; i < 3; i++) {
        let ansTrue = $("<li>");
        let ansWrong = $("<li>");
        // if statement to randomly place the true answer
        if (order === i && order < 3) {
            ansTrue.text(myObject.true);
            ansOl.append(ansTrue);
            // access index of wrong answer and append to ol
            ansWrong.text(myObject.wrong[i]);
            ansOl.append(ansWrong);
            console.log('if');
        }
        else if (order === 3 && i === 2) {
            // access index of wrong answer and append to ol
            ansWrong.text(myObject.wrong[i]);
            ansOl.append(ansWrong);
            // append true last for else case
            ansTrue.text(myObject.true);
            ansOl.append(ansTrue);
            console.log('else if');
        }
        else {
            // access index of wrong answer and append to ol
            ansWrong.text(myObject.wrong[i]);
            ansOl.append(ansWrong);
            console.log('else');
        }
    }
}


// Write a Timer function for game
// Timer function
function timer() {
    let timeLeft = 120;
    // Make a timer element show on HTML
    gameH1.text(`You have ${timeLeft} seconds left.`);

    var timeInterval = setInterval(function () {

        if (timeLeft > 0 && check !== myWord){
            gameH1.text(`You have ${timeLeft} seconds left.`);
            timeLeft--;
        }
        
        // winning case
        else if (check === myWord) {

        }

        // Losing Case
        else {
            clearInterval(timeInterval);
        }
    },1000);
}



// write event listener for highscore app









// Write an event listener for start button
// Start button will initialize game
startButton.on("click", function(event) {
    // make sure the start button is target of event with if statement
    var element = event.target;
    if (element.matches("button") === true) {
        // Call functions to initialize game and timer
        gameInit();
        timer();
    }
})

// Write an event listener for answer selection