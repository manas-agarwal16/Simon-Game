
var buttonColors = ["red" , "green" , "yellow" , "blue"];

var gamePattern = []; // game pattern
var userClickedPattern = []; // to track the user input.

var level = 0;

var started = true;

if(started === true){
    
    $(document).on("keypress",function(){
        
        if(started === true){
            started = false;
            nextSequence();
        }
        
    });
}

function startOver(){
    started = true; 
    level = 0;
    gamePattern = [];
}

function nextSequence(){
    
    userClickedPattern = [];
    level++;
    
    $("h1").html("level " + level);

    //creating random number
   
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChoosenColor = buttonColors[randomNumber];
    
    playSound(randomChoosenColor);
    gamePattern.push(randomChoosenColor);
    
    console.log("game: " + gamePattern);
    
    //adding effects
    addEffects(randomChoosenColor);
}

function addEffects(randomChoosenColor){
    
    $("#" + randomChoosenColor).css("visibility","hidden");
    
    setTimeout(function(){
        $("#" + randomChoosenColor).css("visibility","visible");
    },100);

}

$(".target").on("click",function(){
    
    var userClickedButton = $(this).attr("id"); // this given id of this.
    
    $("#" + userClickedButton).addClass("clicked");
    
    playSound(userClickedButton);
    
    setTimeout(function(){
        $("#" + userClickedButton).removeClass("clicked");
    },100);

    // console.log(userClickedButton);

    userClickedPattern.push(userClickedButton);
    console.log("user: " +  userClickedPattern);
    
    check(userClickedPattern.length - 1 );
});

function check(currentLevel){

    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){

        //checking if number of clicks are done.
        if(gamePattern.length === userClickedPattern.length){
            console.log("level complete");

            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }
    else{
        console.log("wrong");
        
        var audio = new Audio("./wrong.mp3");
        audio.play();

        $("body").addClass("gameOver");

        setTimeout(function(){
            $("body").removeClass("gameOver");
        },200);
        
        $("h1").html("Game Over, Press any key to restart");

        startOver();// function inside which variable and array values are restored.
    }
}

function playSound(click){
    var audio = new Audio("./" + click + ".mp3");
    audio.play();
}