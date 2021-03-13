
// Random Choosing Color

var gamePattern = [];
var userClickedPattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var level = 0;
var started = false;

// detect when a keyboard key has been pressed
$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});


// Detect when any Button is cliked and trigger a handler function
$(".btn").click(function(){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    // nextSequence();
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});


function nextSequence(){
  userClickedPattern = [];
  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  // Flash the selected color button
  var selectedButton = $("#"+randomChosenColour);
  selectedButton.fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

  // play the sound for the button colour selected
  playSound(randomChosenColour);

  // increase Level
  level++;
  $("#level-title").text("Level "+level);
}


function playSound(name){
  var audioElementClicked = new Audio("sounds/"+name+".mp3");
  audioElementClicked.play();
};

// Add animation to the Pressed button
function animatePress(currentColour) {
  var currentButton = $("#"+currentColour);
  currentButton.addClass("pressed");
  setTimeout(function(){
      currentButton.removeClass("pressed");
  }, 100);
};


function checkAnswer(currentLevel){
  if(userClickedPattern[currentLevel]===gamePattern[currentLevel]){
    console.log("success");
    //4. If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
      if (userClickedPattern.length === gamePattern.length){

        //5. Call nextSequence() after a 1000 millisecond delay.
        setTimeout(function () {
          nextSequence();
        }, 1000);

      }
  }else{
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    $("h1").text("Game Over, Press Any Key to Restart");
    startOver();
  }
};

function startOver(){
  level=0;
  gamePattern=[];
  started=false;
}
