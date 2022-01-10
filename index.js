var winSequence = [];
var userSequence = [];

//**************************************** WHY THE HELL!! THIS INSIDE setTimeout DIDN'T WORKED AND A NEW VARIABLE ELEM WORKED!!!!!!!!!!!!!************************
var level = 0;

function blink(num) {
  var elem = document.querySelectorAll(".buttons")[num];
  var colour = window.getComputedStyle(elem).getPropertyValue("background-color");
  // console.log(colour);
  elem.style.backgroundColor = "black";
  var button = getButtonColor(elem);
  playAudio(button);
  winSequence.push(num);
  // console.log(winSequence + "--winSequence");
  setTimeout(function() {
    elem.style.backgroundColor = colour;
  }, 200, elem);
}

function randomNum() {
  var num = (Math.floor(Math.random() * 4));
  return num;
}

function playAudio(num) {
  switch (num) {
    case "blue":
      new Audio("./sounds/blue.mp3").play();
      break;
    case "red":
      new Audio("./sounds/red.mp3").play();
      break;
    case "green":
      new Audio("./sounds/green.mp3").play();
      break;
    case "yellow":
      new Audio("./sounds/yellow.mp3").play();
      break;
  }
}

function getButtonColor(elem) {
  var list = elem.classList;
  if (list.contains("red"))
    return "red";
  else if (list.contains("blue"))
    return "blue";
  else if (list.contains("green"))
    return "green";
  else if (list.contains("yellow"))
    return "yellow";
}

function getButtonClickedNum(elem) {
  var list = elem.classList;
  if (list.contains("red"))
    return 0;
  else if (list.contains("blue"))
    return 1;
  else if (list.contains("yellow"))
    return 2;
  else if (list.contains("green"))
    return 3;
  // if (num == 0)
  //   return "red";
  // else if (num == 1)
  //   return "blue";
  // else if (num == 2)
  //   return "yellow";
  // else if (num == 3)
  //   return "green";
}

// function enableButtons() {
//   for (var v = 0; v < $(".buttons").length; v++) {
//     document.querySelectorAll(".buttons")[v].addEventListener("click", function() {
//       var elem = this;
//       this.classList.add("pressed");
//       var button = getButtonColor(elem);
//       playAudio(button);
//       setTimeout(function() {
//         elem.classList.remove("pressed");
//       }, 100, this);
//     });
//   }
// }

function enableButtons() {
  for (var v = 0; v < $(".buttons").length; v++) {
    // console.log(v);
    // console.log(document.querySelectorAll(".buttons")[v]);
    document.querySelectorAll(".buttons")[v].addEventListener("click", clickResponse);
  }
}
var removeListner = false;
var counter = 0;

function clickResponse() {
  var elem = this;
  // userSequence.push(getButtonClickedNum(elem))
  // console.log(userSequence);
  if (removeListner)
    elem.removeEventListener("click", clickResponse);
  else {
    elem.classList.add("pressed");
    var button = getButtonColor(elem);
    playAudio(button);
    setTimeout(function() {
      elem.classList.remove("pressed");
    }, 100, elem);
    gameCheck(counter, getButtonClickedNum(elem));
  }
  // console.log(this);
}

function gameStart() {
  $("h1").text("Level 1");
  var temp = randomNum();
  blink(temp);
  document.removeEventListener("keypress", gameStart);
  enableButtons();
  removeListner = false;
  // gameCheck();
}
document.addEventListener("keypress", gameStart);

function gameCheck(index, userInput) {
  if (winSequence[index] == userInput) {
    if (index == level) {
      level++;
      $("h1").text("Level " + (level + 1));
      setTimeout(function() {
        blink(randomNum());
      }, 500);
      counter = 0;
      console.log(winSequence);
    } else
      counter++;
  } else
    gameEnd();
}


function gameEnd() {
  $("h1").text("Game Over, Press Any Key On Keyboard to Restart");
  removeListner = true;
  document.addEventListener("keypress", gameStart);
  winSequence = [];
  userSequence = [];
  level = 0;
  var colour = window.getComputedStyle($("body")[0]).getPropertyValue("background-color");
  $("body")[0].style.backgroundColor = "red";
  new Audio("./sounds/wrong.mp3").play();
  setTimeout(function() {
    $("body")[0].style.backgroundColor = colour;
  }, 200);
  counter = 0;
}
