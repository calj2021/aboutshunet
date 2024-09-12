
//Create an array 
//const arrayX = [10, 60, 110, 160, 210, 260, 310, 360, 410, 460, 510, 560, 610, 660, 710];
const arrayX = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19];
//const arrayY = [10, 60, 110, 160, 210, 260, 310, 360, 410, 460, 510];
const arrayY = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19];

let arrayXY = [];

for (let i=0; i<arrayX.length; i++){
  for(let j=0; j<arrayY.length; j++){
    arrayXY.push([arrayX[i],arrayY[j]])
  }
}


// Get the canvas element and its 2d drawing context
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

// Set the line properties
ctx.strokeStyle = 'black'; //line color
ctx.lineWidth = 1; //line width
ctx.font = "20px serif"

function drawingX(x, y){ 
  ctx.beginPath(); 
  ctx.moveTo(x*20+50,y*20+50);  
  ctx.lineTo(x*20+70,y*20+50);
  ctx.stroke(); 
  //ctx.fillStyle = 'blue'
  //ctx.fillRect(x*50,y*50,50,50);
  
}

function drawingY(x,y){
  ctx.beginPath(); 
  ctx.moveTo(x*20+50,y*20+50);  
  ctx.lineTo(x*20+50,y*20+70); 
  ctx.stroke(); 
}

/*
for (let i=0; i<arrayXY.length; i++){
  drawingX(arrayXY[i][0],arrayXY[i][1]);
  drawingY(arrayXY[i][0],arrayXY[i][1]);
  //ctx.fillStyle = "blue";
  //ctx.fillRect(arrayXY[i][0]*50,arrayXY[i][1]*50,50,50);
  
  //ctx.strokeText(arrayXY[i][0].toString()+","+arrayXY[i][1].toString(),arrayXY[i][0]*50,arrayXY[i][1]*50+40);

}
*/

for (let i=0; i<4; i++){

    for (let i=0; i<20; i++){
    if (i !== 13){
      drawingX(arrayX[i], 20);
    }
    drawingX(arrayX[i], 0);
    
  }

  for (let i=0; i<20; i++){
    if (i !==3) {
      drawingY(0,arrayY[i]);
    }
    
    drawingY(20,arrayY[i]);
  }

}






let start = [0,3];
let stop = [13,19];

let usedCells = [];
let deadCells = [];
let neighbourCells = [];
let unUsedCells =[];
let gameOn = 1;

//color the cell
function colorTheCell(x,y,color){
  ctx.fillStyle = color;
  ctx.fillRect(x*20+55,y*20+55,10,10);
}


ctx.strokeText('->', start[0]*20+50, start[1]*20+65);
ctx.strokeText('*', stop[0]*20+55, stop[1]*20+70);
//given a direction, the current cell is moving to the neighbour cell, 1 right, 2 left, 3 down, 4 up
function direction(x,y,direct){
  if (direct === 1) {
    x = x+1;
  } else if (direct === 2) {
    x = x-1;
  } else if (direct === 3) {
    y = y+1;
  } else {
    y = y-1;
  }
  return ([x,y])
}


// compare two arrays first.
function compareTwoArrays(arr1, arr2){
  let count = 0;
  if (arr1.length === arr2.length) {
    for (let i=0; i<arr1.length; i++){
      if (arr1[i] === arr2[i]) {
        count ++; 
      }
    }
    if (count === arr1.length) {
      return true;
    } else {
      return false;
    }
  }
  else {
    return false;
  }
}

//check if an array (tarArr) is inside another array (arrOfArr)
function arrInArr(tarArr,arrOfArr){
  for (let i = 0; i<arrOfArr.length; i++){
    if (compareTwoArrays(tarArr, arrOfArr[i]) === true){
      return true
    } 
  }
  return false 
}

//check available moves: x+1 -> 1; x-1 -> 2; y+1 -> 3; y-1 ->4.
function availMoveForward(position) {
  let availMoves = [];
  if (checkPositionValidForward([position[0]+1,position[1]])){ 
    availMoves.push(1);
  } 
  if (checkPositionValidForward([position[0]-1,position[1]])) {
    availMoves.push(2);
  } 
  if (checkPositionValidForward([position[0],position[1]+1])) {
    availMoves.push(3)
  }
  if (checkPositionValidForward([position[0],position[1]-1])){
      availMoves.push(4)
    }
  if (availMoves.length === 0) {
    return false;
  } else {
    return availMoves;
  }
}


//check available moves backwards: x+1 -> 1; x-1 -> 2; y+1 -> 3; y-1 ->4.
function availMoveBackward(position) {
  let availMoves = []; 
  if (checkPositionValidBackward([position[0]+1,position[1]])){ 
    availMoves.push(1);
  } 
  if (checkPositionValidBackward([position[0]-1,position[1]])) {
    availMoves.push(2);
  } 
  if (checkPositionValidBackward([position[0],position[1]+1])) {
    availMoves.push(3)
  }
  if (checkPositionValidBackward([position[0],position[1]-1])){
      availMoves.push(4)
    }
  if (availMoves.length === 0) {
    return false;
  } else {
    return availMoves;
  }
}

//given a number, then move to a direction
function direction(position, direct){
  let newPostion = [];
  if (direct === 1) {
    newPostion[0] = position[0]+1;
    newPostion[1] = position[1];
  }
  if (direct === 2) {
    newPostion[0] = position[0]-1;
    newPostion[1] = position[1];
  }
  if (direct === 3) {
    newPostion[0] = position[0];
    newPostion[1] = position[1]+1;
  }
  if (direct === 4) {
    newPostion[0] = position[0];
    newPostion[1] = position[1]-1;
  }
  return newPostion;
}

function checkPositionValidForward(position){
  if (position[0] <0 || position[1] <0 || position[0] >19 || position[1] >19 || arrInArr(position, usedCells) || arrInArr(position, deadCells)|| arrInArr(position, neighbourCells)){
    return false;
  }
  return true;
}

function checkPositionValidBackward(position){
  if (position[0] <0 || position[1] <0 || position[0] >19 || position[1] >19 || arrInArr(position, usedCells) || arrInArr(position, deadCells)){
    return false;
  }
  return true;
}

let currentPosition = start
usedCells.push(start);


//to find a skiiny path from the start cell to the end cell

while (gameOn === 1) {
  let availableMoves = [];
  if (availMoveForward(currentPosition) === false) {
    //colorTheCell(currentPosition[0],currentPosition[1],'yellow');
    let deadCell = [];
    deadCell = currentPosition;
    usedCells.pop();
    deadCells.push(deadCell);
    //move back to the previous cell
    currentPosition = usedCells[usedCells.length-1];
    availableMoves = availMoveBackward(currentPosition);
    
    for (let i=0; i<availableMoves.length; i++){
      let neighbourCell = [];
      neighbourCell = direction(currentPosition,availableMoves[i]);
      if (arrInArr(neighbourCell,neighbourCells)) {
          const index = neighbourCells.findIndex(arr => JSON.stringify(arr) === JSON.stringify(neighbourCell));
          if (index !== -1) {
              neighbourCells.splice(index, 1);
          }
      }
    }
  } else {
    availableMoves = availMoveForward(currentPosition);
    let direct = availableMoves[Math.floor(Math.random() * availableMoves.length)]
    const restAvailableMoves = availableMoves.filter(item => item !== direct);

    currentPosition = direction(currentPosition,direct);
    //colorTheCell(currentPosition[0],currentPosition[1],'blue');
    usedCells.push(currentPosition);
  
  }  

  if (compareTwoArrays(currentPosition, stop)) {
    gameOn = 0;
  } 
}


function isOnX(pre, cur, next) {
  if (pre[0] >=0 || next[0] <=19) {
    if (pre[0] === cur[0] && cur[0] === next[0]) 
      return true;
  } else if (pre[0]<0){
    if (cur[0] === next[0])
      return true;
  } else {
    if (pre[0] === cur[0])
      return true;
  }
}

function isOnY(pre, cur, next) {
  if (pre[1] >=0 || next[1]<= 19 ) {
    if (pre[1] === cur[1] && cur[1] === next[1]) 
      return true;
  } else if (pre[1] < 0) {
    if (cur[1] === next[1])
      return true;
  } else {
    if (pre[1] === cur[1]){
      return true;
    }
  }
}
//NW cornor, both lines can be drawn 
function isCornor1(pre, cur, next){
  if (pre[0]>next[0]){
    let temp = pre;
    pre = next;
    next = temp;
  }
  if (pre[0]=== cur[0] && cur[1]=== next[1] && pre[1]>cur[1]){
    return true;
  } else {
    return false;
  }

}
//NE cornor, only X line can be drawn
function isCornor2(pre, cur, next){
  if (pre[0]>next[0]){
    let temp = pre;
    pre = next;
    next = temp;
  }

  if (pre[1]=== cur[1] && cur[0]===next[0] && cur[1]<next[1]){
    return true;
  } else {
    return false;
  }

}

//SW cornor, ony Yline can be drawn
function isCornor3(pre, cur, next){
  if (pre[0]>next[0]){
    let temp = pre;
    pre = next;
    next = temp;
  }
  if (pre[0]=== cur[0] && cur[1]===next[1] && pre[1]<cur[1]){
    return true;
  } else {
    return false;
  }
}


for (let i=1; i<usedCells.length-1; i++){
  if (isOnX(usedCells[i-1],usedCells[i],usedCells[i+1])){

        drawingY(usedCells[i][0],usedCells[i][1]);
 
  }
  if (isOnY(usedCells[i-1],usedCells[i],usedCells[i+1])){
    
      drawingX(usedCells[i][0],usedCells[i][1]);
 
  }

  if (isCornor1(usedCells[i-1],usedCells[i],usedCells[i+1])){
    
      drawingX(usedCells[i][0],usedCells[i][1]);
  
      drawingY(usedCells[i][0],usedCells[i][1]);
   
  }

  if (isCornor2(usedCells[i-1],usedCells[i],usedCells[i+1])){
    
      drawingX(usedCells[i][0],usedCells[i][1]);

  }

  if (isCornor3(usedCells[i-1],usedCells[i],usedCells[i+1])){
    
      drawingY(usedCells[i][0],usedCells[i][1]);
    }

  //colorTheCell(usedCells[i][0],usedCells[i][1],'pink');
  
}


//************************************************************** */

//To make the maze look better, with no dead cells, all the cells can be accessible.

// unUsed cells -> find those cells that can be connected -> put them in an array -> visit each cell -> if it is on the x axis, draw X , on y axis, draw Y 

// check the neighbour cells.
//draw random lines on the canvas to create a maze
for (let i=0; i<arrayXY.length; i++){
  if (arrInArr(arrayXY[i],usedCells) === false) {
    unUsedCells.push(arrayXY[i]);
  }
}




 
let visitedUnusedCells = [];
let visitingCell = unUsedCells[0];

function checkPositionValidForwardinUnusedCells(position){
  if (position[0] <0 || position[1] <0 || position[0] >19 || position[1] >19 || arrInArr(position, usedCells) || arrInArr(position, visitedUnusedCells) ){
    return false;
  }
  return true;
}
 

function availMoveForwardUnusedCells(position) {
  let availMoves = [];
  if (checkPositionValidForwardinUnusedCells([position[0]+1,position[1]])){ 
    availMoves.push(1);
  } 
  if (checkPositionValidForwardinUnusedCells([position[0]-1,position[1]])) {
    availMoves.push(2);
  } 
  if (checkPositionValidForwardinUnusedCells([position[0],position[1]+1])) {
    availMoves.push(3)
  }
  if (checkPositionValidForwardinUnusedCells([position[0],position[1]-1])){
      availMoves.push(4)
    }
  if (availMoves.length === 0) {
    return false;
  } else {
    return availMoves;
  }
}
// //console.log(visitedUnusedCells);
// //console.log(unUsedCells);

while (visitedUnusedCells.length < unUsedCells.length){
  //console.log("test");
  
  if (availMoveForwardUnusedCells(visitingCell) === false) {
    console.log("test1");
    console.log(visitingCell);
    //colorTheCell(visitingCell[0],visitingCell[1],'yellow')
    if (visitedUnusedCells.length >0 && visitingCell[0] === visitedUnusedCells[visitedUnusedCells.length-1][0]) {
      if (visitingCell[1] > visitedUnusedCells[visitedUnusedCells.length-1][1]) {
        drawingX(visitingCell[0],visitingCell[1]);
        drawingY(visitingCell[0],visitingCell[1]);
      } else {
        drawingY(visitingCell[0],visitingCell[1]);
      }
    } else if (visitedUnusedCells.length >0 && visitingCell[1] === visitedUnusedCells[visitedUnusedCells.length-1][1]) {
      if (visitedUnusedCells[visitedUnusedCells.length-1][0]>0 && visitingCell[0] < visitedUnusedCells[visitedUnusedCells.length-1][0]) {
        drawingX(visitingCell[0],visitingCell[1]);
        drawingY(visitingCell[0],visitingCell[1]);
      } else {
        drawingX(visitingCell[0],visitingCell[1]);
      }
    } else {
      drawingX(visitingCell[0],visitingCell[1]);
       // drawingY(visitingCell[0],visitingCell[1]);
    }
    
    if (!arrInArr(visitingCell,visitedUnusedCells)) {
      visitedUnusedCells.push(visitingCell);
    }
    
    for (let i=0; i<unUsedCells.length; i++){
      if (!arrInArr(unUsedCells[i],visitedUnusedCells)){
        visitingCell = unUsedCells[i];
        break;
      }
    }
  } else {
  
    let availableMoves = availMoveForwardUnusedCells(visitingCell);
    let direct = availableMoves[Math.floor(Math.random() * availableMoves.length)]
    visitingCell = direction(visitingCell,direct);

    if (!arrInArr(visitingCell,visitedUnusedCells)) {
      visitedUnusedCells.push(visitingCell);
    }

  }
}


for (let i=1; i<visitedUnusedCells.length-1; i++){
  if (isOnX(visitedUnusedCells[i-1],visitedUnusedCells[i],visitedUnusedCells[i+1])){
        drawingY(visitedUnusedCells[i][0],visitedUnusedCells[i][1]);
  } else if (isOnY(visitedUnusedCells[i-1],visitedUnusedCells[i],visitedUnusedCells[i+1])){
      drawingX(visitedUnusedCells[i][0],visitedUnusedCells[i][1]);
  } else if (isCornor1(visitedUnusedCells[i-1],visitedUnusedCells[i],visitedUnusedCells[i+1])){
      drawingX(visitedUnusedCells[i][0],visitedUnusedCells[i][1]);
      drawingY(visitedUnusedCells[i][0],visitedUnusedCells[i][1]);
  } else if (isCornor2(visitedUnusedCells[i-1],visitedUnusedCells[i],visitedUnusedCells[i+1])){
      drawingX(visitedUnusedCells[i][0],visitedUnusedCells[i][1]);
  } else if (isCornor3(visitedUnusedCells[i-1],visitedUnusedCells[i],visitedUnusedCells[i+1])){
      drawingY(visitedUnusedCells[i][0],visitedUnusedCells[i][1]);
  } else {
    let odds = Math.floor(Math.random()* 10);
    if (odds === 1 || odds === 2 || odds === 3|| odds === 4 || odds === 5  ) {
      // drawingX(visitedUnusedCells[i][0],visitedUnusedCells[i][1]);
      // drawingY(visitedUnusedCells[i][0],visitedUnusedCells[i][1]);
    
    }
     
  }
  
    //colorTheCell(visitedUnusedCells[i][0],visitedUnusedCells[i][1],'yellow');
}
