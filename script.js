const scoreKeeper = {
 Visual: 0,
 Music: 0,
 Tech: 0,
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
   text: 'What do you like to do in your free time?',
   options: [
     {
       text: 'Painting and drawing',
       point: 'Visual',
     },
     {
       text: 'Singing/composing music',
       point: 'Music',
     },
     {
       text: 'Editing videos ',
       point: 'Tech',
     },
   ],
 },
 {
   text: 'Do you like working in teams or alone?',
   options: [
     {
       text: 'Alone',
       point: 'Tech',
     },
     {
       text: 'Teams',
       point: 'Music',
     },
     {
       text: 'I do not mind',
       point: 'Visual',
     },
   ],
 },
 {
   text: 'What would you do to get your mind off things?',
   options: [
     {
       text: 'Listen to music',
       point: 'Music',
     },
     {
       text: 'Film content ',
       point: 'Tech',
     },
     {
       text: 'Sketch',
       point: 'Visual',
     },
   ],
 },
 {
   text: 'What would you bring home from a trip?',
   options: [
     {
       text: 'Photos',
       point: 'Tech',
     },
     {
       text: 'Make a scrapbook of the things you did',
       point: 'Visual',
     },
     {
       text: 'Cool artifact/souvienier ',
       point: 'Music',
     },
   ],
 },
 {
   text: 'When organising a party, the most important is..',
   options: [
     {
       text: 'The music ',
       point: 'Music',
     },
     {
       text: 'The decoration ',
       point: 'Visual',
     },
     {
       text: 'Taking photos during the event',
       point: 'Tech',
     },
   ],
 },
 {
   text: 'Are you more creative or logical from a scale from 1  to 3 (1 being creative)?',
   options: [
     {
       text: '1',
       point: 'Visual',
     },
     {
       text: '2',
       point: 'Music',
     },
     {
       text: '3',
       point: 'Tech',
     },
   ],
 },
 {
   text: 'Do you like working with your hands?',
   options: [
     {
       text: 'Yes',
       point: 'Visual',
     },
     {
       text: 'No',
       point: 'Tech',
     },
     {
       text: 'To a degree',
       point: 'Music',
     },
   ],
 },
 {
   text: 'What subject do you prefer?',
   options: [
     {
       text: 'Art',
       point: 'Visual',
     },
     {
       text: 'English',
       point: 'Music',
     },
     {
       // inside a string, you have to escape quote marks with a \
       text: 'Sciences',
       point: 'Tech',
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
 
 
function sport() {
  startQuiz()
}
