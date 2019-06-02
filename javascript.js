

class Zaidimas {
    constructor(cards){
        this.cardsArray = cards;
        this.ticker = document.getElementById('flips');
    }

    startGame() {
        this.cardToCheck = null;
        this.totalClicks = 20;
        this.matchedCards = [];
        this.busy = true;
    }


    flipCard(card) {
        if(this.canFlipCard(card)){
            this.totalClicks--;
            this.ticker.innerText = this.totalClicks;
            card.classList.add('visible');

            if(this.totalClicks === 0){
                location.reload();
            }
            if(this.cardToCheck)
                this.checkForCardMatch(card);
            else
                this.cardToCheck = card;
        }
    }

    checkForCardMatch(card){
        if(this.getCardType(card) === this.getCardType(this.cardToCheck))
            this.cardMatch(card, this.cardToCheck);
        else
            this.misMatch(card, this.cardToCheck);

        this.cardToCheck = null;
        
    }
    cardMatch(card1, card2){
        this.matchedCards.push(card1);
        this.matchedCards.push(card2);
    }
    misMatch(card1, card2){
        this.busy = true;
        setTimeout(() => {
            card1.classList.remove('visible');
            card2.classList.remove('visible');
            this.busy = false;
        },1000);
    }

    getCardType(card){
        return card.getElementsByClassName('card-value')[0].src;
    }

    canFlipCard(card) {
      
      return true;  
      
    }
}

function ready() {
    let overlays = Array.from(document.getElementsByClassName('overlay-text'));
    let cards = Array.from(document.getElementsByClassName('card'));
    let game = new Zaidimas(cards);

    overlays.forEach(overlay => {
        overlay.addEventListener('click', () => {
            overlay.classList.remove('visible');
            game.startGame();
        });
    });

    cards.forEach(card => {
        card.addEventListener('click', () => {
            console.log("Korta paspausta")
            game.flipCard(card);
        });
    });
}


if(document.readyState == 'loading'){
    document.addEventListener('DOMContentLoaded', ready);
}else {
    ready();
}