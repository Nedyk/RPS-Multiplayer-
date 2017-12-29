
    
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" integrity="sha384-1q8mTJOASx8j1Au+a5WDVnPi2lkFfwwEAa8hDDdjZlpLegxhjVME1fgjWPGmkzs7" crossorigin="anonymous">
     <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
       <script src="https://www.gstatic.com/firebasejs/live/3.0/firebase.js"></script>
    
  
  <script>
  $( document ).ready(function() {
   

    // Initialize Firebase
    var config = {
      apiKey: "AIzaSyAAiXkgze7_0fmtSvgoNS9nIDeQiXfkhrM",
    authDomain: "rps-multiplayer-d713e.firebaseapp.com",
    databaseURL: "https://rps-multiplayer-d713e.firebaseio.com",
    projectId: "rps-multiplayer-d713e",
    storageBucket: "",
    messagingSenderId: "601659965604"
    };

    firebase.initializeApp(config);

    // Create a variable to reference the database.
    var database = firebase.database();

    var connectedRef = firebase.database().ref(".info/connected");
  connectedRef.on("value", function(snap) {
  if (snap.val() === true) {
    console.log("connected");
  } else {
    console.log("not connected");
  }
});
    // Initial Values
    
    
    var roundScore =0;
    var player1 =$("#play1").val();
    var player2 = $("#play2").val();
    var onePlaymsg = [];
    var twoPlaymsg = [];
    var Player2Guessed = "";
    var Player1Guessed = "";
    var Player1wins = 0; 
    var Player2wins = 0; 
    var Player1losses = 0;
    var Player2losses = 0;
    var scoreOne =0; 
    var scoreTwo = 0; 
    var startGame;
    var chances =5;
    var wins =0;
    var losses = 0; 


    $("#main1").hide();
    $("#main2").hide();
    $("#tip").hide();
//pick game name 
   $("#enterName1").on("click", function(){
    event.preventDefault();
    player1 = $("#play1").val();
    console.log(player1)
    if(player1===""){
       $("#tip").html("Please enter a nickname");
    }else if(!(player1 === "")) && (!(player2 === "")){
      database.ref().update({
      player1: player1
       $("#name1").hide();
   $("#main1").show();
    }else{
      $("#first").text("Waiting on the enemy")

    }
   
   
  };


   }); 
  $("#enterName2").on("click", function(){
    event.preventDefault();
    player2 = $("#play2").val();
   console.log(player2);
    if(player2 === ""){
      $("#tip").text("please pick a nickname")
    }else if(!(player2 === "")) && (!(player1 === "")){
      database.ref().update({
      player2: player2
       $("#name2").hide();
      $("#main2").show();
    }else{
      $("#second").text("Waiting on the enemy")

    }
   
   
  };


   }); 

  //make a selection 

  $(".ptwo").on("click", function(){
    var Player2Guessed = $(this).attr("data-name");
    console.log(Player2Guessed);
   chances--; 
      database.ref().update({
      Player2Guessed: Player2Guessed
  });
  });



$(".pOne").on("click", function(){
  var Player1Guessed =$(this).attr("data-name");
  console.log(Player1Guessed);
  chances--;
  database.ref().update({
      Player1Guessed: Player1Guessed
  });
 

//});
//compare comparisons 

            if ((Player1Guessed == 'rock') && (Player2Guessed == 'scissors')){
                Player1wins++;
                scoreOne++
                Player2losses++;
                database.ref().update({
                  wins: Player1wins
                }); 
                  database.ref().update({
                  losses: Player2losses
                }); 

                 
                $('#winloss1').append(snapshot.child('player1').val().toUpperCase() + " WINS!!!");
                
                
                
            }else if ((Player1Guessed == 'rock') && (Player2Guessed == 'paper')){
                 Player2wins++;
                 scoreTwo++;
                Player1losses++;
                database.ref().update({
                  losses: Player1losses
               
                }); 
                database.ref().update({
                 
                  wins: Player2wins
                }); 

               
                $('#winloss2').append(snapshot.child('players2').val().toUpperCase() + " WINS!!!");

            }else if ((Player1Guessed == 'scissors') && (Player2Guessed == 'rock')){
                Player2wins++;
                scoreTwo;
                Player1losses++;
                database.ref().update({
                  losses: Player1losses
                }); 
                database.ref().update({
                  wins: Player2wins
                });
                
                $('#winloss2').append(snapshot.child('players2').val().toUpperCase() + " WINS!!!");

            }else if ((Player1Guessed === 'scissors') && (Player2Guessed === 'paper')){
                Player1wins++;
                scoreOne++;
                Player2losses++;
                database.ref().update({
                  wins: Player1wins
                }); 
                database.ref().update({
                  losses: Player2losses
                }); 
                
                $('#winloss1').append(snapshot.child('player1').val().toUpperCase() + " WINS!!!");

            }else if ((Player1Guessed === 'paper') && (Player2Guessed === 'rock')){
                Player1wins++;
                scoreOne++;
                Player2losses++;
                database.ref().update({
                  wins: Player1wins
                }); 
                database.ref().update({
                  wins: Player2losses
                }); 
                
                $('#winloss1').append(snapshot.child('player1').val().toUpperCase() + " WINS!!!");

            }else if ((Player1Guessed === 'paper') && (Player2Guessed === 'scissors')){
                Player1losses++;
                Player2wins++;
                scoreTwo++; 
                database.ref().update({
                  losses: Player1losses
                }); 
                database.ref().update({
                  wins: Player2wins
                }); 
                
                $('#winloss2').append(snapshot.child('player2').val().toUpperCase() + " WINS!!!");
              };
           
       });
//winner
if(chances === 0){
  if(scoreOne > scoreTwo){
  roundScore = $("#score1").text("You WON by  " + snapshot.child('scoreOne').val());
}else{
  $("#score1").text("You LOST");
}
};

if(chances === 0){
  if(scoreTwo > scoreOne){
  roundScore = $("#score2").text("You WON by  " + snapshot.child('scoreTwo').val());
}else{
  $("#score1").text("You LOST");
}
};





  //send message
  $("#chat").on("click", function(){
    onePlaymsg;
    onePlaymsg.push($("#message").val();) 
    for(var i =0; i<onePlaymsg.length, i++){

      if(onePlaymsg === ""){
      var enterChat = $("#enterChatmsg").text("Please enter a message");
    }else{
      $("#enterChatmsg").hide();
      $("#enterChatmsg2").text("You have a message from the enemy: " + onePlaymsg);
      database.ref().update({
        onePlaymsg: onePlaymsg
  });

    };
    }; 
});
  $("#chat2").on("click", function(){
    twoPlaymsg;
    twoPlaymsg.push($("#message2").val());
    for (var i =0; twoPlaymsg.length; i++){
        if(twoPlaymsg ===""){
        var enterChat = $("#enterChatmsg2").text("Please enter a message");
      }else{
        $("#enterChatmsg2").hide();
        $("#enterChatmsg").text("You have a message from the enemy: " + twoPlaymsg);
        database.ref().update({
          twoPlaymsg: twoPlaymsg
        
  });

    }
    }
    
    
});
    function init(){
      var roundScore =0;
    $("#main").hide();
    $("#tip").hide();
    var startGame;
    var chances =5;

    }
    


      $("#begin").on("click", function(){

    var r = Math.floor((Math.random() * 2) + 1);
    startGame=0;
    if(r===1){
        turn = player1;
        $("#begin").text(player1+"'s turn now!");
        $("#player1").text( "Your Turn");
    }
    else{
        turn = player2;
        $("#begin").text(player2+"'s turn now!");
        $("#player2").text( "Your Turn");
    }

   });
  
   
    

  
      if(!(chances===0)){
        roundScore+=chances;
        
      }else{
        //activePlayer === 0 ? activePlayer =1 : activePlayer =0;
        if( activePlayer === 0){
          activePlayer =1;
        }else{
          activePlayer =2;
        }
        roundScore =0;
        $(".player-1-panel").toggleclass("active");
         $(".player-2-panel").toggleclass("active")

    }
    
      


      // Code for handling the push
      database.ref().push({
        onePlaymsg: onePlaymsg,
        twoPlaymsg: twoPlaymsg,
        Player1Guessed : Player1Guessed,
        Player2Guessed: Player2Guessed,
        Player1losses: Player1losses,
        Player2losses: Player2losses,
        Player1wins: Player1wins,
        Player2wins: Player2wins, 
        scoreOne: scoreOne,
        scoreTwo: scoreTwo,
        roundScore:roundScore,
        chances: chances,
        player1: player1,
        player2: player2,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
      });
      


    

    // // Firebase watcher + initial loader + order/limit HINT: .on("child_added"
    database.ref().orderByChild("dateAdded").limitToLast(15).on("child_added", function(snapshot) {
    //   // storing the snapshot.val() in a variable for convenience
     var dbquery = snapshot.val();

     
      $("#chances").text("Rounds " + snapshot.child('chances').val());
      $("#chances2").text("Rounds " + snapshot.child('chances').val());
      $("#score1").text("Score " + snapshot.child('scoreOne').val());
      $("#score2").text("Score " + snapshot.child('scoreTwo').val());
    

     }); 

 function reset(){
  $("#try").on("click", function(){
    console.log("click");
  $("#main1", "#main2").empty();

   });
}
   reset();

   });
  </script>
    
    
    
