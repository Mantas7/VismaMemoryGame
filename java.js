
class MixOrMatch {
	constructor(cards) {
		this.cardsArray = cards;
		this.ticker = document.getElementById('flips');
	}

	GameStart() {
	this.cardToCheck = null;
	this.matchedCards = [];
	this.totalClicks = 0;
	this.busy = true;
	}


flipCard(card) {
        if(this.canFlipCard(card)) {
            this.totalClicks++;
            this.ticker.innerText = this.totalClicks;
            card.classList.add('visible');

            if(this.cardToCheck) {
                this.checkForCardMatch(card);
            } else {
                this.cardToCheck = card;
            }
        }
    }
canFlipCard(card){

	return(!this.busy && !this.matchedCards && card !== this.cardToCheck);
}

   
}


function ready(){
	let cards = Array.from(document.getElementsByClassName('card'));
	let game = new MixOrMatch(cards)

	cards.forEach(card => {
        card.addEventListener('click', () => {
            game.flipCard(card);
            console.log("Labas");
        });
    }); 
}


if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}