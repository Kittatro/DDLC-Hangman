// An array that contains all the words that can randomly be choosen to be the answer
var hiddenWord = ["aventure","amis","amusant","applaudissement","amour","bruyant","bonheur","blesser","coeur","calme","chanter","chanceux","chagrin","confort","cicatrices","chaleur","couleur","douleur","douceur","danse","enfance","espoir","extraodinaire","enthousiasme","ensemble","famille","fleur","rose","honte","impressionant","incroyable","joie","jouer","lit","luciole","malheur","mariage","merveilleux","maladroit","mort","musique","malchance","nature","nuage","paresseux","paisible","passion","peur","pendaison","pleurer","pardonner","plume","promesse","romance","rire","souvenirs","solitude","sourire","sombre","tristesse","vacances","voler","vide"]

// Audio that plays when the player wins or loose
var victory = new Audio('applause.mp3');
var failure = new Audio('sardoche.mp3');

// The word the player has to find (choosed from the array above)
let answer = '';
// Number of guesses the player has. More guesses = easier / Less guesses = harder (his health)
let maxWrong = 8;
// Number of bad guesses that the player has made. Will be incremented for each mistake
let mistakes = 0;
// The letter selected by the player by clicking on a letter button
let guessed = [];
// The status of the word (Badly explained but basically it's the "_" and the letters that the player has found)
let wordStatus = null;

// Will choose a random word in the array for the player to guess
function randomWord() 
{
	answer = hiddenWord[Math.floor(Math.random() * hiddenWord.length)];
}

// Makes a cool small clickable button for each letter of the alphabet, on click, will trigger the following function (handleGuess)
function generateButtons() 
{
	let buttonsHTML = 'abcdefghijklmnopqrstuvwxyz'.split('').map(letter =>`<button id='` + letter + `' onClick="handleGuess('` + letter + `')">` + letter + `</button>`).join('');
	document.getElementById('keyboard').innerHTML = buttonsHTML;
}

// Check if the selected letter is in the answer
function handleGuess(chosenLetter) 
{
	guessed.indexOf(chosenLetter) === -1 ? guessed.push(chosenLetter) : null;
	document.getElementById(chosenLetter).setAttribute('disabled', true);
// Adds the letter to the word and checks if the player has found every letter of it
	if (answer.indexOf(chosenLetter) >= 0) {
		guessedWord();
		checkIfGameWon();
	}
	// Adds an error, updates the sprite and checks if the player has lost
	else if (answer.indexOf(chosenLetter) === -1) 
	{
		mistakes++;
		updateMistakes();
		updateHangmanPicture();
		checkIfGameLost();
	}
}

// Updates the sprite. Format is "number of mistakes".jpg (E.G. first image will be "0.jpg")
function updateHangmanPicture() {
	document.getElementById('sayonara').src = './images/' + mistakes + '.jpg';
}

// Checks if the player has found all the letters of the word and if so gives him the win
function checkIfGameWon() {
	if (wordStatus === answer) {
		document.getElementById('keyboard').innerHTML = 'You won!';
		victory.play();
	}
}

// Checks if the player has lost and if so ends the game and gives the answer
function checkIfGameLost() {
	if (mistakes === maxWrong) {
		document.getElementById('wordSpotlight').innerHTML = 'The answer was the word: ' + answer;
		document.getElementById('keyboard').innerHTML = 'Sayonara :(';
		failure.play();
	}
}

// Draws the amount of letters in the word to guess
function guessedWord() {
	wordStatus = answer.split('').map(letter => (guessed.indexOf(letter) >= 0 ? letter : " _ ")).join('');
	document.getElementById('wordSpotlight').innerHTML = wordStatus;
}

// Updates the amount of mistakes
function updateMistakes() {
	document.getElementById('mistakes').innerHTML = mistakes;
}

// Resets variables to default and chooses a new word
function reset() {
	mistakes = 0;
	guessed = [];
	document.getElementById('sayonara').src = './images/0.jpg';
	randomWord();
	guessedWord();
	updateMistakes();
	generateButtons();
}
