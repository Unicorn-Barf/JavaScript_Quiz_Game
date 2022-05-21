# Project Name - change to the name of your project
​
## Table of contents
​
- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [User Story](#user-story)
  - [Acceptance Criteria](#acceptance-criteria)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)
- [Acknowledgments](#acknowledgments)
​
​
## Overview
​
### The challenge
​
This challenge involved building a coding quiz game from scratch using HTML, CSS, and JavaScript.  The challenge was a great way to practice doing a coding assessment that could be assigned to me during an interview.  My coding quiz game runs dynamically, takes user input, and utilizes local storage to keep track of highscores.
​
### User Story
​
```
AS A coding boot camp student
I WANT to take a timed quiz on JavaScript fundamentals that stores high scores
SO THAT I can gauge my progress compared to my peers
```
​
### Acceptance Criteria
​
```
GIVEN I am taking a code quiz
WHEN I click the start button
THEN a timer starts and I am presented with a question
WHEN I answer a question
THEN I am presented with another question
WHEN I answer a question incorrectly
THEN time is subtracted from the clock
WHEN all questions are answered or the timer reaches 0
THEN the game is over
WHEN the game is over
THEN I can save my initials and my score
```
​
### Screenshot
​
![](./screenshot.jpg)
​
Add a screenshot of your solution. The easiest way to do this is to use Firefox to view your project, right-click the page and select "Take a Screenshot". You can choose either a full-height screenshot or a cropped one based on how long the page is. If it's very long, it might be best to crop it.
​
Alternatively, you can use a tool like [FireShot](https://getfireshot.com/) to take the screenshot. FireShot has a free option, so you don't need to purchase it.
​
Then crop/optimize/edit your image however you like, add it to your project, and update the file path in the image above.
​
**Note: Delete this note and the paragraphs above when you add your screenshot. If you prefer not to add a screenshot, feel free to remove this entire section.**
​
### Links
​
- Solution URL: [https://github.com/Unicorn-Barf/JavaScript_Quiz_Game](https://github.com/Unicorn-Barf/JavaScript_Quiz_Game)
- Live Site URL: [https://unicorn-barf.github.io/JavaScript_Quiz_Game/](https://unicorn-barf.github.io/JavaScript_Quiz_Game/)
​
## My process
​
### Built with
​
- HTML5
- CSS
- JavaScript
​
### What I learned
​
I learned how to properly delegate events during this challenge.  I ran into a problem with my code and it took my a long time to debug it.  I used code breakpoints with chrome devtools to find where the issue was; I realized that by adding an event listener to an element and placing the event listener inside of a function that is routinely being called, I was accidentally adding multiple event listners to the same element.  Here was the event listener:
```js
// Write an event listener for answer selection
ansOl.on("click", function(event) {
    // Make sure an <li> was clicked
    let element = event.target;
    if (element.matches("li") === true) {
```
​I had this code section inside of my function that handles the highscore form `.show()`. This caused another event listener to be created every time I called my `highScore()` function.  

Another thing that I learned was how to read and write to local storage.  The highscores from each qualify score was saved to local storage.  Here is an example of how I used `JSON.parse()` to load my highscores and dynamically display them on my highscore card when the page loads:
```js
// Load Highscores from local storage
highS = JSON.parse(localStorage.getItem("high-scores"));
if (highS !== null) {
    for (i=0; i<8 && i<highS.length; i++){
        let scoreLi = $("<li>");
        scoreLi.text(`${highS[i].name}: ${highS[i].score}`);
        $("#highscore").append(scoreLi);
    };
}
```
A section of code that I am proud about is a conditional loop I created to randomize the answer order in which the true answer is displayed everytime that a new question/answer set object is called.  I needed to do this because I stored the correct answer under a unique key the the object and didn't always want the right answer to be the first choice.  Here is the code I used in my `displayQuestion()` function.
```js
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
```
As seen in the above code, depending on the random index, `order`, created, the correct answer could be place first through last.
​
### Continued development
​
I want to revisit this project so that I can make my code more dry.  While I'm proud of my `displayQuestion()` function, I now realize I should write it in a much more efficient way.  I plan on researching how to simply randomize an array of answers; after, I can still compare the value of the answer selected by the user against the question/answer object to see if it was correct or incorrect.

I am interested in refactoring my code throughout as well as making the UI more interesting, dynamic, and seamless.
​
​
### Useful resources
​
- [Removing HTML dynamically](https://www.geeksforgeeks.org/how-to-remove-an-html-element-using-javascript/) - This was a great reference to show how to remove HTML elements dynamically using JavaScript.
- [Splice()](https://flaviocopes.com/how-to-add-item-to-array-javascript/#:~:text=You%20want%20to%20explicitly%20add,()%20method%20of%20an%20array.) - This is a concise and basic explanation of how to use the splic() array method to insert a new value at a specific index of an array.
- [Window.localStorage MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) - MDN's documentation on how to read and write to local storage helped me effectively store and read my highscores data.

## Author
​
**Nolan Spence**
- GitHub - [https://github.com/Unicorn-Barf](https://github.com/Unicorn-Barf)
- LinkedIn - [https://www.linkedin.com/in/aerospence/](https://www.linkedin.com/in/aerospence/)
​
## Acknowledgments
​
I want to thank my brother Kyle Spence for helping me debug my code.  He showed me how to use breakpoint in chrome devtools, and gave me a good lecture on why we use event delegation.

Thank you to my tutor, Jacob Nordan, for encouraging me to push myself in this challenge.