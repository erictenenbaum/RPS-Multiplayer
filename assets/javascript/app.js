 var config = {
    apiKey: "AIzaSyAPslozNSjyNLrjv23-4uzNxw1XS1AAXHc",
    authDomain: "rps-multiplayer-62cc4.firebaseapp.com",
    databaseURL: "https://rps-multiplayer-62cc4.firebaseio.com",
    projectId: "rps-multiplayer-62cc4",
    storageBucket: "rps-multiplayer-62cc4.appspot.com",
    messagingSenderId: "48049044234"
  };
  firebase.initializeApp(config);


var database = firebase.database();

var initialValue = 0;

var playerOneLocal;
var playerOneLocalWins;
var playerOneLocalLosses;

var playerTwoLocal;
var playerTwoLocalWins;
var playerTwoLocalLosses;

var RPS = ["Rock", "Paper", "Scissors"]
var pOneBTN = $("#P1-buttonHolder");
var pTwoBTN = $("#P2-buttonHolder");

function displayButtons(Player){	

	for (var i = 0; i < RPS.length; i++) {

			var newBTN = $("<button>");
			newBTN.attr("data-name", RPS[i]);
			newBTN.text(RPS[i]);
			newBTN.attr("class", "RPS-Button");
			Player.append(newBTN);		
	}	
}


database.ref("players").on("value", function(snapshot) {

  // If Firebase has a Player One or Player Two stored (first case)

  	if (snapshot.child("playerOneData").exists() && snapshot.child("playerTwoData").exists()) {

  		playerOneLocal = snapshot.val().playerOneData;
  		$("#playerOne").text(playerOneLocal);

  			if (snapshot.child("playerOneDataWins").exists()) {
  				playerOneLocalWins = snapshot.val().playerOneDataWins;
  				$("#pOneWins").text("Wins: " + playerOneLocalWins);
  			}

  			else {
  				playerOneLocalWins = initialValue;
  				$("#pOneWins").text("Wins: " + playerOneLocalWins);
  			}


  			if (snapshot.child("playerOneDataLosses").exists()) {
  				playerOneLocalLosses = snapshot.val().playerOneDataLosses;
  				$("#pOneLosses").text("Losses: " + playerOneLocalLosses);
  			}
  			else {
  				playerOneLocalLosses = initialValue;
  				$("#pOneLosses").text("Losses: " + playerOneLocalLosses);
  			}

		
		playerTwoLocal = snapshot.val().playerTwoData;
		$("playerTwo").text(playerTwoLocal);

			if (snapshot.child("playerTwoDataWins").exists()) {
				playerTwoLocalWins = snapshot.val().playerTwoDataWins;
				$("#pTwoWins").text("Wins: " + playerTwoLocalWins);
			}

			else {
				playerTwoLocalWins = initialValue;
				$("#pTwoWins").text("Wins: " + playerTwoLocalWins);
			}

			if (snapshot.child("playerTwoDataLosses").exists()) {
				playerTwoLocalLosses = snapshot.val().playerTwoDataLosses;
				$("#pTwoLosses").text("Losses: " + playerTwoLocalLosses);
			}
			else {
				playerTwoLocalLosses = initialValue;
				$("#pTwoLosses").text("Losses: " + playerTwoLocalLosses);

			}
  		
  		// playerOneLocalLosses = snapshot.val().playerOneDataLosses;

  		// playerTwoLocal = snapshot.val().playerTwoData;
  		// playerTwoLocalWins = snapshot.val().playerTwoDataWins;
  		// playerTwoLocalLosses = snapshot.val().playerTwoDataLosses;

  		
  		// $("P1-scoreHolder").text("Wins: " + playerOneLocalWins + "Losses: " + playerOneLocalLosses);

  		// $("#playerTwo").text(playerTwoLocal);
  		// $("P2-scoreHolder").text("Wins: " + playerTwoLocalWins + "Losses: " + playerTwoLocalLosses);

  	}

  	else {

		  if (snapshot.child("playerOneData").exists()) {

		  	playerOneLocal = snapshot.val().playerOneData;
			$("#playerOne").text(playerOneLocal);

				if (snapshot.child("playerOneDataWins").exists()) {
  						playerOneLocalWins = snapshot.val().playerOneDataWins;
  						$("#pOneWins").text("Wins: " + playerOneLocalWins);
  				}

  				else {
  						playerOneLocalWins = initialValue;
  						$("#pOneWins").text("Wins: " + playerOneLocalWins);
  				}

  				if (snapshot.child("playerOneDataLosses").exists()) {
  						playerOneLocalLosses = snapshot.val().playerOneDataLosses;
  						$("#pOneLosses").text("Losses: " + playerOneLocalLosses);
  				}
  				else {
  						playerOneLocalLosses = initialValue;
  						$("#pOneLosses").text("Losses: " + playerOneLocalLosses);
  				}  


		  }

		  else {
		  	$("#playerOne").html("Waiting for Player One");
		  }



		if (snapshot.child("playerTwoData").exists()) {

			playerTwoLocal = snapshot.val().playerTwoData;
			$("#playerTwo").text(playerTwoLocal);


				if (snapshot.child("playerTwoDataWins").exists()) {
						playerTwoLocalWins = snapshot.val().playerTwoDataWins;
						$("#pTwoWins").text("Wins: " + playerTwoLocalWins);
				}

				else {
						playerTwoLocalWins = initialValue;
						$("#pTwoWins").text("Wins: " + playerTwoLocalWins);
				}

				if (snapshot.child("playerTwoDataLosses").exists()) {
						playerTwoLocalLosses = snapshot.val().playerTwoDataLosses;
						$("#pTwoLosses").text("Losses: " + playerTwoLocalLosses);
				}
				else {
						playerTwoLocalLosses = initialValue;
						$("#pTwoLosses").text("Losses: " + playerTwoLocalLosses);

				}	

		}

		else {
			
			$("#playerTwo").html("Waiting for Player Two");
		}

	}

		console.log(snapshot.val());

	},

	function(errorObject) {
  console.log("The read failed: " + errorObject.code);

	});


$("#add-player-name").on("click", function(){
	event.preventDefault();

	var newName = $("#player-name").val();

if(newName !== null && newName !== "") {
   // do something



   	database.ref("players").on("value", function(snapshot) {

   			if (snapshot.child("playerOneData").exists() && snapshot.child("playerTwoData").exists()) {
   				console.log("we have both players")
   			}
   			else {



		   		if (snapshot.child("playerOneData").exists()) {

		   			playerTwoLocal = newName;
		   			playerTwoLocalWins = initialValue;
		   			playerTwoLocalLosses = initialValue;

		   			database.ref("players").update({
		   				playerTwoData: playerTwoLocal,
		   				playerTwoDataWins: playerTwoLocalWins,
		   				playerTwoDataLosses: playerTwoLocalLosses
		   			});

		   			$("#playerTwo").text(playerTwoLocal);
		   			$("#pTwoWins").text(playerTwoLocalWins);
		   			$("#pTwoLosses").text(playerTwoLocalLosses);

		   		}

		   		else {

		   			playerOneLocal = newName;
		   			playerOneLocalWins = initialValue;
		   			playerOneLocalLosses = initialValue;

		   			database.ref("players").update({
		   				playerOneData: playerOneLocal,
		   				playerOneDataWins: playerOneLocalWins,
		   				playerOneDataLosses: playerOneLocalLosses
		   			});

		   			$("#playerOne").text(playerOneLocal);
		   			$("#pOneWins").text(playerOneLocalWins);
		   			$("#pOneLosses").text(playerOneLocalLosses);
		   		}

   			}


   	});




}




	// playerOneLocal = $("#player-name").val()

	// database.ref("players").set({

	// 	playerOneData: playerOneLocal

	// });

	// $("#playerOne").html(playerOneLocal);




	
})




