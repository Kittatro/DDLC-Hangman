// An array that contains all the words that can randomly be choosen to be the answer
var hiddenWord = ["aventure","amis","amusant","applaudissement","amour","bruyant","bonheur","blesser","coeur","calme","chanter","chanceux","chagrin","confort","cicatrices","chaleur","couleur","douleur","douceur","danse","enfance","espoir","extraodinaire","enthousiasme","ensemble","famille","fleur","rose","honte","impressionant","incroyable","joie","jouer","lit","luciole","malheur","mariage","merveilleux","maladroit","mort","musique","malchance","nature","nuage","paresseux","paisible","passion","peur","pendaison","pleurer","pardonner","plume","promesse","romance","rire","souvenirs","solitude","sourire","sombre","tristesse","vacances","voler","vide"]

// Audio that plays when the player wins or loose
var victory = new Audio('applause.mp3');
var failure = new Audio('sardoche.mp3');

// The word the player has to find (choosed from the array above)
let answer = '';
// Number of guesses the player has. More guesses = easier / Less guesses = harder
let maxWrong = 8;
// Number of errors the player made, will be incremented
let mistakes = 0;
// The letter selected by the player by clicking on a letter button
let guessed = [];
// The status of the word (I don't know how to explain it but basically it's the "_" and the letters that the player found)
let wordStatus = null;

// Will load the hangman sprites before having to draw them on screen
function preloader() {
	// counter
	var i = 0;
	
	// create object
	imageObj = new Image();
	
	// set image list
	images = new Array();
	images[0]="./images/0.jpg"
	images[1]="./images/1.jpg"
	images[2]="./images/2.jpg"
	images[3]="./images/3.jpg"
	images[4]="./images/4.jpg"
	images[5]="./images/5.jpg"
	images[6]="./images/6.jpg"
	images[7]="./images/7.jpg"
	images[8]="./images/8.jpg"
	
	// start preloading
	for(i=0; i<=8; i++) {
		imageObj.src=images[i];
		console.log("Image "[i]" loaded")
	}
}

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
// Adds the letter to the word and checks if the player found every letter of it
	if (answer.indexOf(chosenLetter) >= 0) {
		guessedWord();
		checkIfGameWon();
	}
	// Adds an error, updates the sprite and checks if the player lost
	else if (answer.indexOf(chosenLetter) === -1) 
	{
		mistakes++;
		updateMistakes();
		updateHangmanPicture();
		checkIfGameLost();
	}
}

// The function to update the sprite. The format is "number of mistakes".jpg E.G. first image will be 0.jpg
function updateHangmanPicture() {
	document.getElementById('sayonara').src = './images/' + mistakes + '.jpg';
}

// Checks if the player found all the letters of the word and if yes gives him the win
function checkIfGameWon() {
	if (wordStatus === answer) {
		document.getElementById('keyboard').innerHTML = 'Gagné !';
		victory.play();
	}
}

// Checks if the player has lost and if yes gives the answer
function checkIfGameLost() {
	if (mistakes === maxWrong) {
		document.getElementById('wordSpotlight').innerHTML = 'La réponse était le mot : ' + answer;
		document.getElementById('keyboard').innerHTML = 'Sayonara :(';
		failure.play();
	}
}

// Draws the amount of letters in the word to guess
function guessedWord() {
	wordStatus = answer.split('').map(letter => (guessed.indexOf(letter) >= 0 ? letter : " _ ")).join('');
	document.getElementById('wordSpotlight').innerHTML = wordStatus;
}

// Self-explanatory
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
