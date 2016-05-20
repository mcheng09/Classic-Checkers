console.log("LINKED!!!!!!");

var redPieces;
var blackPieces;
var boxes;
var spaces = [0,1,2,3,5,6,7,8,9,10,11,12,14,15,16,17,18,19,20,21,23,24,25,26,27,28,29,30,32,33,34,35];
var turn = "red"; //will switch between red and black

window.onload = function(){
  startGame();
};

function startGame(){
  scoreCounter();
  singleEventListenerRed();
  singleEventListenerBlack();
  singleEventListenerRedMove();
  singleEventListenerBlackMove();
  addStartOver();
}

function selectRedPiece(){
  if(turn == "red") {
    removeSquaresRed();
    var selectedPiece = this;
    var selectedGridLocation = selectedPiece.getAttribute("data-num");
    selectedPiece.className = "redPiece highlightRed";
    //show possible moves
    var currentCell = selectedPiece;
    var currentCellNum = currentCell.getAttribute("data-num");
    //console.log(currentCellNum);
    for(var i = 0 ; i < spaces.length ; i++) {
      // if any of the squares already have the "highlightedRed" class remove it.
      var cellMinus4 = parseInt(currentCellNum) - 4;
      var cellMinus5 = parseInt(currentCellNum) - 5;
      if ( spaces[i] === cellMinus4 ){
        // if cellMinus4 does not include redPiece ...
        // next an if/else statement to check whether there's a piece of not on that spot
        //if () {
        //}
        //else{
          var firstOption = document.querySelector("[data-num='" + cellMinus4 + "']");
          //console.log( firstOption );
          firstOption.className = "highlightMoveRed";
        //}
      }
      else if ( spaces[i] === cellMinus5 ){
        var secondOption = document.querySelector("[data-num='" + cellMinus5 + "']");
        //console.log( secondOption );
        secondOption.className = "highlightMoveRed";
      }
    }
  }
}

function selectBlackPiece(){
  // grab the current elements
  // boxes = document.getElementsByClassName("blackPiece")
  // remove the class (white or black)
  // add the class yellow
  if(turn == "black"){
    removeSquaresBlack();
    var selectedPiece = this;
    var selectedGridLocation = selectedPiece.getAttribute("data-num");
    selectedPiece.className = "blackPiece highlightBlack";
    //document.getElementsByClassName("highlightBlack").innerHTML=" ";
    var currentCell = selectedPiece;
    var currentCellNum = currentCell.getAttribute("data-num");
    //console.log(currentCellNum);
    for(var i = 0 ; i < spaces.length ; i++) {
      var cellPlus4 = parseInt(currentCellNum) + 4;
      var cellPlus5 = parseInt(currentCellNum) + 5;
      if ( spaces[i] === cellPlus4 ){
        var firstOption = document.querySelector("[data-num='" + cellPlus4 + "']");
        //console.log( firstOption );
        firstOption.className = "highlightMoveBlack";
      }
      else if ( spaces[i] === cellPlus5 ){
        var secondOption = document.querySelector("[data-num='" + cellPlus5 + "']");
        //console.log( secondOption );
        secondOption.className = "highlightMoveBlack";
      }
        //change cell data-num = spaces[i] to red class
        //how do I select a data num by combing the currentCellNum?
    }
  }
}

function redMove(){
  //change red class to: "white redPiece"
  var selectedCell = this;
  //console.log(selectedCell);
  var selectedGridLocation = selectedCell.getAttribute("data-num");
  singleEventListenerRedMove();
  selectedCell.className = "white redPiece";
  var redSquare = document.getElementsByClassName("highlightMoveRed");
  for(var i = 0; i <= redSquare.length + 1; i++) {
    if (redSquare.length != 0) {
      redSquare[0].className = "white";
    }
  }
  var yellowSquare = document.getElementsByClassName("highlightRed");
  for(var i = 0; i <= yellowSquare.length + 1 ; i++) {
    //console.log(i);
    if (yellowSquare.length != 0) {
      yellowSquare[0].className = "white";
    }
  }
  document.getElementById("notifier").innerHTML = "Black's turn"
  turn = "black"
}

function blackMove(){
  //change red class to: "white blackPiece"
  var selectedCell = this;
  //console.log(selectedCell);
  var selectedGridLocation = selectedCell.getAttribute("data-num");
  singleEventListenerBlackMove();
  selectedCell.className = "white blackPiece";
  var redSquare = document.getElementsByClassName("highlightMoveBlack");
  for(var i = 0; i <= redSquare.length + 1; i++) {
    if (redSquare.length != 0) {
      redSquare[0].className = "white";
    }
  }
  var yellowSquare = document.getElementsByClassName("highlightBlack");
  for(var i = 0; i <= yellowSquare.length + 1 ; i++) {
    //console.log(i);
    if (yellowSquare.length != 0) {
      yellowSquare[0].className = "white";
    }
  }
  document.getElementById("notifier").innerHTML = "Red's turn"
  turn = "red"
}

function removeSquaresRed () {
  var redSquare = document.getElementsByClassName("highlightMoveRed");
  for(var i = 0; i <= redSquare.length + 1; i++) {
//    console.log(i);
    if (redSquare.length != 0) {
      redSquare[0].className = "white";
    }
  }
  var yellowSquare = document.getElementsByClassName("highlightRed");
  for(var i = 0; i <= yellowSquare.length + 1 ; i++) {
//    console.log(i);
    if (yellowSquare.length != 0) {
      yellowSquare[0].className = "white redPiece";
    }
  }
}

function removeSquaresBlack () {
  var redSquare = document.getElementsByClassName("highlightMoveBlack");
  for(var i = 0; i <= redSquare.length + 1; i++) {
//    console.log(i);
    if (redSquare.length != 0) {
      redSquare[0].className = "white";
    }
  }
  var yellowSquare = document.getElementsByClassName("highlightBlack");
  for(var i = 0; i <= yellowSquare.length + 1 ; i++) {
//    console.log(i);
    if (yellowSquare.length != 0) {
      yellowSquare[0].className = "white blackPiece";
    }
  }
}

function singleEventListenerRed () {
  var boxes = document.getElementsByClassName("redPiece");
  //console.log(boxes);
  for (var i = 0; i < boxes.length; i++){
    boxes[i].addEventListener("click" , selectRedPiece);
  }
}

function singleEventListenerBlack () {
  var boxes = document.getElementsByClassName("blackPiece");
  //console.log(boxes);
  for (var i = 0; i < boxes.length; i++){
    boxes[i].addEventListener("click" , selectBlackPiece);
  }
}

function singleEventListenerRedMove () {
  var boxes = document.getElementsByClassName("highlightMoveRed");
  for (var i = 0 ; i < boxes.length ; i++) {
    boxes[i].addEventListener("click", redMove);
  }
}

function singleEventListenerBlackMove () {
  var boxes = document.getElementsByClassName("highlightMoveBlack");
  for (var i = 0 ; i < boxes.length ; i++) {
    boxes[i].addEventListener("click", blackMove);
  }
}

function addStartOver(){
  var startingOver = document.getElementById("reset");
  startingOver.addEventListener("click", startOver);
}

function startOver(){
  location.reload();
}

function scoreCounter(redScore,blackScore) {
  //grab the pieces from the html
  redPieces = document.getElementsByClassName("redPiece");
  blackPieces = document.getElementsByClassName("blackPiece");
  //find pieces left for each player
  redScore = redPieces.length;
  blackScore = blackPieces.length;
  //place the value in the counter and change the text so that it reflects it
  var redCount = document.getElementById("redCounter");
  var blackCount = document.getElementById("blackCounter");
  redCount.innerHTML = redScore;
  blackCount.innerHTML = blackScore;
}
