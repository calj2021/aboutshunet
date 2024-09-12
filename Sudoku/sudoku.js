const arrayX = [0,1,2,3,4,5,6,7,8];

const arrayY = [0,1,2,3,4,5,6,7,8];

const scale = 40;
const cellWidth = 40;
const cordinateX = 70;
const cordinateY = 70;


class Cell {
  constructor(x, y) {
      this.x = x;                // X coordinate
      this.y = y;                // Y coordinate
      this.number = 0;      // Number displayed in the cell
      this.usedNums = []; // Any other information
  }
  // Example method to display cell info
  addNum(){
    this.usedNums.push(this.number);
  }
}

class Lists{
  constructor(listCells, listValues){
    this.listCells = listCells;
    this.listValues = listValues;
  }
}



//Create a 9x9 grid of cells
let grid = [];

//Create lists of horizontal, vertical, and small squares
let totalLists = [];
let verticalLists = [];
let horizontalLists = [];
let smallSquareLists = [];

for (let x = 0; x < 9; x++) {
  grid[x] = [];
  let verticalList = [];
  for (let y = 0; y < 9; y++) {
      //let number = randomIntOneToNine(); // Just an example for the number 
      grid[x][y] = new Cell(x, y);
      verticalList.push(grid[x][y]);
  }
  verticalLists[x] = new Lists (verticalList, [4,5,6,7]);
}



//User can enter some pre-plotted number on the grid as grid[x][y].number, and push them to a list as knowGridList
let knownGridList = [];

for (let y = 0; y < 9; y ++) {
  let horizontalList = [];
  for (let x = 0; x < 9; x++) {
    horizontalList.push(grid[x][y]);
  }
  horizontalLists[y] = new Lists (horizontalList, [1,2,3,4]);
}

//create a function to generate a list of 9 cells in a square
function creatingSmallSquareList(startX, startY){
  let smallSquareList = []; 
    for (let x = startX; x < startX+3; x++) { 
      for (let y = startY; y < startY+3; y++) {
        smallSquareList.push(grid[x][y]);
      }    
    }
    return smallSquareList;
}

// Use for loop to iterate all the 9 small squares of the big 9X9 cells. 0 1 2, vertical, 3 4 5, vertical, 7 8 9 vertical  
let index = 0;
let threeTimeThreeList = [];
for (let x=0; x<9; x+=3){
  for (let y=0; y<9; y+=3){
    let aList = creatingSmallSquareList(x,y);
    smallSquareLists[index] = new Lists (aList, [1,2,7,9]);
    index ++;
    threeTimeThreeList.push([Math.floor(x/3),Math.floor(y/3)])
  }
}


// Get the canvas element and its 2d drawing context
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

// Set the line properties
ctx.strokeStyle = 'black'; //line color
ctx.lineWidth = 1; //line width
ctx.font = "20px serif";

//draw a line from x to x+cellWidth
function drawingX(x, y){ 
  ctx.beginPath(); 
  ctx.moveTo(x*scale+cordinateX,y*scale+cordinateY);  
  ctx.lineTo(x*scale+cordinateX+cellWidth,y*scale+cordinateY); 
  ctx.stroke(); 
  // ctx.fillStyle = 'blue';
  // ctx.fillRect(x*50,y*50,50,50);
}


//draw a line from y to y+cellWidth
function drawingY(x,y){
  ctx.beginPath(); 
  ctx.moveTo(x*scale+cordinateX,y*scale+cordinateY);  
  ctx.lineTo(x*scale+cordinateX,y*scale+cordinateY+cellWidth); 
  ctx.stroke(); 
}


//creating a random number between 1-9
function randomIntOneToNine(){
  return Math.floor(Math.random() * 9+1);
}


// draw the borders with thick lines
for (let r=0; r<4; r++) {
  for (let i=0; i<9; i++){
    drawingX(arrayX[i], 0);
    drawingX(arrayX[i], 3); 
    drawingX(arrayX[i], 6); 
    drawingX(arrayX[i], 9);
  }
  
  for (let i=0; i<9; i++){  
    drawingY(0,arrayY[i]);
    drawingY(3,arrayY[i]);
    drawingY(6,arrayY[i]);
    drawingY(9,arrayY[i]);
  }

}

//****draw a 9X9 board, and display numbers in each cell.
//verticalLists; horizontalLists; smallSquareLists  
//check if number is in verticalList, horizontalList, or smallSquareList; if no, display the number; if yes, generate another number; If no number; back to the previous cell and change to a new number;

//Create a list that contains all the 9X9 cells
let arrayXY = [];
for (let x = 0; x < 9; x++) {
  for (let y = 0; y < 9; y++) {
      drawingX(grid[x][y].x, grid[x][y].y);
      drawingY(grid[x][y].x, grid[x][y].y);
      arrayXY.push(grid[x][y]);
        
  }
}



//start adding numbers to each cell
let visitedCells = [];

//check if number is in verticalList, horizontalList, or smallSquareList; if no, display the number; if yes, generate another number; 

function hasDuplicate(arr) {
  let uniqueSet = new Set(arr);
  return uniqueSet.size !== arr.length;
}


// this function to check if the number tried is valid
function isNumberValid(x, y){
    
    // Find the index of the target array
    let index = threeTimeThreeList.findIndex(innerArray => 
      innerArray.length === [Math.floor(x/3),Math.floor(y/3)].length && 
      innerArray.every((value, i) => value === [Math.floor(x/3),Math.floor(y/3)][i]));
    let horizontalListsNums = [];
    let verticalListsNums = [];
    let smallSquareListNums = [];
    for (let i=0; i<9; i++) {
      if (horizontalLists[y].listCells[i].number !== 0) {
        horizontalListsNums.push(horizontalLists[y].listCells[i].number );
      }
      if (verticalLists[x].listCells[i].number !== 0) {
        verticalListsNums.push(verticalLists[x].listCells[i].number);
      }
      if (smallSquareLists[index].listCells[i].number !== 0) {
        smallSquareListNums.push(smallSquareLists[index].listCells[i].number)
      } 
    }
    if (!hasDuplicate(horizontalListsNums) && !hasDuplicate(verticalListsNums) && !hasDuplicate(smallSquareListNums) ) {
      return true;
    } else {
      return false;
    }
}


//this function to find numbers haven't been tried yet
function availableNum(usedNums){
    let totalNum = [1,2,3,4,5,6,7,8,9];
    for (let i=0; i<usedNums.length; i++){
      if (totalNum.includes(usedNums[i])){
            // Find the index of the integer to remove
            let index = totalNum.indexOf(usedNums[i]);
            if (index !== -1) {
                // Remove the integer using splice
                totalNum.splice(index, 1);
                }
            }
    }
    return totalNum;
  }


//this function display the number on 9X9 board
function displayNum(x,y,number){
  ctx.fillStyle = `rgb(${x*30+number}, ${y*20+number}, ${number*30+x+y})`
  ctx.fillText(`${number}`, x*scale+cordinateX+15, y*scale+cordinateY+cellWidth/1.3);  
}


//visiting each cells, if the cell number is valid, display it; if no, change the number; if all the number is not valid, go back to the previous cell.

/*
let vIndex = 0;
while (vIndex < 81) {
  let availableNums = availableNum(arrayXY[vIndex].usedNums);
  arrayXY[vIndex].number = availableNums[Math.floor(Math.random()*availableNums.length)]
  arrayXY[vIndex].addNum(); 
  while (isNumberValid(arrayXY[vIndex].x, arrayXY[vIndex].y) === false ) {
      if (arrayXY[vIndex].usedNums.length === 9) {
        console.log("test --0");
        arrayXY[vIndex].usedNums =[];
        arrayXY[vIndex].number = 0;
        vIndex --; 
        while (arrayXY[vIndex].usedNums.length === 9){ //this loop is move back to a cell that has available numbers to choose
          arrayXY[vIndex].usedNums =[];
          arrayXY[vIndex].number = 0;
          vIndex -- ;
        }
        vIndex --;
        break;
      } 
      let availNums = availableNum(arrayXY[vIndex].usedNums);
      arrayXY[vIndex].number = availNums[Math.floor(Math.random()*availNums.length)];
      arrayXY[vIndex].addNum();
  } 
  vIndex++;
}
*/



let vIndex = 0;
while (vIndex < 81) {
  if (knownGridList.includes(arrayXY[vIndex])) {
    vIndex++;
  }
  let availableNums = availableNum(arrayXY[vIndex].usedNums);
  arrayXY[vIndex].number = availableNums[Math.floor(Math.random()*availableNums.length)]
  arrayXY[vIndex].addNum(); 
  while (isNumberValid(arrayXY[vIndex].x, arrayXY[vIndex].y) === false ) {
      if (arrayXY[vIndex].usedNums.length === 9) {
        console.log("test --0");
        arrayXY[vIndex].usedNums =[];
        arrayXY[vIndex].number = 0;
        vIndex --; 
       
        while (arrayXY[vIndex].usedNums.length === 9 || knownGridList.includes(arrayXY[vIndex]) ){ //this loop is move back to a cell that has available numbers to choose
          if (arrayXY[vIndex].usedNums.length === 9) {
            arrayXY[vIndex].usedNums =[];
            arrayXY[vIndex].number = 0;
          }
          vIndex -- ;   
        }
        vIndex --;
        break;
      } 
      let availNums = availableNum(arrayXY[vIndex].usedNums);
      arrayXY[vIndex].number = availNums[Math.floor(Math.random()*availNums.length)];
      arrayXY[vIndex].addNum();
  } 
  vIndex++;
}



//Finally draw the 9X9 board with numbers
for (let i=0; i<arrayXY.length; i++){
  displayNum(arrayXY[i].x, arrayXY[i].y, arrayXY[i].number);
}