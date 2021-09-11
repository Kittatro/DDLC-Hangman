var hiddenWord = ["aventure","amis","amusant","applaudissement","amour","bruyant","bonheur","blesser","coeur","calme","chanter","chanceux","chagrin","confort","cicatrices","chaleur","couleur","douleur","douceur","danse","enfance","espoir","extraodinaire","enthousiasme","ensemble","famille","fleur","rose","honte","impressionant","incroyable","joie","jouer","lit","luciole","malheur","mariage","merveilleux","maladroit","mort","musique","malchance","nature","nuage","paresseux","paisible","passion","peur","pendaison","pleurer","pardonner","plume","promesse","romance","rire","souvenirs","solitude","sourire","sombre","tristesse","vacances","voler","vide"]
var victory = new Audio('applause.mp3');
var failure = new Audio('sardoche.mp3');

let answer = '';
let maxWrong = 8;
let mistakes = 0;
let guessed = [];
let wordStatus = null;

function randomWord() 
{
  answer = hiddenWord[Math.floor(Math.random() * hiddenWord.length)];
}

function generateButtons() 
{
	let buttonsHTML = 'abcdefghijklmnopqrstuvwxyz'.split('').map(letter =>`<button id='` + letter + `' onClick="handleGuess('` + letter + `')">` + letter + `</button>`).join('');
	document.getElementById('keyboard').innerHTML = buttonsHTML;
}

function handleGuess(chosenLetter) 
{
guessed.indexOf(chosenLetter) === -1 ? guessed.push(chosenLetter) : null;
document.getElementById(chosenLetter).setAttribute('disabled', true);

if (answer.indexOf(chosenLetter) >= 0) {
guessedWord();
checkIfGameWon();
}
else if (answer.indexOf(chosenLetter) === -1) 
{
mistakes++;
updateMistakes();
checkIfGameLost();
updateHangmanPicture();
}
}

function updateHangmanPicture() 
{
document.getElementById('sayonara').src = './images/' + mistakes + '.jpg';
}

function checkIfGameWon() 
{
if (wordStatus === answer) 
{
document.getElementById('keyboard').innerHTML = 'Gagné !';
victory.play();
}
}

function checkIfGameLost() 
{
if (mistakes === maxWrong) 
{
document.getElementById('wordSpotlight').innerHTML = 'La réponse était le mot : ' + answer;
document.getElementById('keyboard').innerHTML = 'Sayonara :(';
failure.play();
}
}

function guessedWord() 
{
wordStatus = answer.split('').map(letter => (guessed.indexOf(letter) >= 0 ? letter : " _ ")).join('');
document.getElementById('wordSpotlight').innerHTML = wordStatus;
}

function updateMistakes() 
{
document.getElementById('mistakes').innerHTML = mistakes;
}

function reset() 
{
mistakes = 0;
guessed = [];
document.getElementById('sayonara').src = './images/0.jpg';
randomWord();
guessedWord();
updateMistakes();
generateButtons();
}

document.getElementById('maxWrong').innerHTML = maxWrong;
randomWord();
generateButtons();
guessedWord();