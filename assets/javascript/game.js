
var generateCrystalValue = function(){
	var value = Math.floor((Math.random() * 12) + 1);
	return value;
	
};

var generateTargetValue = function(){
	return Math.floor((Math.random() * 101) + 19);
};

$(document).ready(function(){


	var playerScore = 0;
	var win = 0;
	var loss = 0;
	var green_gem = "./assets/images/green_gem.png";
	var red_gem = "./assets/images/red_gem.png";
	var yellow_gem ="./assets/images/yellow_gem.png";
	var purple_gem = "./assets/images/purple_gem.png";

	// var $clickCyrstals = $("crystals-click");
	
	var gems_pic = [green_gem, red_gem, yellow_gem, purple_gem];


	var writeTargetToScreen = function(){
		$("#random-goal").html("<p>"+ targetValue + "</p>");
	};

	var writePlayerScoreToScreen = function(){
		$("#score").html("<p>Your total score is: " + playerScore + "</p>");
	};

	var writeWinLossToScreen = function(){
		$("#win_lose").html("<p>Wins: " + win +"<br>Losses: " + loss + "</p>");
	}

	var resetGame = function(){
		$("img").each(function(index) {
			$(this).data('value',generateCrystalValue());
		});
		playerScore = 0;
		writePlayerScoreToScreen();
		targetValue = generateTargetValue();
		writeTargetToScreen();
	};

	var targetValue = generateTargetValue();
	writeTargetToScreen();
	writeWinLossToScreen();
	
	// Dynamically add crystals with a random value to document
	for(var ii = 0; ii < gems_pic.length; ii++){
		var crystHold = $('<div>');	
		var img = $("<img width=150 height=100>");
		img.addClass("crystals-click");
		img.attr('src', gems_pic[ii]);
		var val = generateCrystalValue();
		img.data('value', val);
		crystHold.append(img);
		crystHold.addClass('crystal-holder');
		$("#crystals").append(crystHold);
	}

	// Function to add value to player score upon clicking on crystal
	$(".crystals-click").on('click', function(){
		playerScore += ($(this).data('value'));
		writePlayerScoreToScreen();
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
 
 	// Transition/Animation for mouse
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