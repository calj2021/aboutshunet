import {guessItem} from "./hangmanGameList.js"; 

// Create a list of letters for the word to be guessed
let revealedContent = guessItem.guessName.split('');
console.log(revealedContent);
let counter = 10;

// Hide the word to be guessed 
let hiddenItem = '';
revealedContent.forEach((item) => {hiddenItem = hiddenItem + "- ";})
console.log(hiddenItem);
let inProgressItem = hiddenItem.split(' ');
inProgressItem.pop();
console.log(inProgressItem);


document.querySelector(".guess-hint-qs").innerHTML = `<p>The Chosen Category is ${guessItem.guessCategory}</p> <p class="hidden-letters">${hiddenItem} </p> <p>You Have ${counter} Lives</p>`

 // Get the container element where the buttons will be appended 
 const container = document.getElementById('button-container');
 const letterButtons = container.getElementsByClassName('custom-button');
 console.log(typeof(letterButtons));

 // Create 26 buttons using a loop
 for (let i=0; i< 26; i++) {
   // Create a button element
   const button = document.createElement('button');
   // Set the button text to a letter from 'A' to 'Z'
   button.textContent = String.fromCharCode(65+i);
   // Add a class for styling or other purposes (optional)
   button.className = 'custom-button';
   // Add a click event listener to each button (optional)
   button.addEventListener('click', function (){
     checkLetter(button.textContent);
     console.log(inProgressItem);
     document.querySelector(".guess-hint-qs").innerHTML = `<p>The Chosen Category is ${guessItem.guessCategory}</p> <p class="hidden-letters">${inProgressItem.join(' ')} </p> <p>You Have ${counter} Lives</p>`;
     button.disabled = true;
   })

   // Append the button to the container
   container.appendChild(button);
 }

 // Get the canvas element and its 2d drawing context
 const canvas = document.getElementById('myCanvas');
 const ctx = canvas.getContext('2d');
 // Set the line properties
 ctx.strokeStyle = 'blue'; //line color
 ctx.lineWidth = 2; //line width
  // Set circle properties
  const centerX = 145; // X-coordinate of the circle
  const centerY = 115; // Y-coordinate of the circle
  const radius = 15;
  const color = 'blue';
 

 // Start drawing the line
 const hangmanSteps = [
  function hangmanStep1(){
    ctx.beginPath();
    ctx.moveTo(50,270); 
    ctx.lineTo(300,270); 
    ctx.stroke();
    },
  
  function hangmanStep2(){
    ctx.beginPath();
    ctx.moveTo(70,270); 
    ctx.lineTo(70,70); 
    ctx.stroke();
    },

  function hangmanStep3() {
    ctx.beginPath();
    ctx.moveTo(50,80); 
    ctx.lineTo(160,80);
    ctx.stroke();
  }, 
  
  function hangmanStep4() {
    ctx.beginPath();
    ctx.moveTo(145,80); 
    ctx.lineTo(145,100);
    ctx.stroke();
  },

  function hangmanStep5(){
    //Draw the circle
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, 2* Math.PI); // Create a full circle
      ctx.strokeStyle = color; // Fill color of the circle
      ctx.stroke();
      //ctx.closePath();
    },
  
  function hangmanStep6(){
    ctx.beginPath();
    ctx.moveTo(145,130); 
    ctx.lineTo(145,190);
    ctx.stroke();
  },

  function hangmanStep7(){
    ctx.beginPath();
    ctx.moveTo(145,140); 
    ctx.lineTo(90,150);
    ctx.stroke();
  },
  function hangmanStep8(){
    ctx.beginPath();
    ctx.moveTo(145,140); 
    ctx.lineTo(200,150);
    ctx.stroke();
  },
  function hangmanStep9(){
    ctx.beginPath();
    ctx.moveTo(145,190); 
    ctx.lineTo(105,230);
    ctx.stroke();
  },
  function hangmanStep10(){
    ctx.beginPath();
    ctx.moveTo(145,190); 
    ctx.lineTo(185,230);
    ctx.stroke();
  }
]

 // Checking if letter is in the guessing word
 function checkLetter(letter){
  if (revealedContent.includes(letter) === true || revealedContent.includes(letter.toLowerCase()) === true ) {
    revealedContent.forEach((item, index) => {
      if (item === letter || item === letter.toLowerCase()) {
        inProgressItem[index] = item;
      } 
    })
  } else {
    hangmanSteps[10-counter]();
    counter = counter - 1;
    if (counter === 0 ) {
      for (let i=0; i<letterButtons.length; i++) {
        letterButtons[i].disabled = true;
      }
    }
  }
 }