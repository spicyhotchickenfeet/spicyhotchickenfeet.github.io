// This keeps track of the number of questions the student has answered that match each result
// It will be reset each time the quiz starts
// keys used (hover over, value is number)
const scoreKeeper = {
 Team: 0,
 Personal: 0,
 Run: 0,
};
 
let currentQuestionIndex = 0; // Programming languages start counting at zero
// an array of objects
 
// Questions can be added and modified freely
// They just need to have the same structure
// the whole `questions` variable is an array, with square brackets: []
// individual questions are objects, with curly braces: {}
// the options/answers of each question are another array: []
// each option is its own object {} with two properties: text and point
const questions = [
 {
   text: 'What do you think about team-sports?',
   options: [
     {
       text: 'Sports are all about team spirit!',
       point: 'Team',
     },
     {
       text: 'I prefer playing alone ',
       point: 'Personal',
     },
     {
       text: 'I do not like large teams, but small groups are nice',
       point: 'Run',
     },
   ],
 },
 {
   text: 'From a scale from 1 to 3 (3 being the highest), how much do you like running?',
   options: [
     {
       text: '1',
       point: 'Personal',
     },
     {
       text: '2',
       point: 'Team',
     },
     {
       text: '3',
       point: 'Run',
     },
   ],
 },
 {
   text: 'Which sport is the most appealing to you?',
   options: [
     {
       text: 'Basketball',
       point: 'Team',
     },
     {
       text: 'Track and field',
       point: 'Run',
     },
     {
       text: 'Circuit training ',
       point: 'Personal',
     },
   ],
 },
 {
   text: 'What are your goals?',
   options: [
     {
       text: 'Improve my personal fitness ',
       point: 'Personal',
     },
     {
       text: 'Improve my team spirit',
       point: 'Team',
     },
     {
       text: 'Learn strategies and techniques in a sport ',
       point: 'Run',
     },
   ],
 },
 {
   text: 'Do you prefer indoor or outdoor sports?',
   options: [
     {
       text: 'Indoor',
       point: 'Personal',
     },
     {
       text: 'Outdoor',
       point: 'Run',
     },
     {
       text: 'I do not mind',
       point: 'Team',
     },
   ],
 },
 {
   text: 'What place do you prefer the most?',
   options: [
     {
       text: 'A large empty field ',
       point: 'Run',
     },
     {
       text: 'An average sized court ',
       point: 'Team',
     },
     {
       text: 'A smaller area',
       point: 'Personal',
     },
   ],
 },
 {
   text: 'What do you think about rules in sports?',
   options: [
     {
       text: 'I like structured games with a certain set of rules ',
       point: 'Team',
     },
     {
       text: 'I dont like too many rules, they are constricting ',
       point: 'Personal',
     },
     {
       text: 'Some rules are nice to keep the game in order',
       point: 'Run ',
     },
   ],
 },
 {
   text: 'How do you get your mind off things?',
   options: [
     {
       text: 'Go to the gym ',
       point: 'Personal',
     },
     {
       text: 'Go for a run',
       point: 'Run',
     },
     {
       // inside a string, you have to escape quote marks with a \
       text: 'Meet up with friends',
       point: 'Team',
     },
   ],
 },
];
 
// This function starts the quiz
// It is called by a button on the HTML page
function startQuiz() {
 
 // This puts a message in the console
 // Press Ctrl+Shift+I to open the console in Chrome
 // (Google how to open the dev tools in your browser if you're not sure)
 console.log('Quiz started!');
 
 // Reset score
 // This loops over each of the properties in the object
 for (let result in scoreKeeper) {
   // We are setting that property's value back to zero
   scoreKeeper[result] = 0;
 }
 
 // Ask first question
 // This function is defined below
 // We are passing the first question in our questions array into this function
 // Remember that programming languages start counting at zero
 askQuestion(questions[0]);
}
 
// Display Question
function askQuestion(question) {
 
 // Clear quiz zone
 // First we get the element in the HTML by using its "id" value
 // Then, while it still has a "first child element", we remove that element
 // This will continue until the parent is empty
 let quizZone = document.getElementById('quizZone');
 while (quizZone.firstChild) {
   quizZone.removeChild(quizZone.firstChild);
 }
 
 // Render the question - we will create HTML elements here
 // This is basically the same as writing <p>My paragraph</p> in HTML
 let questionP = document.createElement('p');
 questionP.innerText = question.text;
 quizZone.appendChild(questionP);
 
 // Create box to hold answers
 // These are more elements that we are creating from scratch
 let answerDiv = document.createElement('div');
 answerDiv.setAttribute('id', 'quizAnswers');
 quizZone.appendChild(answerDiv);
 
 // Render answers
 // forEach is a method that arrays can use
 // Here, we say:
 //  - take my question
 //  - take its 'options' property (an array)
 //  - for each element in that array, do a thing
 // and then, inside the forEach() parentheses, we describe that thing
 question.options.forEach((option, i) => {
 
   // `option` is this individual option
   // `i` is the index of the option -- the first option will have `i` of zero, etc.
 
   // Create a list item for this option
   let optionDiv = document.createElement('div');
   optionDiv.setAttribute('class', 'quizOption');
   optionDiv.innerText = option.text;
   answerDiv.appendChild(optionDiv);
 
   // Add the index to the optionDiv so we can use it later
   optionDiv.index = i;
 
   // Attache event listeners
   // This says: when optionDiv is clicked, call the acceptAnswer function
   optionDiv.onclick = acceptAnswer;
 });
}
 
function acceptAnswer(event) {
 // Property we added ourselves
 let selectedOptionIndex = event.target.index;
 console.log({ selectedOptionIndex });
 
 // Add point according to the question and option
 let currentQuestion = questions[currentQuestionIndex];
 let selectedOption = currentQuestion.options[selectedOptionIndex];
 scoreKeeper[selectedOption.point]++;
 
 console.log(JSON.stringify(scoreKeeper, null, 4));
 
 // Go to next question OR calculate result
 currentQuestionIndex++;
 if (currentQuestionIndex === questions.length) {
   calculateResult();
 }
 else {
   askQuestion(questions[currentQuestionIndex]);
 }
}
 
function calculateResult() {
 // Add up points, taking the FIRST/HIGHEST score
 let quizResult = '';
 
 let possibleResults = Object.keys(scoreKeeper);
 
 for (let i = 0; i < possibleResults.length; i++) {
   let thisPossibleResult = possibleResults[i];
 
   if (!quizResult || scoreKeeper[quizResult] < scoreKeeper[thisPossibleResult]) {
     quizResult = thisPossibleResult;
   }
 }
 
 // Display result
 showResult(quizResult);
}
 
// Display Results
function showResult(result) {
 // Hide the quizZone (the quiz is over)
 let quizZoneDiv = document.getElementById('quizZone');
 quizZoneDiv.style.display = 'none'; // hide it by adjusting its style (CSS) directly
 
 // Find the hidden <div> that contains the results
 let resultDiv = document.getElementById('answer-' + result);
 resultDiv.classList.toggle('hide'); // un-hide it by removing the '.hide' class
 
 // Show the 'Take Again' button
 let takeAgainButton = document.querySelector('#takeAgain');
 takeAgainButton.style.display = 'inline'; // Just a regular inline element that flows in the text, like a word or phrase
}
