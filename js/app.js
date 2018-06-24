var icon = [ "fa fa-diamond","fa fa-diamond", "fa fa-paper-plane-o","fa fa-paper-plane-o",
              "fa fa-anchor", "fa fa-anchor","fa fa-bolt", "fa fa-bolt","fa fa-cube",
              "fa fa-cube","fa fa-leaf","fa fa-leaf","fa fa-bicycle", "fa fa-bicycle",
              "fa fa-bomb","fa fa-bomb"];

/*
I will like to appeciate the following people/website. If not them, I will not be able to develop this game. 
Yahya Elharony: https://www.youtube.com/watch?v=G8J13lmApkQ
Ryan White
https://www.w3schools.com/Jsref/met_win_alert.asp


*/


//select the cards

const cardsContainer = document.querySelector(".deck");
let restart = document.querySelector('.restart');
let myNewCard = shuffle(icon);
let moveContainer=document.querySelector(".moves");
let seconds = 0,
    minutes = 0;
let timer = document.querySelector(".clock");
let interval;
let openCard = [];
let cardIsMatch = [];
var move = 0; //move counter
moveContainer.innerHTML= 0; //at the begining the mobe is set to zero and then update dynamically
const starContainer = document.querySelector(".stars");




/*
* This fuction is used to populate our card and then initialize it
*/
function Begin(){
	for (let i=0; i<myNewCard.length; i++)
	{
		const card = document.createElement("li");
		card.classList.add("card");
		card.innerHTML = `<i class = "${myNewCard[i]}"></i>`;
		cardsContainer.appendChild(card);
		startClick(card);}
}	

function startClick(card){
	//card click event
    card.addEventListener("click", function(){
		let currentCard = this;
		 let previousCard = openCard[0];
	  //when we have existing card opened
      if(openCard.length === 1){
		  
		  card.classList.add("open", "show", "disable");
		  
          openCard.push(this);
			//compare the two open cardsContainer
			isCardSame(currentCard, previousCard);

      }else{//we don't have an open cards
		card.classList.add("open", "show", "disable");
		openCard.push(this);
      }


    });
}

/*
* This part examine the previous flipped card and the current flipped card to determine if they are the same
*/

function isCardSame(currentCard, previousCard ){
	if(currentCard.innerHTML === previousCard.innerHTML){
		currentCard.classList.add("match");
		previousCard.classList.add("match");
		
		cardIsMatch.push(currentCard, previousCard);
		openCard =[]; // reset the array
		
		gameOver();
	}else{
		setTimeout(function(){
			currentCard.classList.remove("open", "show", "disable");
			previousCard.classList.remove("open", "show", "disable");
			openCard = [];
			}, 500);
		
		}
		addMove();
}


/*
We need to determine that the game is over when the number of cardIsMatch = number of card in icon

*/
function gameOver(){
	if(cardIsMatch.length === myNewCard.length){
		alert("You have succesfully matched the entire card   BRAVO!!!!!"+ "\n It took you " + minutes +" mins "+ seconds + " secs to complete the game ");
		stopTimer();
	}
}


/*
Addmove will keep track of the move
*/


function addMove(){
	move++;
	moveContainer.innerHTML= move;
	//Once the first move is made, the timer starts
	if (move === 1) {
        seconds = 0;
        minutes = 0;
        hour = 0;
        startTimer();
    }
	
	//Rating is calculated based on the number of moves. So once the move is made, the rating fuction monitors the moves
	rating();
}

//This is the function for the timer
function startTimer() {
    interval = setInterval(function() {
        timer.innerHTML = minutes + "mins " + seconds + "secs";
        seconds++;
        if (seconds == 60) {
            minutes++;
            seconds = 0;
        }
        if (minutes == 60) {
            hour++;
            minutes = 0;
        }
    }, 1000);
}
//stop timer
function stopTimer() {
    clearInterval(interval);
}


//This function will dynamically rate the player based on the number of moves 
function rating(){
	switch(move){
		case 18:
		starContainer.innerHTML =`<li><i class="fa fa-star"></i></li>
        		<li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li>
        		<li><i class="fa fa-star"></i></li>`;
		break;
		case 20:
		starContainer.innerHTML = `<li><i class="fa fa-star"></i></li>
        		<li><i class="fa fa-star"></i></li>
        		<li><i class="fa fa-star"></i></li>`;
		break;
		case 22: starContainer.innerHTML =`<li><i class="fa fa-star"></i></li>
        		<li><i class="fa fa-star"></i></li>`;
		break;
		case 25: starContainer.innerHTML =`<li><i class="fa fa-star"></i></li>`;
		break;
	}	
}
//this fuction will reset the entire game once the reste button is selected
restart.addEventListener('click', function() {
	cardsContainer.innerHTML = "";
	openCard = [];
	move=0;
	seconds = 0,
    minutes = 0;
	moveContainer.innerHTML= 0;
	timer.innerHTML = 0 + "mins " + 0 + "secs";
	stopTimer();
	rating();
	Begin();
});


//This fuction is meant to shuffle the icon
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}
/*
* invoke the functions to initialize where necesary 
*/

Begin(); //invoke the game and start the game for the first time