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
  addStartOver();
}

function selectRedPiece(){
  if(turn == "red") {
    var selectedPiece = this;
    var selectedGridLocation = selectedPiece.getAttribute("data-num");
    var selectedPieceAttr = selectedPiece.getAttribute("class");
    if (selectedPieceAttr == "white redPiece") {
      removeSquaresRed();
      selectedPiece.className = "redPiece highlightRed";
      singleEventListenerRedMove();
      //show possible moves
      var currentCell = selectedPiece;
      var currentCellNum = currentCell.getAttribute("data-num");
      //console.log(currentCellNum);
      for(var i = 0 ; i < spaces.length ; i++) {
        // if any of the squares already have the "highlightedRed" class remove it.
        var cellMinus4 = parseInt(currentCellNum) - 4;
        var cellMinus5 = parseInt(currentCellNum) - 5;
        if ( spaces[i] === cellMinus4 ){
          var firstOption = document.querySelector("[data-num='" + cellMinus4 + "']");
          // if cellMinus4 does not include redPiece ...
          var checkSpot = firstOption.getAttribute("class");
          if (checkSpot == "white redPiece") {
            // console.log("Did nothing 1(red)")
          }
          else if (checkSpot == "white blackPiece") {
            for(var i = 0; i < spaces.length ; i++) {
              var cellMinus8 = parseInt(currentCellNum) - 8;
              if (spaces[i] === cellMinus8) {
                var jumpOption = document.querySelector("[data-num='" + cellMinus8 + "']");
                var checkJumpSpot = jumpOption.getAttribute("class");
                if (checkJumpSpot == "white redPiece" || checkJumpSpot == "white blackPiece") {
                  console.log("FREEZE!")
                }
                else {
                  firstOption.className = "highlightTakePiece blackPiece"
                  jumpOption.className = "highlightMoveRed";
                }
              }
            }
          }
          // next an if/else statement to check whether there's a piece of not on that spot
          else {
            firstOption.className = "highlightMoveRed";
          }
        }
        else if ( spaces[i] === cellMinus5 ){
          var secondOption = document.querySelector("[data-num='" + cellMinus5 + "']");
          var checkSpot = secondOption.getAttribute("class");
          if (checkSpot == "white redPiece") {
            // console.log("Did nothing 2(red)")
          }
          else if (checkSpot == "white blackPiece") {
            for(var j = 0; j < spaces.length ; j++) {
              var cellMinus10 = parseInt(currentCellNum) - 10;
              if (spaces[j] === cellMinus10) {
                var jumpOption = document.querySelector("[data-num='" + cellMinus10 + "']");
                var checkJumpSpot = jumpOption.getAttribute("class");
                if (checkJumpSpot == "white redPiece" || checkJumpSpot == "white blackPiece") {
                  console.log("FREEZE!")
                }
                else {
                  secondOption.className = "highlightTakePiece blackPiece"
                  jumpOption.className = "highlightMoveRed";
                }
              }
            }
          }
          else {
          //console.log( secondOption );
            secondOption.className = "highlightMoveRed";
          }
        }
      }
    }
    // console.log("Not a valid selection")
    checkForWin();
    boardWatch();
    singleEventListenerRedMove();
  }
}

function selectBlackPiece(){
  // grab the current elements
  // boxes = document.getElementsByClassName("blackPiece")
  // remove the class (white or black)
  // add the class yellow
  if(turn == "black"){
    var selectedPiece = this;
    var selectedGridLocation = selectedPiece.getAttribute("data-num");
    var selectedPieceAttr = selectedPiece.getAttribute("class");
    if (selectedPieceAttr == "white blackPiece") {
      removeSquaresBlack();
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
          var checkSpot = firstOption.getAttribute("class");
          if (checkSpot == "white blackPiece") {
            // console.log("Did nothing 1(black)")
          }
          else if (checkSpot == "white redPiece") {
            for(var j = 0; j < spaces.length ; j++) {
              var cellPlus8 = parseInt(currentCellNum) + 8;
              if (spaces[j] === cellPlus8) {
                var jumpOption = document.querySelector("[data-num='" + cellPlus8 + "']");
                var checkJumpSpot = jumpOption.getAttribute("class");
                if (checkJumpSpot == "white redPiece" || checkJumpSpot == "white blackPiece") {
                  console.log("FREEZE!")
                }
                else {
                  firstOption.className = "highlightTakePiece redPiece"
                  jumpOption.className = "highlightMoveBlack";
                }
              }
            }
          }
          //console.log( firstOption );
          else {
            firstOption.className = "highlightMoveBlack";
          }
        }
        else if ( spaces[i] === cellPlus5 ){
          var secondOption = document.querySelector("[data-num='" + cellPlus5 + "']");
          //console.log( secondOption );
          var checkSpot = secondOption.getAttribute("class");
          if (checkSpot == "white blackPiece") {
            // console.log("Did nothing 2(black)")
          }
          else if (checkSpot == "white redPiece") {
            for(var i = 0; i < spaces.length ; i++) {
              var cellPlus10 = parseInt(currentCellNum) + 10;
              if (spaces[i] === cellPlus10) {
                var jumpOption = document.querySelector("[data-num='" + cellPlus10 + "']");
                var checkJumpSpot = jumpOption.getAttribute("class");
                if (checkJumpSpot == "white redPiece" || checkJumpSpot == "white blackPiece") {
                  console.log("FREEZE!")
                }
                else {
                  secondOption.className = "highlightTakePiece redPiece"
                  jumpOption.className = "highlightMoveBlack";
                }
              }
            }
          }
          else {
            secondOption.className = "highlightMoveBlack";
          }
        }
      }
    }
    // console.log("Not a valid selection")
    checkForWin();
    boardWatch();
    singleEventListenerBlackMove();
  }
}

function redMove(){
  //change red class to: "white redPiece"
  var selectedCell = this;
  var selectedCellAttr = selectedCell.getAttribute("class")
  //console.log(selectedCell);
  var selectedGridLocation = selectedCell.getAttribute("data-num");
  //singleEventListenerRedMove();
  if (selectedCellAttr == "highlightMoveRed") {
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
    var takePiece = document.getElementsByClassName("highlightTakePiece blackPiece")
    for(var i = 0; i <= takePiece.length + 1 ; i++) {
      if (takePiece.length != 0) {
        takePiece[0].className = "white";
      }
    }
    document.getElementById("notifier").innerHTML = "Black's turn"
    turn = "black"
  }
  else {
    // console.log("Can't move there!")
  }
  boardWatch();
}

function blackMove(){
  //change red class to: "white blackPiece"
  var selectedCell = this;
  var selectedCellAttr = selectedCell.getAttribute("class")
  // console.log(selectedCellAttr);
  var selectedGridLocation = selectedCell.getAttribute("data-num");
  //singleEventListenerBlackMove();
  if (selectedCellAttr == "highlightMoveBlack") {
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
    var takePiece = document.getElementsByClassName("highlightTakePiece redPiece")
    for(var i = 0; i <= takePiece.length + 1 ; i++) {
      if (takePiece.length != 0) {
        takePiece[0].className = "white";
      }
    }
    document.getElementById("notifier").innerHTML = "Red's turn"
    turn = "red";
  }
  else {
    // console.log ("Can't move there!")
  }
  boardWatch();
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
  var greenSquare = document.getElementsByClassName("highlightTakePiece");
  for(var i = 0; i <= greenSquare.length + 1; i++) {
//    console.log(i);
    if (greenSquare.length != 0) {
      greenSquare[0].className = "white blackPiece";
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
  var greenSquare = document.getElementsByClassName("highlightTakePiece");
  for(var i = 0; i <= greenSquare.length + 1; i++) {
//    console.log(i);
    if (greenSquare.length != 0) {
      greenSquare[0].className = "white redPiece";
    }
  }
}

function boardWatch(){
  singleEventListenerRed();
  singleEventListenerBlack();
}

function checkForWin() {
  if (redPieces == 0) {
    alert("Player 1 wins!");
  }
  else if (blackPieces == 0) {
    alert("Player 2 wins!");
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
