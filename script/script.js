console.log("LINKED!!!!!!");

var redPieces;
var blackPieces;
var boxes;
var spaces = [0,1,2,3,5,6,7,8,9,10,11,12,14,15,16,17,18,19,20,21,23,24,25,26,27,28,29,30,32,33,34,35];
var turn = "red";

window.onload = function(){
  startGame();
};

function startGame(){
  scoreCounter();
  singleEventListenerRed();
  singleEventListenerBlack();
  addStartOver();
};

function selectRedPiece(){
  if(turn == "red") {
    var selectedPiece = this;
    var selectedGridLocation = selectedPiece.getAttribute("data-num");
    var selectedPieceAttr = selectedPiece.getAttribute("class");
    if (selectedPieceAttr == "white redPiece") {
      removeSquaresRed();
      selectedPiece.className = "redPiece highlightRed";
      var currentCell = selectedPiece;
      var currentCellNum = currentCell.getAttribute("data-num");
      for(var i = 0 ; i < spaces.length ; i++) {
        var cellMinus4 = parseInt(currentCellNum) - 4;
        var cellMinus5 = parseInt(currentCellNum) - 5;
        if ( spaces[i] === cellMinus4 ){
          var firstOption = document.querySelector("[data-num='" + cellMinus4 + "']");
          var checkSpot = firstOption.getAttribute("class");
          if (checkSpot == "white redPiece" || checkSpot == "white redKing") {
          }
          else if (checkSpot == "white blackPiece" || checkSpot == "white blackKing") {
            for(var i = 0; i < spaces.length ; i++) {
              var cellMinus8 = parseInt(currentCellNum) - 8;
              if (spaces[i] === cellMinus8) {
                var jumpOption = document.querySelector("[data-num='" + cellMinus8 + "']");
                var checkJumpSpot = jumpOption.getAttribute("class");
                if (checkJumpSpot == "white redPiece" || checkJumpSpot == "white blackPiece" || checkJumpSpot == "white redKing" || checkJumpSpot == "white blackKing") {
                  console.log("FREEZE!")
                }
                else {
                  firstOption.className = "highlightTakePiece blackPiece rightTarget"
                  jumpOption.className = "highlightMoveRed right";
                }
              }
            }
          }
          else {
            firstOption.className = "highlightMoveRed right";
          }
        }
        else if ( spaces[i] === cellMinus5 ){
          var secondOption = document.querySelector("[data-num='" + cellMinus5 + "']");
          var checkSpot = secondOption.getAttribute("class");
          if (checkSpot == "white redPiece" || checkSpot == "white redKing") {
          }
          else if (checkSpot == "white blackPiece" || checkSpot == "white blackKing") {
            for(var j = 0; j < spaces.length ; j++) {
              var cellMinus10 = parseInt(currentCellNum) - 10;
              if (spaces[j] === cellMinus10) {
                var jumpOption = document.querySelector("[data-num='" + cellMinus10 + "']");
                var checkJumpSpot = jumpOption.getAttribute("class");
                if (checkJumpSpot == "white redPiece" || checkJumpSpot == "white blackPiece" || checkJumpSpot == "white redKing" || checkJumpSpot == "white blackKing") {
                  console.log("FREEZE!")
                }
                else {
                  secondOption.className = "highlightTakePiece blackPiece leftTarget"
                  jumpOption.className = "highlightMoveRed left";
                }
              }
            }
          }
          else {
            secondOption.className = "highlightMoveRed left";
          }
        }
      }
    }
    singleEventListenerRedMove();
  }
}

function selectBlackPiece(){
  if(turn == "black"){
    var selectedPiece = this;
    var selectedGridLocation = selectedPiece.getAttribute("data-num");
    var selectedPieceAttr = selectedPiece.getAttribute("class");
    if (selectedPieceAttr == "white blackPiece") {
      removeSquaresBlack();
      selectedPiece.className = "blackPiece highlightBlack";
      var currentCell = selectedPiece;
      var currentCellNum = currentCell.getAttribute("data-num");
      for(var i = 0 ; i < spaces.length ; i++) {
        var cellPlus4 = parseInt(currentCellNum) + 4;
        var cellPlus5 = parseInt(currentCellNum) + 5;
        if ( spaces[i] === cellPlus4 ){
          var firstOption = document.querySelector("[data-num='" + cellPlus4 + "']");
          var checkSpot = firstOption.getAttribute("class");
          if (checkSpot == "white blackPiece") {
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
                  firstOption.className = "highlightTakePiece redPiece leftTarget"
                  jumpOption.className = "highlightMoveBlack left";
                }
              }
            }
          }
          else {
            firstOption.className = "highlightMoveBlack left";
          }
        }
        else if ( spaces[i] === cellPlus5 ){
          var secondOption = document.querySelector("[data-num='" + cellPlus5 + "']");
          var checkSpot = secondOption.getAttribute("class");
          if (checkSpot == "white blackPiece") {
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
                  secondOption.className = "highlightTakePiece redPiece rightTarget"
                  jumpOption.className = "highlightMoveBlack right";
                }
              }
            }
          }
          else {
            secondOption.className = "highlightMoveBlack right";
          }
        }
      }
    }
    boardWatch();
    singleEventListenerBlackMove();
  }
}

function redMove(){
  var selectedCell = this;
  var selectedCellAttr = selectedCell.getAttribute("class")
  var selectedGridLocation = selectedCell.getAttribute("data-num");
  if (selectedCellAttr == "highlightMoveRed left") {
    selectedCell.className = "white redPiece";
    var redSquare = document.getElementsByClassName("highlightMoveRed");
    for(var i = 0; i <= redSquare.length + 1; i++) {
      if (redSquare.length != 0) {
        redSquare[0].className = "white";
      }
    }
    var yellowSquare = document.getElementsByClassName("highlightRed");
    for(var i = 0; i <= yellowSquare.length + 1 ; i++) {
      if (yellowSquare.length != 0) {
        yellowSquare[0].className = "white";
      }
    }
    var takePiece = document.getElementsByClassName("highlightTakePiece blackPiece leftTarget")
    for(var i = 0; i <= takePiece.length + 1 ; i++) {
      if (takePiece.length != 0) {
        takePiece[0].className = "white";
      }
    }
    if (selectedGridLocation == 0 || selectedGridLocation == 1 || selectedGridLocation == 2 || selectedGridLocation == 3 ) {
      selectedCell.className = "white redKing"
    }
    document.getElementById("notifier").innerHTML = "Black's turn"
    turn = "black"
  }
  else if (selectedCellAttr == "highlightMoveRed right") {
    selectedCell.className = "white redPiece";
    var redSquare = document.getElementsByClassName("highlightMoveRed");
    for(var i = 0; i <= redSquare.length + 1; i++) {
      if (redSquare.length != 0) {
        redSquare[0].className = "white";
      }
    }
    var yellowSquare = document.getElementsByClassName("highlightRed");
    for(var i = 0; i <= yellowSquare.length + 1 ; i++) {
      if (yellowSquare.length != 0) {
        yellowSquare[0].className = "white";
      }
    }
    var takePiece = document.getElementsByClassName("highlightTakePiece blackPiece rightTarget")
    for(var i = 0; i <= takePiece.length + 1 ; i++) {
      if (takePiece.length != 0) {
        takePiece[0].className = "white";
      }
    }
    if (selectedGridLocation == 0 || selectedGridLocation == 1 || selectedGridLocation == 2 || selectedGridLocation == 3 ) {
      selectedCell.className = "white redKing"
    }
    document.getElementById("notifier").innerHTML = "Black's turn"
    turn = "black"
  }
  else {
  }
  var targetSquare = document.getElementsByClassName("highlightTakePiece blackPiece")
  for(var i = 0; i <= targetSquare.length + 1 ; i++) {
    if (targetSquare.length != 0) {
      targetSquare[0].className = "white blackPiece";
    }
  }
  scoreCounter();
  boardWatch();
}

function blackMove(){
  var selectedCell = this;
  var selectedCellAttr = selectedCell.getAttribute("class")
  var selectedGridLocation = selectedCell.getAttribute("data-num");
  //singleEventListenerBlackMove();
  if (selectedCellAttr == "highlightMoveBlack left") {
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
    var takePiece = document.getElementsByClassName("highlightTakePiece redPiece leftTarget")
    for(var i = 0; i <= takePiece.length + 1 ; i++) {
      if (takePiece.length != 0) {
        takePiece[0].className = "white";
      }
    }
    if (selectedGridLocation == 32 || selectedGridLocation == 33 || selectedGridLocation == 34 || selectedGridLocation == 35 ) {
      selectedCell.className = "white blackKing"
    }
    document.getElementById("notifier").innerHTML = "Red's turn"
    turn = "red";
  }
  else if (selectedCellAttr == "highlightMoveBlack right") {
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
    var takePiece = document.getElementsByClassName("highlightTakePiece redPiece rightTarget")
    for(var i = 0; i <= takePiece.length + 1 ; i++) {
      if (takePiece.length != 0) {
        takePiece[0].className = "white";
      }
    }
    var takePiece = document.getElementsByClassName("highlightTakePiece redPiece rightTarget")
    for(var i = 0; i <= takePiece.length + 1 ; i++) {
      if (takePiece.length != 0) {
        takePiece[0].className = "white";
      }
    }
    if (selectedGridLocation == 32 || selectedGridLocation == 33 || selectedGridLocation == 34 || selectedGridLocation == 35 ) {
      selectedCell.className = "white blackKing"
    }
    document.getElementById("notifier").innerHTML = "Red's turn"
    turn = "red";
  }
  else {
    // console.log ("Can't move there!")
  }
  var targetSquare = document.getElementsByClassName("highlightTakePiece redPiece")
  for(var i = 0; i <= targetSquare.length + 1 ; i++) {
    if (targetSquare.length != 0) {
      targetSquare[0].className = "white redPiece";
    }
  }
  scoreCounter();
  boardWatch();
}

function removeSquaresRed () {
  var redSquare = document.getElementsByClassName("highlightMoveRed");
  for(var i = 0; i <= redSquare.length + 1; i++) {
    if (redSquare.length != 0) {
      redSquare[0].className = "white";
    }
  }
  var yellowSquare = document.getElementsByClassName("highlightRed");
  for(var i = 0; i <= yellowSquare.length + 1 ; i++) {
    if (yellowSquare.length != 0) {
      yellowSquare[0].className = "white redPiece";
    }
  }
  var greenSquare = document.getElementsByClassName("highlightTakePiece");
  for(var i = 0; i <= greenSquare.length + 1; i++) {
    if (greenSquare.length != 0) {
      greenSquare[0].className = "white blackPiece";
    }
  }
}

function removeSquaresBlack () {
  var redSquare = document.getElementsByClassName("highlightMoveBlack");
  for(var i = 0; i <= redSquare.length + 1; i++) {
    if (redSquare.length != 0) {
      redSquare[0].className = "white";
    }
  }
  var yellowSquare = document.getElementsByClassName("highlightBlack");
  for(var i = 0; i <= yellowSquare.length + 1 ; i++) {
    if (yellowSquare.length != 0) {
      yellowSquare[0].className = "white blackPiece";
    }
  }
  var greenSquare = document.getElementsByClassName("highlightTakePiece");
  for(var i = 0; i <= greenSquare.length + 1; i++) {
    if (greenSquare.length != 0) {
      greenSquare[0].className = "white redPiece";
    }
  }
}

function boardWatch(){
  singleEventListenerRed();
  singleEventListenerBlack();
}


function singleEventListenerRed () {
  var boxes = document.getElementsByClassName("redPiece");
  for (var i = 0; i < boxes.length; i++){
    boxes[i].addEventListener("click" , selectRedPiece);
  }
}

function singleEventListenerBlack () {
  var boxes = document.getElementsByClassName("blackPiece");
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

function counterPieces() {
  redPieces = document.getElementsByClassName("redPiece");
  blackPieces = document.getElementsByClassName("blackPiece");
  redScore = redPieces.length;
  blackScore = blackPieces.length;
}

function scoreCounter() {
  counterPieces();
  var redCount = document.getElementById("redCounter");
  var blackCount = document.getElementById("blackCounter");
  redCount.innerHTML = redScore;
  blackCount.innerHTML = blackScore;
  checkForWin();
}

function checkForWin() {
  counterPieces();
  if (redScore == 0) {
    alert("Player 1 wins!");
  }
  else if (blackScore == 0) {
    alert("Player 2 wins!");
  }
}

function addStartOver(){
  var startingOver = document.getElementById("reset");
  startingOver.addEventListener("click", startOver);
}

function startOver(){
  location.reload();
}
