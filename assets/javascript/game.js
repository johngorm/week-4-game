$(document).ready(function(){

	//Initialize variables and get image paths/
	var playerScore = 0;
	var win = 0;
	var loss = 0;
	var green_gem = "./assets/images/green_gem.png";
	var red_gem = "./assets/images/red_gem.png";
	var yellow_gem ="./assets/images/yellow_gem.png";
	var purple_gem = "./assets/images/purple_gem.png";
	var gems_pic = [green_gem, red_gem, yellow_gem, purple_gem];
	var crystalValues = [];
	//Function to assign a unique value to a crystal
	var generateCrystalValue = function(){   
		var isNewValue = true;
		var value;
		do{
			value = Math.floor((Math.random() * 12) + 1); 
		 	isNewValue = testUniqueCrystalValue(value);
		}
		while(isNewValue === false)
		crystalValues.push(value);
		return value;
	
	};
	//Test if a value already assigned to crytsal
	var testUniqueCrystalValue = function (value) {
		var newValueTest = $.inArray(value, crystalValues);
		if(newValueTest === -1){
			return true;
		}
		else{
			return false;
		}

	}

	var generateTargetValue = function(){
		return Math.floor((Math.random() * 101) + 19);
	};

	//The following functions relate to updating the game info on the user's screen
	var writeTargetToScreen = function(){
		$("#random-goal").html(targetValue);
	};

	var writePlayerScoreToScreen = function(){
		$("#score").text("Your total score is: " + playerScore);
	};

	var writeWinLossToScreen = function(){
		$("#win_lose").html("Wins: " + win +"<br>Losses: " + loss );
	}

	var resetGame = function(){
		crystalValues = [];
		$("img").each(function(index) {
			$(this).data('value',generateCrystalValue());
		});
		playerScore = 0;
		writePlayerScoreToScreen();
		targetValue = generateTargetValue();
		writeTargetToScreen();
	};
	//Get a target value for the game and put it in the DOM
	var targetValue = generateTargetValue();
	writeTargetToScreen();
	writeWinLossToScreen();
	
	// Dynamically add crystals with a random value to document
	for(var ii = 0; ii < gems_pic.length; ii++){
		var crystHold = $('<div>');	//crystHold is wrapper for imgs, allows me to scale image without pushing content
		var img = $("<img>");
		img.addClass("crystals-click");
		img.attr('src', gems_pic[ii]); //Give each img the corresponding crystal picture
		var val = generateCrystalValue();
		img.data('value', val);
		//Put crystal in the holder and append holder into crystal div
		crystHold.append(img);
		crystHold.addClass('crystal-holder');
		$("#crystals").append(crystHold);
	}

	// Function to add value to player score upon clicking on crystal
	$(".crystals-click").on('click', function(){
		playerScore += ($(this).data('value'));
		writePlayerScoreToScreen();
		//Check to see if the user is at the value or if they've gone over
		if(playerScore > targetValue){
			loss++;
			writeWinLossToScreen();
			alert("You lose!");
			resetGame();
			
		}
		else if(playerScore === targetValue){
			win++;
			resetGame();
			writeWinLossToScreen();
			alert("You win!");
		}
	});
 
 	// Change mouse and scale crystal when hovering over crystals
	$(".crystals-click").hover(function(){
			$('html,body').css('cursor' , 'pointer');
			$(this).css('transform', 'scale(1.5,1.5)');

			// $(this).css('animation', 'spin 2s infinite linear');
		},
		function(){
			$('html,body').css('cursor', 'default');
			$(this).css('transform','scale(1,1)')
		});	
		
});