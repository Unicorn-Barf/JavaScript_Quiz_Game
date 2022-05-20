var startButton = $("#start-button");
var gameH1 = $("#game-h1")
var questEl = $('#question');
var ansOl = $("#answers")


var quizIndex = 0;
// Variables for right and wrong answers from user
var correctInput = 0;
var incorrectInput = 0;

// Write a game init function for when start is pressed
// create and append a p ol for questions and ans
function gameInit() {
    // Remove start button
    startButton.css("display", "none");
    displayQuestion(quizObj[quizIndex]);
}


// Function uses myObject parameter to display a question and answers
function displayQuestion(myObject) {

    // Display question in questEl
    questEl.text(quizObj[quizIndex].question);

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
    // Set total timer time seconds
    let timeLeft = 120;
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
            // set quix index, incorrect and correct input back to 0
            // quizIndex = 0;
            // correctInput = 0;
            // incorrectInput = 0;

            // delete question
            questEl.text('');
            // delete ansOl items
            ansOl.html('');
            // remove timer text
            gameH1.text('FINISHED');

            // put back start button
            startButton.css("display", "block");
            

            // call a highscore function!
            clearInterval(timeInterval);
        }
    },1000);
}



// write event listener for highscore app









// Write an event listener for start button
// Start button will initialize game
startButton.on("click", function(event) {
    // make sure the start button is target of event with if statement
    let element = event.target;
    if (element.matches("button") === true) {
        // Call functions to initialize game and timer
        gameInit();
        timer();
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
        }
        else if (element.textContent !== quizObj[quizIndex].true) {
            incorrectInput++;
            // Increment the quiz object index
            quizIndex++;
        }

        // move on to next quiz question
        if (quizIndex < quizObj.length) {
            // delete question
            questEl.text('');
            // delete ansOl items
            ansOl.html('');
            displayQuestion(quizObj[quizIndex]);
        }
        // Finished all questions
        else {

        }

    }
})